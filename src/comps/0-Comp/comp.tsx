import React, {JSXElementConstructor} from "react";
import {CompTemplate} from "./compTemplate";
import {Types} from "../../utils/types";

const CompHOC = (WrappedComp: JSXElementConstructor<any>, props?: any) => {

    props = {...props};

    return <WrappedComp {...props}/>
};

export const Comp = (props: any) => CompHOC(CompTemplate, props);