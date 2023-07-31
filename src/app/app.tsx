import React, {useEffect} from "react";
import './app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
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

    const isAuthorized = useSelector((state: Types.State) => {
        return state.user.isAuthorized;
    });
    const isUserLoading = useSelector((state: Types.State) => {
        return state.user.isUserLoading;
    });
    const messages = useSelector((state: Types.State) => {
        return state.messages.messages;
    });

    useEffect(() => {

        console.log(process.env.NODE_ENV);
        if (!isAuthorized) {
            dispatch(fetchUser());
        }
    }, []);

    return <React.StrictMode>
        <Header/>
        <ToastContainer messages={messages}/>
        {isUserLoading ? (
            <LoadingPage/>
        ) : (<>
            <MyRouter isAuthorized={isAuthorized}/>
            </>
        )}
        <Footer/>
    </React.StrictMode>
};

export default App;