import './secondPage.scss'
import React from 'react';
import PageTitleComp from "../../comps/headerTitleComp/headerTitleComp";
import NavigationButton from "../../comps/navigationButton/navigationButton";
import ErrorBoundary from "../errorBoundary/errorBoundary";

const SecondPage = () => {
    return <div className="secondPage">
        <div className="header">
            <PageTitleComp title={'SecondPage'}/>
        </div>
        <div className="content">
        </div>
        <div className="footer">
            <NavigationButton title={'go to main page'} route={'/'}/>
        </div>
    </div>
};
export default SecondPage;
