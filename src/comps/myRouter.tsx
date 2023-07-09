import React from "react";
import MainPage from "../pages/mainPage/mainPage";
import SecondPage from "../pages/secondPage/secondPage";
import {Routes, Route, useNavigate} from 'react-router-dom';
import AuthPage from "../pages/authPage/authPage";

// @ts-ignore
export const MyRouter = ({isAuthorized}) => {
    const navigate = useNavigate();
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