import React, {useEffect, useState} from "react";
import MainPage from "../pages/mainPage/mainPage";
import SecondPage from "../pages/secondPage/secondPage";
import {Routes, Route, useNavigate, BrowserRouter, Navigate} from 'react-router-dom';
import AuthPage from "../pages/authPage/authPage";
import 'materialize-css'
import {useDispatch, useSelector} from "react-redux";
import {Types} from "../utils/types";
import apiService from "../utils/apiService";
import {setIsAuthorizedAction, setUserAction} from "../utils/store/actionCreators";
import Loader from "./loader/loader";

// @ts-ignore
export const MyRouter = ({isAuthorized}) => {
    return <Routes>
        {isAuthorized ? (
            <>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/*' element={<Navigate to={'/'}/>}/>
            </>
        ) : (
            <>
                <Route path='/auth' element={<AuthPage/>}/>
                <Route path='/*' element={<Navigate to={'/auth'}/>}/>
            </>
        )}
    </Routes>
};