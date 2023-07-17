import React, {useEffect} from "react";
import './app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider, useDispatch, useSelector} from 'react-redux'
import store from "../utils/store";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {MyRouter} from "../comps/myRouter";
import {Header} from "../comps/header/header";
import {FooterComp} from "../comps/footerComp/footerComp";
import apiService from "../utils/apiService";
import {setIsAuthorizedAction} from "../utils/store/actionCreators";
import {Types} from "../utils/types";


const App: React.FC<any> = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthorized = useSelector((state: Types.State) => {
        return state.user.isAuthorized;
    });
    const user = useSelector((state: Types.State) => {
        return state.user.currentUser;
    });

    useEffect(() => {
        if (!isAuthorized) {
            apiService.getUserData().then(response => {
                if (response._id) {
                    dispatch(setIsAuthorizedAction(true));
                    navigate('/');
                } else {
                    dispatch(setIsAuthorizedAction(false));
                }
            })
        }
    }, []);

    return <React.StrictMode>
        <Header/>
        <MyRouter/>
        <FooterComp/>
    </React.StrictMode>
};

export default App;