import React from "react";
import {ToastTemplate} from "./toastTemplate";

const ToastHOC = (Comp: React.FC<any>, props?: any) => {

    props = {...props};

    return <Comp {...props}/>
};

export const Toast = (props: any) => ToastHOC(ToastTemplate, props);