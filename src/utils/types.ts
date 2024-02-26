import React, {Dispatch, SetStateAction} from "react";
import {itemTypes} from "./itemTypes";
import {AddItemModal} from "../comps/AddItemModal/addItemModal";

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
            tags?: {
                products: string[],
                dishes: string[],
            }
            energyValue?: {
                calories: number,
                proteines: number,
                fats: number,
                carbohydrates: number
            },
        },
        role: string,
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
        isThisInitItem?: boolean,
        _id?: number,
        name: string,
        type: string,
        // Только в PRODUCT
        cookingCoefficient: number,
        description: string,
        weight?: number,
        price?: number,
        energyValue?: EnergyValue,
        isThatPieceItem: boolean,
        amount?: number,
        // Только в PRODUCT
        weightForAllItems?: number
        priceForAllItems?: number,
        energyValueForOneItem?: EnergyValue,
        tags?: string[]
    }

    export interface Dish {
        isThisInitItem?: boolean,
        _id?: number,
        name: string,
        type: string,
        description: string,
        weight?: number,
        price?: number,
        energyValue?: EnergyValue,
        // isThatPieceItem: boolean,
        // amount?: number,
        // priceForAllItems?: number,
        // energyValueForOneItem?: EnergyValue,
        // Только в DISH и MEAL
        ingridients: Ingridient[] | [{}],
        tags?: string[]
    }

    export interface Meal {
        isThisInitItem?: boolean,
        _id?: number,
        name: string,
        type: string,
        description: string,
        weight: number,
        price: number,
        energyValue: EnergyValue,
        // Только в DISH и MEAL
        ingridients: Ingridient[] | [{}]
    }

    // common entities type
    export type CommonEntitiesType = Product | Dish | Meal;

    export type CommonEntitiesTypeWithIngridients = Dish | Meal;

    export type CommonEntitiesTypeCanBeAPiece = Dish | Product;

    export type IngridientInfo = {
        price: number,
        energyValue: EnergyValue
    };
    export type FilterObject = {
        searchString: string,
        searchTags: string[]
    };

    export type EnergyValue = {
        calories: number,
        proteines: number,
        fats: number,
        carbohydrates: number
    }

    export type Ingridient = {
        ingridient: Product | Dish | null,
        type: string,
        weight?: number,
        weightForTakenAmount?: number
        amount?: number,
        price: number,
        energyValue: EnergyValue
    };

    // props
    export interface ActionButtonProps {
        onClick: (arg?: any) => void,
        label: string,
        className?: string
    }
    export interface AddItemModalProps {
        itemType: string,
        showModal: boolean,
        closeModal: () => void,
        addItem: (item: any) => void,
        setEditedItem: (item: any) => void,
        updateExistingItem: (item: any) => void,
        editedItem: any;
    }
    export interface NewIngridientProps {
        index: number,
        ingridientObject: any,
        setNewIngridient: (ingridient: any, index: number) => void,
        removeIngridientField: (args: any) => void,
    }
    export interface AddProductCardProps {
        editedItem: any,
        setEditedItem: (item: any) => void,
    }
    export interface AddDishOrMealCardProps {
        editedItem: any,
        setEditedItem: (item: any) => void,
    }
    export interface DigitalValueItemProps {
        editedItem: any,
        setEditedItem: (item: any) => void,
        energyValueFieldName?: string,
        fieldName: string
    }
    export interface NewIngridientProps {
        index: number,
        ingridientObject: any,
        setNewIngridient: (item: any, index: number) => void,
        removeIngridientField: (item: any) => void
    }
}