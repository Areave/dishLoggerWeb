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

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {Group, Label, Text, Control, Check} = Form;

    const login = async () => {
        apiService.login({
            login: 'joe',
            password: '1234'
        }).then(response => {
            if (response.user) {
                console.log(response);
                dispatch(setIsAuthorizedAction(true));
                dispatch(setUserAction(response.user));
                navigate('/');
            } else {
                dispatch(setIsAuthorizedAction(false));
            }
        });
    };

    const logout = () => {
        apiService.logout().then(res => {
            dispatch(setIsAuthorizedAction(false));
        });
    };

    return <div className="page">
        <LoginForm/>
        <ActionButton onClick={login} label={'login'}/>
        <ActionButton onClick={logout} label={'logout'}/>
    </div>
};
export default AuthPage;
