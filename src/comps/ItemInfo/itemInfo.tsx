import React from 'react'
import './itemInfo.scss'
import {itemTypes} from "../../utils/itemTypes";

export const ItemInfo: React.FC<any> = ({imgSrc, amount}) => {

    return <div className='item-info d-flex align-items-center flex-row flex-sm-column ps-1 pe-1'>
        <div className="item-info__image-container me-3 me-sm-0 mb-sm-1">
            <img src={imgSrc}/>
        </div>
        <div title={amount} className="item-info__amount">{amount}</div>
    </div>
};