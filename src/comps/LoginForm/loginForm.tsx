import React from "react";
import {LoginFormTemplate} from "./loginFormTemplate";
import apiService from "../../utils/apiService";
import {setIsAuthorizedAction} from "../../utils/store/actionCreators";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {fetchLogin} from "../../utils/store/asyncThunks";

const LoginFormHOC = (Comp: React.FC<any>, props?: any) => {

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({login: '', password: ''});
    const [isLoading, setIsLoading] = useState(false);

    const login = (event: any) => {
        event.preventDefault();
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