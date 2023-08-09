import React from "react";
import {ItemModalTemplate} from "./addItemModalTemplate";

const AddItemModalHOC = (Comp: React.FC<any>, props: any) => {

    props = {...props};

    return <Comp {...props}/>
};

export const AddItemModal = (props: any) => AddItemModalHOC(ItemModalTemplate, props);