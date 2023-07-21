import './loadingPage.scss'
import React from 'react';
import Loader from "../../comps/loader/loader";

const LoadingPage = () => {
    return <div className="loading_page">
        <div className="loader__wrapper">
            <Loader/>
        </div>
    </div>
};
export default LoadingPage;
