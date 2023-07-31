import React from "react";
import {Types} from "../../utils/types";
import {LoginFormTemplate} from "./loginFormTemplate";
import apiService from "../../utils/apiService";
import {createAddMessageAction, createSetMealsAction, setIsAuthorizedAction, setUserAction} from "../../utils/store/actionCreators";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {useState} from "react";
import {itemTypes} from "../../utils/itemTypes";
import {fetchLogin} from "../../utils/store/asyncThunks";

const LoginFormHOC = (Comp: React.FC<any>, props?: any) => {

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({login: '', password: ''});
    const [isLoading, setIsLoading] = useState(false);

    const login = (event: any) => {
        event.preventDefault();
        console.log(formData);
        setIsLoading(true);
        const loginData = {
            login: 'joe',
            password: '1234'
        };
        dispatch(fetchLogin(loginData));
    };

    const register = (event: any) => {
        event.preventDefault();
        apiService.logout().then(res => {
            dispatch(setIsAuthorizedAction(false));
        });
    };

    const onEmailChange = (event:any) => {
        setFormData({...formData, login: event.target.value});
    };
    const onPasswordChange = (event:any) => {
        setFormData({...formData, password: event.target.value});
    };

    props = {...props, login, register, onEmailChange, onPasswordChange, isLoading};

    return <Comp {...props}/>
};

export const LoginForm = (props: any) => LoginFormHOC(LoginFormTemplate, props);