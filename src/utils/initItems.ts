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
    isThatPieceProduct: false,
    amountOfPieces: 0,
    priceForAllPieces: 0,
    energyValueForOnePiece: {
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
    isThatPieceDish: false,
    amountOfItems: 0,
    price: 0,
    energyValue: {
        calories: 0,
        proteines: 0,
        fats: 0,
        carbohydrates: 0
    }
};