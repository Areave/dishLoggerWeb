import {
    createAddDishAction, createAddMealAction,
    createAddMessageAction, createAddProductAction, createSetDishAction, createSetDishesAction, createSetItemsLoadingAction, createSetMealAction,
    createSetMealsAction, createSetProductAction, createSetProductsAction, setCurrentCurrencyRate,
    setIsAuthorizedAction,
    setIsUserLoading, setIsUserStatLoading,
    setUserAction,
    setUserStatAction
} from "./actionCreators";
import apiService from "../apiService";
import {itemTypes} from "../itemTypes";

export const checkResponseForMessage = (response: any, dispatch: any) => {
    if (response.message) {
        dispatch(createAddMessageAction(response.message));
    }
};

type Response = {
    user?: any,
    message?: any
}

export const fetchUser = () => {
    return (dispatch: any) => {
        // dispatch(setIsUserLoading(true));
        apiService.getUserData().then((response: Response) => {
            checkResponseForMessage(response, dispatch);
            // dispatch(setIsAuthorizedAction(true));
            dispatch(setUserAction(response.user));
            // dispatch(createSetMealsAction(response.user.meals));
            // dispatch(createSetDishesAction(response.user.dishes));
            // dispatch(createSetProductsAction(response.user.products));
        }).catch((error) => {
            checkResponseForMessage(error, dispatch);
            dispatch(setIsAuthorizedAction(false));
        }).finally(() => {
            dispatch(setIsUserLoading(false));
        })
    }
};
export const updateUser = (userData: any) => {
    return (dispatch: any) => {
        console.log('userData', userData);
        apiService.updateUserData(userData).then((response: Response) => {
            checkResponseForMessage(response, dispatch);
            console.log('response', response);
            // dispatch(setUserAction(response.user));
        }).catch((error) => {
            checkResponseForMessage(error, dispatch);
            dispatch(setIsAuthorizedAction(false));
        }).finally(() => {
            dispatch(setIsUserLoading(false));
        })
    }
};
export const fetchLogin = (data: any) => {
    return (dispatch: any) => {
        dispatch(setIsUserLoading(true));
        apiService.login(data).then((response: Response) => {
            // dispatch(setIsUserLoading(false));
            checkResponseForMessage(response, dispatch);
            dispatch(setIsAuthorizedAction(true));
            dispatch(setUserAction(response.user));
            // dispatch(createSetMealsAction(response.user.meals));
        }).catch((error) => {
            checkResponseForMessage(error, dispatch);
            // dispatch(setIsAuthorizedAction(false));
        }).finally(() => {
            dispatch(setIsUserLoading(false));
        })
    }
};

export const fetchUserStatForToday = () => {
    return (dispatch: any) => {
        const date = new Date();
        dispatch(setIsUserStatLoading(true));
        apiService.getStatsForOneDay({date}).then((dailyStat) => {
            checkResponseForMessage(dailyStat, dispatch);
            dispatch(setUserStatAction(dailyStat));
        }).catch((error) => {
            checkResponseForMessage(error, dispatch);
        }).finally(() => {
            dispatch(setIsUserStatLoading(false));
        })
    }
};
export const fetchCurrencyRate = (from: string) => {
    return (dispatch: any) => {
        // dispatch(setIsUserStatLoading(true));
        apiService.getCurrencyRate(from).then((currencyRate) => {
            const localStorageLabel = process.env.LOCALSTORAGE_RATE_LABEL || 'currentRate';
            localStorage.setItem(localStorageLabel, JSON.stringify({
                date: new Date,
                rate: currencyRate.value,
                currencyCode: from
            }));
            // checkResponseForMessage(currencyRate, dispatch);
            dispatch(setCurrentCurrencyRate(currencyRate.value));
        }).catch((error) => {
            checkResponseForMessage(error, dispatch);
        }).finally(() => {
            // dispatch(setIsUserStatLoading(false));
        })
    }
};
// export const fetchCurrencyList = ({from, to}: any) => {
//     return (dispatch: any) => {
//         // dispatch(setIsUserStatLoading(true));
//         apiService.getCurrenciesList().then((currencyList) => {
//             // checkResponseForMessage(currencyRate, dispatch);
//             // dispatch(setCurrentCurrencyRate(currencyRate));
//         }).catch((error) => {
//             checkResponseForMessage(error, dispatch);
//         }).finally(() => {
//             // dispatch(setIsUserStatLoading(false));
//         })
//     }
// };
export const addNewItem = (fetchFunction: any, setItemsAction: any, data: any) => {

    return (dispatch: any) => {
        dispatch(createSetItemsLoadingAction(true));
        fetchFunction(data).then((response: any) => {
            // console.log('response', response);
            checkResponseForMessage(response, dispatch);
            dispatch(setItemsAction(response));
        }).catch((error: any) => {
            checkResponseForMessage(error, dispatch);
        }).finally(() => {
            // dispatch(fetchUserStatForToday());
            dispatch(createSetItemsLoadingAction(false));
        })
    }
};
export const updateItem = (fetchFunction: any, setItemsAction: any, data: any) => {
    return (dispatch: any) => {
        dispatch(createSetItemsLoadingAction(true));
        fetchFunction(data).then((response: any) => {
            console.log('response', response);
            checkResponseForMessage(response, dispatch);
            dispatch(setItemsAction(response));
        }).catch((error: any) => {
            checkResponseForMessage(error, dispatch);
        }).finally(() => {
            // dispatch(fetchUserStatForToday());
            dispatch(createSetItemsLoadingAction(false));
        })
    }
};
export const removeNewItem = (removeFunction: any, setItemsAction: any, id: string) => {

    return (dispatch: any) => {
        dispatch(createSetItemsLoadingAction(true));
        removeFunction(id).then((response: any) => {
            checkResponseForMessage(response, dispatch);
            dispatch(setItemsAction(response));
        }).catch((error: any) => {
            checkResponseForMessage(error, dispatch);
        }).finally(() => {
            // dispatch(fetchUserStatForToday());
            dispatch(createSetItemsLoadingAction(false));
        })
    }
};
export const fetchItems = (itemType: string, setItemsAction: any) => {

    // console.log('from fetch', itemType);

    const fetchMethod = apiService.getApiMethodsObject(itemType).getAllItems;

    return (dispatch: any) => {
        dispatch(createSetItemsLoadingAction(true));
        // console.log(fetchMethod);

        setTimeout(() => {

            fetchMethod().then((response: any) => {

                // dispatch(createSetItemsLoadingAction(false));
                // if (itemType === itemTypes.MEAL && response.length > 0) {
                //     dispatch(fetchUserStatForToday());
                // }
                checkResponseForMessage(response, dispatch);
                dispatch(setItemsAction(response));
            }).catch((error: any) => {
                checkResponseForMessage(error, dispatch);
            }).finally(() => {
                // dispatch(fetchUserStatForToday());
                dispatch(createSetItemsLoadingAction(false));
            })
        }, 1000)
    }
};