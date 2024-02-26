import './authPage.scss'
import React from 'react';
import {LoginForm} from "../../comps/LoginForm/loginForm";

const AuthPage = () => {
    return <div className="page auth-page">
        <div className="login-form__wrapper">
            <LoginForm/>
        </div>
    </div>
};
export default AuthPage;
