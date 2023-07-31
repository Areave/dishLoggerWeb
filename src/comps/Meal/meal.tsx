import React from 'react'
import './meal.scss'

export const Meal: React.FC<any> = ({mealData}) => {

    return <div className='meal'>
        <div>{mealData.name}</div>
    </div>
};