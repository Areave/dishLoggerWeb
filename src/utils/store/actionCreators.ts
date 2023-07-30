import {Types} from '../types'
import {createAction} from "@reduxjs/toolkit";

// user
export const setUserAction = createAction('SET_USER', (user) => {
    return {payload: user}
});
export const setUserStatAction = createAction('SET_USER_STAT', (stat) => {
    return {payload: stat}
});
export const setIsAuthorizedAction = createAction('SET_ISAUTHORIZED', (isAuthorized: boolean) => {
    return {payload: isAuthorized}
});

// product
export const createSetProductAction = createAction('SET_PRODUCT', (product: any) => {
    return {payload: product}
});
export const createSetProductsAction = createAction('SET_PRODUCTS', (products: any) => {
    return {payload: products}
});

// dish
export const createSetDishAction = createAction('SET_DISH', (dish: any) => {
    return {payload: dish}
});
export const createSetDishesAction = createAction('SET_DISHES', (dishes: any) => {
    return {payload: dishes}
});

// meal
export const createSetMealAction = createAction('SET_MEAL', (meal: any) => {
    return {payload: meal}
});
export const createSetMealsAction = createAction('SET_MEALS', (meals: any) => {
    return {payload: meals}
});

// message
export const createAddMessageAction = createAction('ADD_MESSAGE', (message: any) => {
    return {payload: message}
});