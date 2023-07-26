import './authPage.scss'
import React from 'react';
import apiService from "../../utils/apiService";
import ActionButton from "../../comps/actionButton/actionButton";
import {setIsAuthorizedAction, setUserAction} from "../../utils/store/actionCreators";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {LoginForm} from "../../comps/LoginForm/loginForm";

const AuthPage = () => {


    const {Group, Label, Text, Control, Check} = Form;



    return <div className="page auth_page">
        <div className="login-form__wrapper">
            <LoginForm/>
        </div>
    </div>
};
export default AuthPage;
