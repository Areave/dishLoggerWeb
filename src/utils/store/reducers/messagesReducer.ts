import {Types} from '../../types'


const initialMessagesState = {
    // @ts-ignore
    messages: []
};

const messagesReducer = (state: Types.State, action: Types.Action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return {...state, messages: [...state.messages, action.payload]};
    }
    return state || initialMessagesState;
};

export default messagesReducer