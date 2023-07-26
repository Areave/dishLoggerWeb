import React from 'react'
import './toastContainerTemplate.scss'
import {Toast} from "../Toast/toast";

export const ToastContainerTemplate: React.FC<any> = ({messages}) => {

    return <div className='toast_container p-3 pe-5'>
        {messages.map((message: any) => <Toast text={message.text} type={message.type}/>)}
    </div>
};