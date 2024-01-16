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