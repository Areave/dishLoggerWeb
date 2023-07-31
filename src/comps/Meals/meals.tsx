import React from 'react'
import './meals.scss'
import {Meal} from "../Meal/meal";
import {useDispatch} from "react-redux";
import {removeNewItem} from "../../utils/store/asyncThunks";

export const Meals: React.FC<any> = ({meals}) => {


    return <div className='meals'>
        {meals ? meals.map((meal: any, index: number) => <Meal key={index} meal={meal}/>) : <div>no meals yet</div>}
    </div>
};