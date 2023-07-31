import {Types} from '../../types'
import {createReducer} from "@reduxjs/toolkit";
import {
    createSetDishAction,
    createSetDishesAction, createSetItemLoadingAction, createSetItemsLoadingAction,
    createSetMealAction,
    createSetMealsAction,
    createSetProductAction,
    createSetProductsAction,
} from "../actionCreators";

const initialItemState: Types.ItemsState = {
    product: {},
    products: [],
    dish: {},
    dishes: [],
    meal: {},
    meals: [],
    isItemLoading: false,
    isItemsLoading: false,
};

export default createReducer(initialItemState, (builder) => {
    builder.addCase(createSetProductAction, (state, action) => {state.product = action.payload});
    builder.addCase(createSetProductsAction, (state, action) => {state.products = action.payload});
    builder.addCase(createSetDishAction, (state, action) => {state.dish = action.payload});
    builder.addCase(createSetDishesAction, (state, action) => {state.dishes = action.payload});
    builder.addCase(createSetMealAction, (state, action) => {state.meal = action.payload});
    builder.addCase(createSetMealsAction, (state, action) => {state.meals = action.payload});
    builder.addCase(createSetItemLoadingAction, (state, action) => {state.isItemLoading = action.payload});
    builder.addCase(createSetItemsLoadingAction, (state, action) => {state.isItemsLoading = action.payload});
});