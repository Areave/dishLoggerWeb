import {useCallback} from "react";
import {useDispatch} from "react-redux";
import {createAddMessageAction} from "../store/actionCreators";

export const useError = () => {
    const dispatch = useDispatch();
    return useCallback( message => {
        dispatch(createAddMessageAction(message));
        if (message.errors) {
            message.errors.forEach((error: any) => {
                const messageObject = {
                    type: 'error',
                    text: error.msg
                };
                dispatch(createAddMessageAction(messageObject));
            })
        }
    }, []);
}