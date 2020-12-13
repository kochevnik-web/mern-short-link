import React, {useState, useEffect, useContext} from 'react';
import { AuthContext } from '../context/AutnContext';
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'

export default function AuthPage() {
    const {loading, request, error, clearError} = useHttp();
    const auth = useContext(AuthContext);
    const message = useMessage();
    const [form, serForm] = useState({email: '', password: ''});

    useEffect(()=>{
        message(error);
        clearError();
    },[error, message, clearError]);

    const changeHandler = e => {
        serForm({...form, [e.target.name]: e.target.value});
    }

    const registrHandler = async () => {
        try {
            const data = await request('/api/auth/registr', 'POST', {...form});
            message(data.message);
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.tocken, data.userId);
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input
                                    id="user_email"
                                    type="text"
                                    name="email"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="user_email">E-mail</label>
                            </div>
                            <div className="input-field">
                                <input
                                    id="user_password"
                                    type="password"
                                    name="password"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="user_password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            style={{marginRight: 10}}
                            onClick={loginHandler}
                        >
                            Войти
                        </button>
                        <button
                            className="btn grey laghten-1 black-text"
                            onClick={registrHandler}
                        >Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
