// import {createStore, combineReducers, applyMiddleware} from 'redux'
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {composeWithDevTools} from "redux-devtools-extension";
import itemsReducer from './reducers/itemsReducer'
import userReducer from './reducers/userReducer'
import messagesReducer from './reducers/messagesReducer'
import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";

const mainReducer = combineReducers({
    user: userReducer,
    items: itemsReducer,
    messages: messagesReducer
});

export type RootState = ReturnType<typeof mainReducer>

export default configureStore({
    reducer: mainReducer,
    middleware: [thunk]
});