import React from 'react'
import './stat.scss'
import {useSelector} from "react-redux";
import {Types} from "../../utils/types";
import Loader from "../loader/loader";

export const Stat: React.FC<any> = ({mainStat, statArray}) => {

    console.log(statArray, mainStat);

    const isUserStatLoading: boolean = useSelector((state: Types.MainState) => {
        return state.user.isUserStatLoading;
    });

    return <div className='stat'>
        {isUserStatLoading && <Loader/>}
        {!isUserStatLoading && statArray && statArray.length && statArray[0].dateString}
    </div>
};