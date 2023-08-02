import React from "react";
import MainPage from "../pages/mainPage/mainPage";
import {Routes, Route, Navigate} from 'react-router-dom';
import AuthPage from "../pages/authPage/authPage";
import 'materialize-css'
// import {DropdownMenu} from "./Navigation/dropdownMenu";
import ActionButton from "./actionButton/actionButton";
import {Navigation} from "./Navigation/navigation";
import {ItemsPage} from "../pages/ItemsPage/itemsPage";
import {itemTypes} from "../utils/itemTypes";


export const MyRouter = ({isAuthorized}: any) => {
    return <>
        {/*{isAuthorized && <div className="action-buttons">*/}

        {/*    <ActionButton onClick={() => {*/}
        {/*    }} label={'Add'}/>*/}
        {/*</div>}*/}
        <Routes>
            {isAuthorized ? (
                <>
                    {/*<Route path='/' element={<MainPage/>}/>*/}
                    <Route path='/' element={<ItemsPage itemType={itemTypes.MEAL}/>}/>
                    <Route path='/dishes' element={<ItemsPage itemType={itemTypes.DISH}/>}/>
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