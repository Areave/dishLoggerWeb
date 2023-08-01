import React from 'react'
import './actionButton.scss'
import {Types} from '../../utils/types'

const ActionButton: React.FC<Types.ActionButtonProps> = ({customClassName, label, onClick}) => {
    let buttonClassName = 'action-button';
    if (customClassName) {
        buttonClassName += ' ' + customClassName;
    }
    return <button className={buttonClassName}
                   onClick={onClick}>
        {label}
    </button>
}

export default ActionButton;