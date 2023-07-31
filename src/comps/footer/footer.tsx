import React from "react";
import {FooterTemplate} from "./footerTemplate";

const HeaderHOC = (Comp: React.FC<any>, props: any) => {

    props = {...props};

    return <Comp {...props}/>

};

export const Footer = (props: any) => HeaderHOC(FooterTemplate, props);