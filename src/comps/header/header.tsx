import * as React from "react";
import {Types} from "../../utils/types";
import {HeaderTemplate} from "./headerTemplate";

const HeaderHOC = (Comp: React.FC<any>): Types.HOC => {
    return (props) => {
      return <Comp {...props}/>
  }
};

export const Header = HeaderHOC(HeaderTemplate);