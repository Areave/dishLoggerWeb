import React from "react";
import {Types} from "../../utils/types";
import {NavigationTemplate} from "./navigationTemplate";
import {connect, useSelector} from 'react-redux'

const NavigationHOC = (Comp: React.FC<any>, props: any) => {

    const isAuthorized = useSelector((state: Types.State) => {
        return state.user.isAuthorized;
    });
    const user = useSelector((state: Types.State) => {
        return state.user.currentUser;
    });

    const newProps = {...props, isAuthorized, user};

    return <Comp {...newProps}/>

};

export const Navigation = (props: any) => NavigationHOC(NavigationTemplate, props);