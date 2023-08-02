import React from 'react'
import './itemCard.scss'
import {Types} from "../../utils/types";
import Trash from '../../assets/images/delete-item.png'
import {ItemType} from "../ItemType/itemType";
import {Ingridient} from "../Ingridient/ingridient";
import {AmountInfo} from "../AmountInfo/amountInfo";

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

export const ItemCard: React.FC<any> = ({itemType, item, removeItem}) => {
    return <div className='item d-flex flex-column mb-4'>
        <div className="item__header d-flex justify-content-between align-items-center">
            {/*<div title={item.type} className='item__type'>{item.type}</div>*/}
            <ItemType itemType={item.type}/>
            <div title={item.name} className='item__name pe-5 ps-5'>{item.name}</div>
            <div className="item__delete-icon-container" onClick={() => removeItem(item._id)}>
                <img src={Trash} alt="delete"/>
            </div>
        </div>
        <div title={item.description} className="item__description">{item.description}</div>
        <AmountInfo price={item.price}
                    calories={item.energyValue.calories}
                    weight={item.weight}
                    fats={item.energyValue.fats}
                    carbohydrates={item.energyValue.carbohydrates}
                    proteines={item.energyValue.proteines}/>
        <div className="item__ingridients">
            <div className="text-center fw-bold py-3">Ingridients</div>
            {item.ingridients.map((ingridient: any, index: number) => {
                return <Ingridient key={index + "" + ingridient.name} ingridient={ingridient}/>
            })}
        </div>
    </div>
};