import React from 'react'
import './meal.scss'
import {Types} from "../../utils/types";
import Trash from '../../assets/images/delete-item.png'
import ActionButton from "../actionButton/actionButton";
import {ItemType} from "../ItemType/itemType";
import {ItemInfo} from "../ItemInfo/itemInfo";
import Kcal from '../../assets/images/kcal.png';
import Money from '../../assets/images/money.png';
import Weight from '../../assets/images/weight.png';
import {ItemEnergyInfo} from "../ItemEnergyInfo/itemEnergyInfo";
import {Ingridient} from "../Ingridient/ingridient";

export interface Meal {
    _id: string,
    name: string,
    type: string,
    description: string,
    dateString: string,
    ingridients: {
        ingridient: Types.Product | Types.Dish,
        weight: number,
        amountOfItems: number,
        price: number,
        energyValue: {
            calories: number,
            proteines: number,
            fats: number,
            carbohydrates: number
        }
    }[],
    weight: number,
    price: number,
    energyValue: {
        calories: number,
        proteines: number,
        fats: number,
        carbohydrates: number
    }
}

export const Meal: React.FC<any> = ({meal, removeMeal}) => {
    return <div className='meal d-flex flex-column mb-3'>
        <div className="meal__header d-flex justify-content-between align-items-center">
            {/*<div title={meal.type} className='meal__type'>{meal.type}</div>*/}
            <ItemType itemType={meal.type}/>
            <div title={meal.name} className='meal__name pe-5 ps-5'>{meal.name}</div>
            <div className="meal__delete-icon-container" onClick={() => removeMeal(meal._id)}>
                <img src={Trash} alt="delete"/>
            </div>
        </div>
        <div title={meal.description} className="meal__description">{meal.description}</div>
        <div className="meal__info d-flex flex-column flex-sm-row justify-content-between">
            <div className="meal__amount-info d-flex justify-content-evenly flex-grow-1 mb-4 mb-sm-0">
                <ItemInfo imgSrc={Money} amount={meal.price}/>
                <ItemInfo imgSrc={Kcal} amount={meal.energyValue.calories}/>
                <ItemInfo imgSrc={Weight} amount={meal.weight}/>
            </div>
            <div className="meal__energy-info d-flex d-flex justify-content-evenly flex-grow-1">
                <ItemEnergyInfo label={'fats'} amount={meal.energyValue.fats}/>
                <ItemEnergyInfo label={'carb'} amount={meal.energyValue.carbohydrates}/>
                <ItemEnergyInfo label={'prot'} amount={meal.energyValue.proteines}/>
            </div>
        </div>
        <div className="meal__ingridients">
            <div className="text-center fw-bold py-3">Ingridients</div>
            {meal.ingridients.map((ingridient: any) => {
                return <Ingridient ingridient={ingridient}/>
            })}

        </div>
    </div>


};