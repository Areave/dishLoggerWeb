import React from 'react'
import './amountInfo.scss'
import {ItemInfo} from "../ItemInfo/itemInfo";
import Money from "../../assets/images/money.png";
import Kcal from "../../assets/images/kcal.png";
import Weight from "../../assets/images/weight.png";
import {ItemEnergyInfo} from "../ItemEnergyInfo/itemEnergyInfo";

export const AmountInfo: React.FC<any> = ({price, calories, weight, fats,carbohydrates, proteines}) => {
    return <div className="amount-info d-flex flex-column flex-sm-row justify-content-between">
        <div className="d-flex justify-content-evenly flex-grow-1 mb-4 mb-sm-0">
            <ItemInfo imgSrc={Money} amount={price}/>
            <ItemInfo imgSrc={Kcal} amount={calories}/>
            <ItemInfo imgSrc={Weight} amount={weight}/>
        </div>
        <div className="d-flex d-flex justify-content-evenly flex-grow-1">
            <ItemEnergyInfo label={'fats'} amount={fats}/>
            <ItemEnergyInfo label={'carb'} amount={carbohydrates}/>
            <ItemEnergyInfo label={'prot'} amount={proteines}/>
        </div>
    </div>
};