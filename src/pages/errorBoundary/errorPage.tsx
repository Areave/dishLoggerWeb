import React from "react";
import './errorPage.scss'
import {Types} from "../../utils/types";

const ErrorPage: React.FC<any> = ({errorMessage}) => {
    return <div className='errorPage'>
        <div className='message'>error code is
            <div className='code'>
                {errorMessage}
            </div>
        </div>
    </div>
}

export default ErrorPage;
