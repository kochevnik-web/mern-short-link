import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import { AuthContext } from '../context/AutnContext';

export default function Navbar() {

    const auth = useContext(AuthContext);
    const history = useHistory();

    const handlerLogout = e => {
        e.preventDefault();
        auth.logout();
        history.push('/');
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
                <a href="/" className="brand-logo">Short links</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Создать</NavLink></li>
                    <li><NavLink to="/links">Ссылки</NavLink></li>
                    <li><a href="/" onClick={handlerLogout}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}
