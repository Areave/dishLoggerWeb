import {Types} from '../../types'

const initialproductState = {
    currentProduct: {},
    // @ts-ignore
    allProducts: [],
    currentDish: {},
    // @ts-ignore
    allDishes: [],
    currentMeal: {},
    // @ts-ignore
    allMeals: [],
};

const itemsReducer = (state: Types.State, action: Types.Action) => {
    switch (action.type) {
        case 'SET_PRODUCT':
            return {...state, currentProduct: action.payload};
        case 'SET_PRODUCT_ARRAY':
            return {...state, allProducts: action.payload};
        case 'SET_DISH':
            return {...state, currentDish: action.payload};
        case 'SET_DISH_ARRAY':
            return {...state, allDishes: action.payload};
        case 'SET_MEAL':
            return {...state, currentMeal: action.payload};
        case 'SET_MEAL_ARRAY':
            console.log(action.payload);
            return {...state, allMeals: action.payload};
    }
    return state || initialproductState;
};

export default itemsReducer