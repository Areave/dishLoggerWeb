import React from 'react'
import './itemInfo.scss'
import {itemTypes} from "../../utils/itemTypes";

export const ItemInfo: React.FC<any> = ({imgSrc, amount, difference}) => {

    if (!amount || !imgSrc) return <></>;

    const getColorForDifference = (difference: number): string => {
        if (difference < 100) {
            return 'less'
        } else if (difference > 100) {
            return 'more'
        } else return 'equal';
    };
    const stringDifference = difference + '%';


    return <div className='item-info d-flex justify-content-center align-items-center flex-row flex-sm-column ps-1 pe-1'>
        {difference && <div title={stringDifference} className={"item-info__difference difference-label " + getColorForDifference(difference)}>{stringDifference}</div>}
        <div className="item-info__image-container me-3 me-sm-0 mb-sm-1">
            <img src={imgSrc}/>
        </div>
        <div title={amount} className="item-info__amount">{amount}</div>
    </div>
};