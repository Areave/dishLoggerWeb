import React from "react";
import {HeaderTemplate} from "./headerTemplate";

const HeaderHOC = (Comp: React.FC<any>, props: any) => {

  return <Comp {...props}/>

};

export const Header = (props: any) => HeaderHOC(HeaderTemplate, props);