import React from 'react'
import './headerTitleComp.scss'
import {Types} from '../../utils/types'

const HeaderTitleComp: React.FC<any> = (props: {title: string}) => {
    const {title} = props;
    return <h1 className="title">{title}</h1>
};

export default HeaderTitleComp;