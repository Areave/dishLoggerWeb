import {call, put, takeEvery} from 'redux-saga/effects';
import {setUserAction} from "./actionCreators";
import apiService from "../apiService";


const fetchUser = () => apiService.getUserData();

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