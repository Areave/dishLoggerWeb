import React from 'react'
import './meal.scss'

export const Meal: React.FC<any> = ({meal, removeMeal}) => {
    return <div className='meal d-flex'>
        <div className="" onClick={() => removeMeal(meal._id)}>remove</div>
        <div>{meal.name}</div>
    </div>
};