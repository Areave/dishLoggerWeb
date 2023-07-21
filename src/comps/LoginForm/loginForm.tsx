import * as React from "react";
import {Types} from "../../utils/types";
import {LoginFormTemplate} from "./loginFormTemplate";
import apiService from "../../utils/apiService";
import {setIsAuthorizedAction, setUserAction} from "../../utils/store/actionCreators";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {useState} from "react";
import {useCookies} from "react-cookie";

const LoginFormHOC = (Comp: React.FC<any>, props?: any) => {



    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({login: '', password: ''});
    // const [cookies, setCookie, removeCookie] = useCookies();

    const login = (event: any) => {
        event.preventDefault();
        console.log(formData);
        apiService.login({
            login: 'joe',
            password: '1234'
        }).then(response => {
            // const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
            if (response.user) {
                dispatch(setIsAuthorizedAction(true));
                dispatch(setUserAction(response.user));

                // @ts-ignore
                // setCookie("jwt", '23423432', { path: "/" });
                // console.log(cookies.get['jwt']);
                navigate('/');
            } else {
                // const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
                // @ts-ignore
                // console.log(cookies['jwt']);
                dispatch(setIsAuthorizedAction(false));
            }
        });
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


    props = {...props, login, register, onEmailChange, onPasswordChange};

    return <Comp {...props}/>
};

export const LoginForm = (props: any) => LoginFormHOC(LoginFormTemplate, props);