import React from 'react'
import './page.scss';
import {Header} from "../header/header";
import NavigationButton from "../navigationButton/navigationButton";
import {MyRouter} from "../myRouter";
import {FooterComp} from "../footerComp/footerComp";

const Page = () => {
    return <div className="page">
        <div className="header">
            <Header/>
        </div>
        <div className="content">
        </div>
        <div className="footer">
            <FooterComp/>
        </div>
    </div>
};

export default Page;