const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = Router();

router.post(
    '/registr',
    [
        check('email', 'Не правильно указан Email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            });
        }
        const {email, password} = req.body;

        const candidat = await User.findOne({email});
        if(candidat) return res.status(400).json({message: 'Пользователь с таким email уже есть!'});

        const hashPass = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashPass});

        await user.save();
        res.status(201).json({message: 'Пользователь добавлен'});

    } catch (e) {
        res.status(500).json({message: 'Ошибка 500 на сайте'});
    }
});

router.post(
    '/login',
    [
        check('email', 'Введите правильный Email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при входе в систему'
            });
        }

        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: 'Пользователь не найден'});
        }

        const isPass = await bcrypt.compare(password, user.password);

        if(!isPass) {
            return res.status(400).json({message: 'Не верный пароль'})
        }

        const tocken = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        res.json({tocken, userId: user.id});

    } catch (e) {
        res.status(500).json({message: 'Ошибка 500 на сайте'});
    }
});

module.exports = router;