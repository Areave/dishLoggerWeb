import React from 'react'
import './itemEnergyInfo.scss'
import {itemTypes} from "../../utils/itemTypes";

export const ItemEnergyInfo: React.FC<any> = ({label, amount, difference}) => {

    const className = 'item-energy-info d-flex justify-content-center align-items-center flex-row flex-sm-column px-2';

    const getColorForDifference = (difference: number): string => {
        if (difference < 100) {
            return 'less'
        } else if (difference > 100) {
            return 'more'
        } else return 'equal';
    };

    const stringDifference = difference + '%';

    return <div className={className + ' ' + label}>
        {difference && <div title={stringDifference} className={"item-energy-info__difference difference-label " + getColorForDifference(difference)}>{stringDifference}</div>}
        <div className="item-energy-info__label me-1 me-sm-0">{label}</div>
        <div title={amount} className="item-energy-info__amount">{amount}</div>
    </div>
};