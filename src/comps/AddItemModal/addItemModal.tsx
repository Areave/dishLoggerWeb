import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {AddItemModalTemplate} from "./addItemModalTemplate";
import {Types} from "../../utils/types";
import {itemTypes} from "../../utils/itemTypes";
import {
    createAddDishAction,
    createAddMealAction, createAddProductAction,
    createSetDishAction, createSetDishesAction,
    createSetMealAction,
    createSetMealsAction,
    createSetProductAction, createSetProductsAction
} from "../../utils/store/actionCreators";
import {addNewItem} from "../../utils/store/asyncThunks";
import apiService from "../../utils/apiService";

const AddItemModalHOC = (Comp: React.FC<any>, props: any) => {



    props = {...props};

    return <Comp {...props}/>
};

export const AddItemModal = (props: any) => AddItemModalHOC(AddItemModalTemplate, props);