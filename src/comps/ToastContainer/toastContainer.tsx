import React from "react";
import {ToastContainerTemplate} from "./toastContainerTemplate";

const ToastContainerHOC = (Comp: React.FC<any>, props?: any) => {

    props = {...props};

    return <Comp {...props}/>
};

export const ToastContainer = (props: any) => ToastContainerHOC(ToastContainerTemplate, props)