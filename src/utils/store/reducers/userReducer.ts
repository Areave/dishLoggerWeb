import {Types} from '../../types'
import {createReducer} from "@reduxjs/toolkit";
import {
    setIsAuthorizedAction,
    setIsUserLoading,
    setUserAction,
    setUserStatAction,
    setIsUserStatLoading,
    setCurrentCurrencyRate
} from "../actionCreators";

const initialUserState: Types.UserState = {
    isAuthorized: false,
    currentUser: {
        _id: '',
        name: '',
        login: '',
        role: '',
        intakeData: {
            tags: {
                products: [],
                dishes: []
            },
            energyValue: {
                calories: 0,
                proteines: 0,
                fats: 0,
                carbohydrates: 0
            },
            currency: {
                symbol: '',
                name: '',
                short_code: '',
            }
        },
        products: [],
        dishes: [],
        meals: [],
    },
    userStat: {
        mainStat: {
            energyValue: {
                calories: 0,
                proteines: 0,
                fats: 0,
                carbohydrates: 0
            },
            weight: 0,
            price: 0,
        },
        statArray: []
    },
    isUserLoading: false,
    isUserStatLoading: false,
    currentCurrencyRate: 0
};

export default createReducer(initialUserState, (builder) => {
    builder.addCase(setUserAction, (state, action) => {
        state.currentUser = action.payload
    });
    builder.addCase(setUserStatAction, (state, action) => {
        state.userStat = action.payload
    });
    builder.addCase(setIsAuthorizedAction, (state, action) => {
        state.isAuthorized = action.payload
    });
    builder.addCase(setIsUserLoading, (state, action) => {
        state.isUserLoading = action.payload
    });
    builder.addCase(setIsUserStatLoading, (state, action) => {
        state.isUserStatLoading = action.payload
    });
    builder.addCase(setCurrentCurrencyRate, (state, action) => {
        state.currentCurrencyRate = action.payload
    });
});