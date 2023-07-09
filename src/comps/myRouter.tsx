import React from "react";
import MainPage from "../pages/mainPage/mainPage";
import SecondPage from "../pages/secondPage/secondPage";
import {Routes, Route, useNavigate, BrowserRouter} from 'react-router-dom';
import AuthPage from "../pages/authPage/authPage";
import {useSelector} from "react-redux";
import {Types} from "../utils/types";

// @ts-ignore
export const MyRouter = () => {
    // const navigate = useNavigate();
    const isAuthorized = useSelector((state: Types.State) => {
        return state.user.isAuthorized;
    });
    if (!isAuthorized) {
        return <>
            <Routes>
                <Route path='/*' element={<AuthPage/>}/>
            </Routes>
        </>
    } else {
        return <>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/secondPage' element={<SecondPage/>}/>
            </Routes>
        </>
    }

};