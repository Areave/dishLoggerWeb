import {Types} from '../types'

export const setUserAction: (user: any) => Types.Action = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
};
export const setUserStatAction: (stat: any) => Types.Action = (stat) => {
    return {
        type: 'SET_USER_STAT',
        payload: stat
    }
};
export const setIsAuthorizedAction: (isAuthorized: boolean) => Types.Action = (isAuthorized) => {
    return {
        type: 'SET_ISAUTHORIZED',
        payload: isAuthorized
    }
};
export const createSetItemAction: (itemType: string, item: any) => Types.Action = (itemType, item) => {
    return {
        type: `SET_${itemType}`,
        payload: item
    }
};
export const createSetItemsArrayAction: (itemType: string, items: any[]) => Types.Action = (itemType, items) => {
    return {
        type: `SET_${itemType}_ARRAY`,
        payload: items
    }
};
export const createAddMessageAction: (message: any) => Types.Action = (message) => {
    return {
        type: `ADD_MESSAGE`,
        payload: message
    }
};