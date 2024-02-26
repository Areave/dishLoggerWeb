export enum itemTypes {
    PRODUCT = 'PRODUCT',
    DISH = 'DISH',
    MEAL = 'MEAL'
}
export enum buildModeTypes {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production'
}
export const getPluralItemType = (itemType: string): string => {
    switch (itemType) {
        case itemTypes.MEAL: return 'meals';
        case itemTypes.DISH: return 'dishes';
        case itemTypes.PRODUCT: return 'products';
    }
};

export enum filterFunctionsEnum {
    BYNAME = 'sort by name',
    BYNAMEREVERSE = 'sort by name reverse',
    BYPRICE = 'sort by price',
    BYPRICEREVERSE = 'sort by price reverse',
}

export const sortMethodsList = [
  'dateFromEarlyToLate',
  'dateFromLateToEarly',
  'alphabet',
  'reverseAlphabet',
  'caloriesFromLowToHigh',
  'caloriesFromHighToLow',
  'priceFromExpensiveToCheap',
  'priceFromCheapToExpensive',
];