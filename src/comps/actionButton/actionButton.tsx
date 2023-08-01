import React from 'react'
import './actionButton.scss'
import {Types} from '../../utils/types'

const ActionButton: React.FC<Types.ActionButtonProps> = ({className, label, onClick}) => {
    let containerClassName = 'action-button__container';
    if (className) {
        containerClassName += ' ' + className;
    }
    return <div className={containerClassName}>
        <button className='action-button'
                onClick={onClick}>
            {label}
        </button>
    </div>
}

export default ActionButton;