import React, {useEffect, useState} from "react";
import './app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider, useDispatch, useSelector} from 'react-redux'
import store from "../utils/store";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {MyRouter} from "../comps/myRouter";
import {Header} from "../comps/header/header";
import {FooterComp} from "../comps/footerComp/footerComp";
import apiService from "../utils/apiService";
import {setIsAuthorizedAction, setUserAction} from "../utils/store/actionCreators";
import {Types} from "../utils/types";
import Loader from "../comps/loader/loader";
import LoadingPage from "../pages/loadingPage/loadingPage";


const App: React.FC<any> = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isUserLoading, setIsUserLoading] = useState(true);
    const isAuthorized = useSelector((state: Types.State) => {
        return state.user.isAuthorized;
    });

    useEffect(() => {
        if (!isAuthorized) {
            apiService.getUserData().then(response => {
                setIsUserLoading(false);
                // @ts-ignore
                if (response._id) {
                    dispatch(setIsAuthorizedAction(true));
                    dispatch(setUserAction(response));
                    navigate('/');
                } else {
                    dispatch(setIsAuthorizedAction(false));
                }
            })
        }
    }, []);

    return <React.StrictMode>
        <Header/>
        {isUserLoading ? (
            <LoadingPage/>
        ) : (
            <MyRouter isAuthorized={isAuthorized}/>
        )}
        <FooterComp/>
    </React.StrictMode>
};

export default App;