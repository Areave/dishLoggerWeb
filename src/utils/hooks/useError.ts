import {useCallback} from "react";
import Toast from 'react-bootstrap/Toast';

export const useError = () => {
    return useCallback( text => {
        // @ts-ignore
        if(window.M && text) {
            // @ts-ignore
            window.M.toast({
                html: text
            })
        }
    }, []);
}