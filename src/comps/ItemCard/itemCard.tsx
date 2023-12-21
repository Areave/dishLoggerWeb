import React from 'react'
import './itemCard.scss'
import {Types} from "../../utils/types";
import Trash from '../../assets/images/delete-item.png'
import {ItemType} from "../ItemType/itemType";
import {Ingridient} from "../Ingridient/ingridient";
import {AmountInfo} from "../AmountInfo/amountInfo";
import Loader from "../loader/loader";

export const ItemCard: React.FC<any> = ({itemType, item, removeItem, openModalForEdit}) => {

    // console.log('item', item);

    return <div className='item d-flex flex-column mb-4' onClick={openModalForEdit}>
        <div className="item__header d-flex justify-content-between align-items-center">
            {/*<div title={item.type} className='item__type'>{item.type}</div>*/}
            <ItemType itemType={item.type}/>
            <div title={item.name} className='item__name pe-5 ps-5'>{item.name}</div>
            <div className="item__delete-icon-container">
                {item._id ? <img src={Trash} alt="delete" onClick={(event) => removeItem(event, item._id)}/> : <Loader isLittle={true}/>}
            </div>
        </div>
        <div title={item.description} className="item__description">{item.description}</div>
        <AmountInfo price={item.price || (item.priceForAllItems / item.amount)}
                    calories={item.energyValue?.calories || item.energyValueForOneItem?.calories}
                    weight={item.weight}
                    amount={item.amount}
                    fats={item.energyValue?.fats || item.energyValueForOneItem?.fats}
                    carbohydrates={item.energyValue?.carbohydrates || item.energyValueForOneItem?.carbohydrates}
                    proteines={item.energyValue?.proteines || item.energyValueForOneItem?.proteines}/>
        {item.ingridients && <div className="item__ingridients">
            <div className="text-center fw-bold py-3">Ingridients</div>
            {item.ingridients.map((ingridient: any, index: number) => {
                return <Ingridient key={index + "" + ingridient.name} ingridient={ingridient}/>
            })}
        </div>}
    </div>
};