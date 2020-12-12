const {Router} = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const User = require('../models/User')
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

router.post('/login', async (req, res) => {

});

module.exports = router;