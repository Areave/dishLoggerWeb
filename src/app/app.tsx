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
import LoadingPage from "../pages/loadingPage/loadingPage";
import {ToastContainer} from "../comps/ToastContainer/toastContainer";
import {fetchUser} from "../utils/store/asyncThunks";

const App: React.FC<any> = () => {

    const dispatch = useDispatch();

    const isAuthorized: boolean = useSelector((state: Types.MainState) => {
        return state.user.isAuthorized;
    });
    // const isUserLoading: boolean = useSelector((state: Types.MainState) => {
    //     return state.user.isUserLoading;
    // });
    const messages: Types.Message[] = useSelector((state: Types.MainState) => {
        return state.messages.messages;
    });

    useEffect(() => {
        // if (!isAuthorized) {
        //     console.log('app - not authorized');
            dispatch(fetchUser());
        // }
    }, []);

    return <React.StrictMode>
        <Header/>
        <ToastContainer messages={messages}/>
        {/*{isUserLoading ? (*/}
        {/*    <LoadingPage/>*/}
        {/*) : (<>*/}
                <MyRouter isAuthorized={isAuthorized}/>
        {/*    </>*/}
        {/*)}*/}
        <Footer/>
    </React.StrictMode>
};

export default App;