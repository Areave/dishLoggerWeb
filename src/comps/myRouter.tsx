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
import {ItemsPage2} from "../pages/ItemsPage/itemsPage2";
import {useSelector} from "react-redux";
import {Types} from "../utils/types";
import LoadingPage from "../pages/loadingPage/loadingPage";
import {setIsUserLoading} from "../utils/store/actionCreators";


export const MyRouter = ({isAuthorized}: any) => {

    const isUserLoading: boolean = useSelector((state: Types.MainState) => {
        return state.user.isUserLoading;
    });

    if (isUserLoading) return <LoadingPage/>;
    return <>
        {/*{isAuthorized && <div className="action-buttons">*/}

        {/*    <ActionButton onClick={() => {*/}
        {/*    }} label={'Add'}/>*/}
        {/*</div>}*/}
        <Routes>
            {isAuthorized ? (
                <>
                    <Route path='/' element={<ItemsPage itemType={itemTypes.MEAL}/>}/>
                    <Route path='/dishes' element={<ItemsPage2 itemType={itemTypes.DISH}/>}/>
                    <Route path='/*' element={<Navigate to={'/'}/>}/>
                </>
            ) : (
                <>
                    <Route path='/auth' element={<AuthPage/>}/>
                    <Route path='/*' element={isUserLoading ? <LoadingPage/> : <Navigate to={'/auth'}/>}/>
                </>
            )}
        </Routes>
    </>
};