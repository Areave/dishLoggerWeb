import {
    createAddMessageAction,
    createSetMealsAction,
    setIsAuthorizedAction,
    setIsUserLoading, setIsUserStatLoading,
    setUserAction,
    setUserStatAction
} from "./actionCreators";
import apiService from "../apiService";

const checkResponseForMessage = (response: any, dispatch: any) => {
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
        dispatch(setIsUserLoading(true));
        apiService.getUserData().then((response: Response) => {
            checkResponseForMessage(response, dispatch);
            dispatch(setIsAuthorizedAction(true));
            dispatch(setUserAction(response.user));
            dispatch(createSetMealsAction(response.user.meals));
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
            checkResponseForMessage(response, dispatch);
            dispatch(setIsAuthorizedAction(true));
            dispatch(setUserAction(response.user));
            dispatch(createSetMealsAction(response.user.meals));
        }).catch((error) => {
            checkResponseForMessage(error, dispatch);
            dispatch(setIsAuthorizedAction(false));
        }).finally(() => {
            dispatch(setIsUserLoading(false));
        })
    }
};

export const fetchUserStatForToday = () => {
    return (dispatch: any) => {
        const date = new Date();
        const dateString = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        dispatch(setIsUserStatLoading(true));
        apiService.getStatsForOneDay({dateString: '31.7.2023'}).then((dailyStat) => {
            checkResponseForMessage(dailyStat, dispatch);
            dispatch(setUserStatAction(dailyStat));
        }).catch((error) => {
            checkResponseForMessage(error, dispatch);
        }).finally(() => {
            dispatch(setIsUserStatLoading(false));
        })
    }
};