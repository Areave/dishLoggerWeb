import React from 'react'
import './itemCard.scss'
import {Types} from "../../utils/types";
import Trash from '../../assets/images/delete-item.png'
import {ItemType} from "../ItemType/itemType";
import {Ingridient} from "../Ingridient/ingridient";
import {AmountInfo} from "../AmountInfo/amountInfo";
import Loader from "../loader/loader";

export interface Product {
    _id?: string,
    name: string,
    type: string,
    description?: string,
    weight?: number,
    price?: number,
    energyValue?: {
        calories: number,
        proteines: number,
        fats: number,
        carbohydrates: number
    },
    isThatPieceProduct: boolean,
    amountOfPieces?: number,
    priceForAllPieces?: number,
    energyValueForOnePiece?: {
        calories: number,
        proteines: number,
        fats: number,
        carbohydrates: number
    }
}

export const ItemCard: React.FC<any> = ({itemType, item, removeItem, openModalForEdit}) => {

    // console.log('item', item);

    return <div className='item d-flex flex-column mb-4' onClick={openModalForEdit}>
        <div className="item__header d-flex justify-content-between align-items-center">
            {/*<div title={item.type} className='item__type'>{item.type}</div>*/}
            <ItemType itemType={item.type}/>
            <div title={item.name} className='item__name pe-5 ps-5'>{item.name}</div>
            <div className="item__delete-icon-container">
                {item._id ? <img src={Trash} alt="delete" onClick={() => removeItem(item._id)}/> : <Loader isLittle={true}/>}
            </div>
        </div>
        <div title={item.description} className="item__description">{item.description}</div>
        <AmountInfo price={item.price || item.priceForAllPieces}
                    calories={item.energyValue?.calories || item.energyValueForOnePiece?.calories * item.amountOfPieces}
                    weight={item.weight}
                    amount={item.amountOfPieces}
                    fats={item.energyValue?.fats || item.energyValueForOnePiece?.fats * item.amountOfPieces}
                    carbohydrates={item.energyValue?.carbohydrates || item.energyValueForOnePiece?.carbohydrates * item.amountOfPieces}
                    proteines={item.energyValue?.proteines || item.energyValueForOnePiece?.proteines * item.amountOfPieces}/>
        {item.ingridients && <div className="item__ingridients">
            <div className="text-center fw-bold py-3">Ingridients</div>
            {item.ingridients.map((ingridient: any, index: number) => {
                return <Ingridient key={index + "" + ingridient.name} ingridient={ingridient}/>
            })}
        </div>}
    </div>
};