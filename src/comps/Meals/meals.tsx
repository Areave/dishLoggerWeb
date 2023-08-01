import React from 'react'
import './meals.scss'
import {Meal} from "../Meal/meal";

export const Meals: React.FC<any> = ({meals, removeMeal}) => {
    return <div className='meals-container'>
        {meals ? meals.map((meal: any, index: number) => <Meal key={index} meal={meal} removeMeal={removeMeal}/>) : <div>no meals yet</div>}
    </div>
};