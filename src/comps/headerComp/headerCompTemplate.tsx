import React from 'react'
import './headerCompTemplate.scss'
import {Types} from '../../utils/types'
import PageTitleComp from "../headerTitleComp/headerTitleComp";
import {NavigationComp} from "../navLinkComp/navigationComp";

export const HeaderCompTemplate: React.FC<Types.ComponentProps> = (props) => {
    return <div className='headerComp'>
        <PageTitleComp title={'DishLogger App'}/>
        <NavigationComp/>
    </div>
};