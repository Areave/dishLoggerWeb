import {Types} from '../types'
import {createAction} from "@reduxjs/toolkit";
import {itemTypes} from "../itemTypes";

// common getters
export const getCreateSetItemActionByType = (itemType: string) => {
    switch (itemType) {
        case(itemTypes.MEAL):
            return createSetMealAction;
        case(itemTypes.PRODUCT):
            return createSetProductAction;
        case(itemTypes.DISH):
            return createSetDishAction;
    }
};
export const getCreateSetItemsActionByType = (itemType: string) => {
    switch (itemType) {
        case(itemTypes.MEAL):
            return createSetMealsAction;
        case(itemTypes.PRODUCT):
            return createSetProductsAction;
        case(itemTypes.DISH):
            return createSetDishesAction;
    }
};
export const getCreateAddItemActionByType = (itemType: string) => {
    switch (itemType) {
        case(itemTypes.MEAL):
            return createAddMealAction;
        case(itemTypes.PRODUCT):
            return createAddProductAction;
        case(itemTypes.DISH):
            return createAddDishAction;
    }
};

// user
export const setUserAction = createAction('SET_USER', (user: Types.User) => {
    return {payload: user}
});
export const setUserStatAction = createAction('SET_USER_STAT', (stat: Types.UserStat) => {
    return {payload: stat}
});
export const setIsAuthorizedAction = createAction('SET_ISAUTHORIZED', (isAuthorized: boolean) => {
    return {payload: isAuthorized}
});
export const setIsUserLoading = createAction('SET_USER_LOADING', (isUserLoading: boolean) => {
    return {payload: isUserLoading}
});
export const setIsUserStatLoading = createAction('SET_USER_STAT_LOADING', (isUserStatLoading: boolean) => {
    return {payload: isUserStatLoading}
});
export const setCurrentCurrencyRate = createAction('SET_CURRENT_CURRENCY_RATE', (currentCurrencyRate: number) => {
    return {payload: currentCurrencyRate}
});

// product
export const createSetProductAction = createAction('SET_PRODUCT', (product: Types.Product) => {
    return {payload: product}
});
export const createSetProductsAction = createAction('SET_PRODUCTS', (products: Types.Product[]) => {
    return {payload: products}
});
export const createAddProductAction = createAction('ADD_PRODUCT', (product: Types.Product) => {
    return {payload: product}
});

// dish
export const createSetDishAction = createAction('SET_DISH', (dish: Types.Dish) => {
    return {payload: dish}
});
export const createSetDishesAction = createAction('SET_DISHES', (dishes: Types.Dish[]) => {
    return {payload: dishes}
});
export const createAddDishAction = createAction('ADD_DISH', (dish: Types.Dish) => {
    return {payload: dish}
});

// meal
export const createSetMealAction = createAction('SET_MEAL', (meal: Types.Meal) => {
    return {payload: meal}
});
export const createSetMealsAction = createAction('SET_MEALS', (meals: Types.Meal[]) => {
    return {payload: meals}
});
export const createAddMealAction = createAction('ADD_MEAL', (meal: Types.Meal) => {
    return {payload: meal}
});

// item loading
export const createSetItemLoadingAction = createAction('SET_ITEM_LOADING', (isItemLoading: boolean) => {
    return {payload: isItemLoading}
});
// items loading
export const createSetItemsLoadingAction = createAction('SET_ITEMS_LOADING', (isItemsLoading: boolean) => {
    return {payload: isItemsLoading}
});

// message
export const createAddMessageAction = createAction('ADD_MESSAGE', (message: Types.Message) => {
    return {payload: message}
});