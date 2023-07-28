import React, {useEffect, useState} from "react";
import './app.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider, useDispatch, useSelector} from 'react-redux'
import store from "../utils/store";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {MyRouter} from "../comps/myRouter";
import {Header} from "../comps/header/header";
import {Footer} from "../comps/footer/footer";
import apiService from "../utils/apiService";
import {
    createAddMessageAction,
    createSetItemsArrayAction,
    setIsAuthorizedAction,
    setUserAction,
    setUserStatAction
} from "../utils/store/actionCreators";
import {Types} from "../utils/types";
import {useError} from "../utils/hooks/useError";
import Loader from "../comps/loader/loader";
import LoadingPage from "../pages/loadingPage/loadingPage";
import {Toast} from '../comps/Toast/toast'
import {ToastContainer} from "../comps/ToastContainer/toastContainer";
import ActionButton from "../comps/actionButton/actionButton";
import {itemTypes} from "../utils/itemTypes";

const App: React.FC<any> = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showToast = useError();
    const [isUserLoading, setIsUserLoading] = useState(true);

    const isAuthorized = useSelector((state: Types.State) => {
        return state.user.isAuthorized;
    });
    const messages = useSelector((state: Types.State) => {
        return state.messages.messages;
    });

    useEffect(() => {
        if (!isAuthorized) {
            apiService.getUserData().then((response: any) => {
                console.log('response', response);
                setIsUserLoading(false);
                console.log('response', response);
                if(response.message) {
                    showToast(response.message);
                }
                if (response.user) {
                    dispatch(setIsAuthorizedAction(true));
                    dispatch(setUserAction(response.user));
                    dispatch(createSetItemsArrayAction(itemTypes.MEAL, response.user.meals));
                    navigate('/');
                } else {
                    dispatch(setIsAuthorizedAction(false));
                }
            })
        }
    }, []);

    return <React.StrictMode>
        <Header/>
        <ToastContainer messages={messages}/>
        {isUserLoading ? (
            <LoadingPage/>
        ) : (<>
             {/*<ActionButton onClick={()=>{dispatch(createAddMessageAction({*/}
             {/*    message: 'message message message message message message message message ',*/}
             {/*    type: 'error'*/}
             {/*}))}} label={'add message'}/>*/}
            {/*<Toast text={userName}/>*/}
            <MyRouter isAuthorized={isAuthorized}/>
            </>
        )}
        <Footer/>
    </React.StrictMode>
};

export default App;