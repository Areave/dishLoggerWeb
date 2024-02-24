import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import AuthPage from "../pages/authPage/authPage";
import 'materialize-css'
// import {DropdownMenu} from "./Navigation/dropdownMenu";
import ActionButton from "./actionButton/actionButton";
import {Navigation} from "./Navigation/navigation";
import {MealsPage} from "../pages/ItemsPage/mealsPage";
import {itemTypes} from "../utils/itemTypes";
import {DishesPage} from "../pages/ItemsPage/dishesPage";
import {useSelector} from "react-redux";
import {Types} from "../utils/types";
import LoadingPage from "../pages/loadingPage/loadingPage";
import {setIsUserLoading} from "../utils/store/actionCreators";
import {ProductsPage} from "../pages/ItemsPage/productsPage";


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
                    <Route path='/' element={<DishesPage/>}/>
                    <Route path='/meals' element={<MealsPage/>}/>
                    <Route path='/dishes' element={<DishesPage/>}/>
                    <Route path='/products' element={<ProductsPage/>}/>
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