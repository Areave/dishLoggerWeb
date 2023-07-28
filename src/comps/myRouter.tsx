import React from "react";
import MainPage from "../pages/mainPage/mainPage";
import {Routes, Route, Navigate} from 'react-router-dom';
import AuthPage from "../pages/authPage/authPage";
import 'materialize-css'
// import {DropdownMenu} from "./Navigation/dropdownMenu";
import ActionButton from "./actionButton/actionButton";
import {Navigation} from "./Navigation/navigation";


export const MyRouter = ({isAuthorized}: any) => {
    return <>
        {/*{isAuthorized && <div className="action-buttons">*/}

        {/*    <ActionButton onClick={() => {*/}
        {/*    }} label={'Add'}/>*/}
        {/*</div>}*/}
        <Routes>
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
    </>
};