import './authPage.scss'
import React from 'react';
import Form from 'react-bootstrap/Form';
import {LoginForm} from "../../comps/LoginForm/loginForm";

const AuthPage = () => {
    return <div className="page auth_page">
        <div className="login-form__wrapper">
            <LoginForm/>
        </div>
    </div>
};
export default AuthPage;
