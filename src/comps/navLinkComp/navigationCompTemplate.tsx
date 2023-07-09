import React from 'react'
import './navigationCompTemplate.scss'
import {Types} from '../../utils/types'
import {NavLink} from "react-router-dom";

// @ts-ignore
export const NavigationCompTemplate: React.FC<Types.ComponentProps> = ({isAuthorized}) => {
    return <div className='navigationComp'>
        {isAuthorized ? (
            <>
                <div className="">isAuthorized</div>
                <NavLink to={'/'}>main page</NavLink>
                <NavLink to={'/secondPage'}>second page</NavLink>
            </>
        ) : (
            <>
                <div className="">NOT authorized</div>
                <NavLink to={'/auth'}>auth</NavLink>
            </>
        )}
    </div>
};