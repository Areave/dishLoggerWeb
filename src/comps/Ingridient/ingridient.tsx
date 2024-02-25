import React from 'react'
import './ingridient.scss'
import {ItemType} from "../ItemType/itemType";

export const Ingridient: React.FC<any> = ({ingridient}) => {
    return <div className='ingridient d-flex flex-wrap align-items-center mb-4'>
        <div className="ingridient-header d-flex flex-grow-1 justify-content-between  align-items-center mb-3 mb-sm-0 me-sm-2">
            <ItemType itemType={ingridient.ingridient && ingridient.ingridient.type}/>
            <div title={ingridient.ingridient?.name || 'deleted'} className={"ingridient-name ms-2 " + (ingridient.ingridient ? '' : 'deleted')}>{ingridient.ingridient ? ingridient.ingridient.name : 'Deleted'}</div>
            {ingridient.amountOfItems && <div className="ingridient-info__item ingridient-amount">{ingridient.amountOfItems + 'p'}</div>}
            {ingridient.weight && <div className="ingridient-info__item ingridient-weight">{ingridient.weight + 'gr'}</div>}
            {ingridient.weightForTakenAmount && <div className="ingridient-info__item ingridient-weight">{ingridient.weightForTakenAmount + 'gr'}</div>}
            <div className="ingridient-info__item ingridient-calories">{ingridient.energyValue.calories + 'cal'}</div>
            <div className="ingridient-info__item ingridient-price">{ingridient.price + 's'}</div>
        </div>
        <div className="ingridient-info d-flex flex-grow-1 justify-content-evenly align-items-center">
            <div className="ingridient-info__item ingridient-fats">{ingridient.energyValue.fats + 'f'}</div>
            <div className="ingridient-info__item ingridient-carbohydrates">{ingridient.energyValue.carbohydrates + 'ch'}</div>
            <div className="ingridient-info__item ingridient-proteines">{ingridient.energyValue.proteines + 'pr'}</div>
        </div>
    </div>
};