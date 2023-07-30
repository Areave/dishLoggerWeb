import {call, put, takeEvery} from 'redux-saga/effects';
import {createSetMealsAction, setIsAuthorizedAction, setUserAction} from "./actionCreators";
import apiService from "../apiService";
import {itemTypes} from "../itemTypes";
import {useNavigate} from "react-router-dom";
import {useError} from "../hooks/useError";


export const fetchUser = () => {
    // const navigate = useNavigate();
    // const showToast = useError();
    console.log('fetch')
    return (dispatch: any) => {
            apiService.getUserData().then((response: {
            user?: any,
            message?: any
        }) => {

            if(response.message) {
                // showToast(response.message);
            }
            if (response.user) {
                console.log(response)
                dispatch(setIsAuthorizedAction(true));
                dispatch(setUserAction(response.user));
                dispatch(createSetMealsAction(response.user.meals));
                // navigate('/');
            } else {
                dispatch(setIsAuthorizedAction(false));
            }
        })
        // );
    }
};

function* setUserSaga() {
    // @ts-ignore
    const data1 = yield call(fetchUser);
    console.log(data1);
    // @ts-ignore
    const user = yield call(() => new Promise(res => res(data1)));
    yield put(setUserAction(user));
}

export function* userWatcher() {
    yield takeEvery('SET_USER_SAGA', setUserSaga);
}