import React, {useEffect} from "react";
import './app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider, useDispatch, useSelector} from 'react-redux'
import store from "../utils/store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MyRouter} from "../comps/myRouter";
import {HeaderComp} from "../comps/headerComp/headerComp";
import {FooterComp} from "../comps/footerComp/footerComp";
import apiService from "../utils/apiService";
import {setIsAuthorizedAction} from "../utils/store/actionCreators";
import {Types} from "../utils/types";


const App: React.FC<any> = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        apiService.getUserData().then(response => {
            if (response.message) {
                dispatch(setIsAuthorizedAction(false));
            } else {
                dispatch(setIsAuthorizedAction(true));
            }
        })
    }, []);

    return <React.StrictMode>
        <HeaderComp/>
        <MyRouter/>
        <FooterComp/>
    </React.StrictMode>
};

export default App;