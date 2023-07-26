import * as React from "react";
import {CompTemplate} from "./compTemplate";

const CompHOC = (Comp: React.FC<any>, props?: any) => {

    props = {...props};

    return <Comp {...props}/>
};

export const Comp = (props: any) => CompHOC(CompTemplate, props);