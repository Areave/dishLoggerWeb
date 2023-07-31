import React from 'react'
import './meals.scss'
import {Meal} from "../Meal/meal";

export const Meals: React.FC<any> = ({meals}) => {

    return <div className='meals'>
        {meals ? meals.map((meal: any, index: number) => <Meal key={index} mealData={meal}/>) : <div>no meals yet</div>}
    </div>
};