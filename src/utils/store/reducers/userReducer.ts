import {Types} from '../../types'

const initialUserState = {
    currentUser: {},
    userStat: {}
};

const userReducer = (state: Types.State, action: Types.Action) => {
    switch (action.type) {
        case 'SET_USER':
    return {...state, currentUser: action.payload};
        case 'SET_USER_STAT':
    return {...state, userStat: action.payload};
}
    return state || initialUserState;
};

export default userReducer