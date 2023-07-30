import {Types} from '../../types'
import {createReducer} from "@reduxjs/toolkit";
import {setIsAuthorizedAction, setUserAction, setUserStatAction} from "../actionCreators";

const initialUserState = {
    isAuthorized: false,
    currentUser: {},
    userStat: {}
};

export default createReducer(initialUserState, (builder) => {
    builder.addCase(setUserAction, (state, action) => {state.currentUser = action.payload});
    builder.addCase(setUserStatAction, (state, action) => {state.userStat = action.payload});
    builder.addCase(setIsAuthorizedAction, (state, action) => {state.isAuthorized = action.payload});
});