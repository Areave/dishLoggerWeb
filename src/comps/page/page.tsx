import React from 'react'
import './page.scss';
import {Header} from "../header/header";
import NavigationButton from "../navigationButton/navigationButton";
import {MyRouter} from "../myRouter";
import {Footer} from "../footer/footer";

const Page = () => {
    return <div className="page">
        <div className="header">
            <Header/>
        </div>
        <div className="content">
        </div>
        <div className="footer">
            <Footer/>
        </div>
    </div>
};

export default Page;