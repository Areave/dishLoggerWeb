import {Types} from "./types";

export const initProductItem: Types.Product = {
    isThisInitItem: true,
    name: '',
    type: 'PRODUCT',
    cookingCoefficient: 1,
    description: '',
    weight: 0,
    price: 0,
    energyValue: {
        calories: 0,
        proteines: 0,
        fats: 0,
        carbohydrates: 0
    },
    isThatPieceItem: false,
    amount: 0,
    priceForAllItems: 0,
    tags: [],
    energyValueForOneItem: {
        calories: 0,
        proteines: 0,
        fats: 0,
        carbohydrates: 0
    }
};

export const initDishItem: Types.Dish = {
    isThisInitItem: true,
    name: '',
    type: 'DISH',
    description: '',
    ingridients: [{}],
    weight: 0,
    price: 0,
    tags: [],
    energyValue: {
        calories: 0,
        proteines: 0,
        fats: 0,
        carbohydrates: 0
    }
};

export const initMealItem: Types.Meal = {
    isThisInitItem: true,
    name: '',
    type: 'MEAL',
    description: '',
    ingridients: [{}],
    weight: 0,
    price: 0,
    energyValue: {
        calories: 0,
        proteines: 0,
        fats: 0,
        carbohydrates: 0
    }
};