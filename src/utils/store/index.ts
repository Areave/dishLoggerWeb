import {createStore, combineReducers} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension";
import itemsReducer from './reducers/itemsReducer'
import userReducer from './reducers/userReducer'

const mainReducer = combineReducers({
    user: userReducer,
    items: itemsReducer
});

export type RootState = ReturnType<typeof mainReducer>
export default createStore(mainReducer, composeWithDevTools());
