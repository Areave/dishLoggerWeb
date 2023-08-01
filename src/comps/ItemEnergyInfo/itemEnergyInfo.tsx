import React from 'react'
import './itemEnergyInfo.scss'
import {itemTypes} from "../../utils/itemTypes";

export const ItemEnergyInfo: React.FC<any> = ({label, amount}) => {

    const className = 'item-energy-info d-flex justify-content-center align-items-center flex-row flex-sm-column px-2';

    return <div className={className + ' ' + label}>
        <div className="item-energy-info__label me-1 me-sm-0">{label}</div>
        <div title={amount} className="item-energy-info__amount">{amount}</div>
    </div>
};