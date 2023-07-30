import {Types} from '../../types'
import {createReducer} from "@reduxjs/toolkit";
import {createAddMessageAction} from "../actionCreators";

const initialMessagesState = {
    // @ts-ignore
    messages: []
};

export default createReducer(initialMessagesState, (builder) => {
    builder.addCase(createAddMessageAction, (state, action) => {state.messages = [...state.messages, action.payload]});
});