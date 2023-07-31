import React from 'react'
import './meal.scss'
import {useDispatch} from "react-redux";
import {removeNewItem} from "../../utils/store/asyncThunks";
import {Types} from "../../utils/types";
import apiService from "../../utils/apiService";
import {createSetMealsAction} from "../../utils/store/actionCreators";

export const Meal: React.FC<any> = ({meal}) => {

    const dispatch = useDispatch();
    const removeFunction = apiService.removeMeal;
    const setItemsAction = createSetMealsAction;
    const id = meal._id;

    const removeMeal = () => {
        dispatch(removeNewItem(removeFunction, setItemsAction, id));
    };


    return <div className='meal d-flex'>
        <div className="" onClick={removeMeal}>remove</div>
        <div>{meal.name}</div>
    </div>
};