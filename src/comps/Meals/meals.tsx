import React from 'react'
import './meals.scss'

export const Meals: React.FC<any> = ({meals}) => {

    return <div className='meals'>
        {meals ? meals.map((meal: any) => <div>{meal.name}</div>) : <div>no meals yet</div>}
    </div>
};