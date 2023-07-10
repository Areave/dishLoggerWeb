import React from 'react'
import './navigationTemplate.scss'
import {Types} from '../../utils/types'
import {NavLink} from "react-router-dom";


// @ts-ignore
export const NavigationTemplate: React.FC<Types.ComponentProps> = ({isAuthorized, user}) => {
    return <div className='navigationComp'>
        {isAuthorized ? (
            <>
                <div className="">welcome, {user.name || 'stay fit'}</div>
                {/*<NavLink to={'/'}>main page</NavLink>*/}
                {/*<NavLink to={'/secondPage'}>second page</NavLink>*/}
            </>
        ) : (
            <>
                <div className="">NOT authorized</div>
                {/*<NavLink to={'/auth'}>auth</NavLink>*/}
            </>
        )}
    </div>
};