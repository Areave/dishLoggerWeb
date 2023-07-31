import React from "react";

export namespace Types {

    // state

    export interface MainState {
        readonly user: UserState;
        readonly items: ItemsState;
        readonly messages: MessagesState;
    }

    export interface UserState {
        readonly isAuthorized: boolean,
        readonly currentUser?: User,
        readonly userStat?: UserStat,
        readonly isUserLoading: boolean,
        readonly isUserStatLoading: boolean
    }

    export interface ItemsState {
        readonly product: Product | {},
        readonly products: Product[],
        readonly dish: Dish | {},
        readonly dishes: Dish[],
        readonly meal: Meal | {},
        readonly meals: Meal[],
        readonly isItemLoading: boolean,
        readonly isItemsLoading: boolean,
    }

    export interface MessagesState {
        messages: Message[]
    }

    // entities
    export interface User {
        name: string,
        login: string,
        intakeData?: {
            energyValue: {
                calories: number,
                proteines: number,
                fats: number,
                carbohydrates: number
            },
        },
        products?: Product[],
        dishes?: Dish[],
        meals?: Meal[],
    }

    export interface UserStat {
        readonly mainStat: {
            energyValue: {
                calories: number,
                proteines: number,
                fats: number,
                carbohydrates: number
            },
            weight: number,
            price: number,
        },
        readonly statArray: Stat[]
    }

    export interface Stat {
        dateString: string,
        energyValue: {
            calories: number,
            proteines: number,
            fats: number,
            carbohydrates: number
        }
        energyValueDifference: {
            calories: number,
            proteines: number,
            fats: number,
            carbohydrates: number
        }
        meals: Meal[],
        price: number,
        weight: number
    }

    export interface Message {
        type: string,
        text: string
    }

    export interface Product {
        name: string,
        type: string,
        description?: string,
        amountOfItems: number,
        weightTotal: number,
        price: {
            priceForOnePiece: number,
            priceTotal: number,
            priceFor100g: number
        },
        energyValueFor100g: {
            calories: number,
            proteines: number,
            fats: number,
            carbohydrates: number
        },
        energyValueForOneItem: {
            calories: number,
            proteines: number,
            fats: number,
            carbohydrates: number
        },
    }

    export interface Dish {
        name: string,
        type: string,
        description: string,
        ingridients: {
            ingridient: Product,
            weight: number,
            amountOfItems: number,
            price: number,
            energyValue: {
                calories: number,
                proteines: number,
                fats: number,
                carbohydrates: number
            }
        }[],
        weight: number,
        price: number,
        energyValue: {
            calories: number,
            proteines: number,
            fats: number,
            carbohydrates: number
        }
    }

    export interface Meal {
        name: string,
        type: string,
        description: string,
        dateString: string,
        ingridients: [{
            ingridient: Product | Dish,
            weight: number,
            amountOfItems: number,
            price: number,
            energyValue: {
                calories: number,
                proteines: number,
                fats: number,
                carbohydrates: number
            }
        }],
        weight: number,
        price: number,
        energyValue: {
            calories: number,
            proteines: number,
            fats: number,
            carbohydrates: number
        }
    }

    export interface ActionButtonProps {
        onClick: (arg?: any) => void,
        label: string
    }
}