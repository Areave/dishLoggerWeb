import React from "react";
import {Types} from "../../utils/types";
import {FooterTemplate} from "./footerTemplate";
import {connect} from 'react-redux'

const HeaderHOC = (Comp: React.FC<any>, props: any) => {

    props = {...props};

    return <Comp {...props}/>

};

export const Footer = (props: any) => HeaderHOC(FooterTemplate, props);