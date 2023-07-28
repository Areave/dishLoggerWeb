import React from 'react'
import './stat.scss'

export const Stat: React.FC<any> = ({mainStat, statArray}) => {

    console.log(statArray);

    return <div className='stat'>
        {statArray ? statArray[0].dateString : 'no stats'}
    </div>
};