import React, {useEffect} from "react";
import './app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useDispatch, useSelector} from 'react-redux'
import {MyRouter} from "../comps/myRouter";
import {Header} from "../comps/header/header";
import {Footer} from "../comps/footer/footer";
import {Types} from "../utils/types";
import {ToastContainer} from "../comps/ToastContainer/toastContainer";
import {checkCurrencyRateAndSetIfNeed, fetchCurrencyRate, fetchItems, fetchUser} from "../utils/store/asyncThunks";
import {getCreateSetItemsActionByType, setCurrentCurrencyRate, setIsAuthorizedAction} from "../utils/store/actionCreators";
import {itemTypes} from "../utils/itemTypes";
import apiService from "../utils/apiService";

const App: React.FC<any> = () => {

    const dispatch = useDispatch();

    const user: any = useSelector((state: Types.MainState) => {
        return state.user;
    });
    const isAuthorized: any = useSelector((state: Types.MainState) => {
        return state.user.isAuthorized;
    });

    const currentCurrencyRate: number = useSelector((state: Types.MainState) => {
        return state.user.currentCurrencyRate;
    });

    useEffect(() => {
        dispatch(fetchUser());
    }, []);

    useEffect(() => {
        if (user.currentUser.login) {
            dispatch(setIsAuthorizedAction(true))}
        }, [user]);

    useEffect(() => {
        if (isAuthorized) {
            dispatch(checkCurrencyRateAndSetIfNeed(user.currentUser.intakeData.currency.short_code));
            dispatch(fetchItems(itemTypes.PRODUCT, getCreateSetItemsActionByType(itemTypes.PRODUCT)));
            dispatch(fetchItems(itemTypes.DISH, getCreateSetItemsActionByType(itemTypes.DISH)));
            dispatch(fetchItems(itemTypes.MEAL, getCreateSetItemsActionByType(itemTypes.MEAL)));
        }
    }, [isAuthorized]);

    useEffect(() => {
        if (currentCurrencyRate && user.currentUser.intakeData?.currency.short_code) {
            const localStorageLabel = process.env.LOCALSTORAGE_RATE_LABEL || 'currentRate';
            localStorage.setItem(localStorageLabel, JSON.stringify({
                date: new Date,
                rate: currentCurrencyRate,
                currencyCode: user.currentUser.intakeData?.currency.short_code
            }));
        }
    }, [currentCurrencyRate]);

    return <React.StrictMode>
        <Header/>
        <ToastContainer/>
        <MyRouter isAuthorized={isAuthorized}/>
        <Footer/>
    </React.StrictMode>
};

export default App;