import React from "react";
import {ToastContainerTemplate} from "./toastContainerTemplate";
import {Types} from "../../utils/types";
import {useSelector} from "react-redux";

const ToastContainerHOC = (Comp: React.FC<any>, props?: any) => {

    const messages: Types.Message[] = useSelector((state: Types.MainState) => {
        return state.messages.messages;
    });

    props = {messages};

    return <Comp {...props}/>
};

export const ToastContainer = (props: any) => ToastContainerHOC(ToastContainerTemplate, props)