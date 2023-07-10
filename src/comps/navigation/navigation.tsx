import * as React from "react";
import {Types} from "../../utils/types";
import {NavigationTemplate} from "./navigationTemplate";
import {connect, useSelector} from 'react-redux'

const NavigationHOC = (Comp: React.FC<any>): Types.HOC => {

    return () => {
        const isAuthorized = useSelector((state: Types.State) => {
            return state.user.isAuthorized;
        });
        const user = useSelector((state: Types.State) => {
            return state.user.currentUser;
        });

        const props = {isAuthorized, user};

      return <Comp {...props}/>
  }
};

export const Navigation = NavigationHOC(NavigationTemplate);