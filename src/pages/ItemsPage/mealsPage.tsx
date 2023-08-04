import React from "react";
import {itemTypes} from "../../utils/itemTypes";
import {ProxyHOC} from "./proxyHOC";

const ItemsPageHOC = (Comp: React.FC<any>) => {
    return <Comp itemType={itemTypes.MEAL}/>
};

export const MealsPage = () => ItemsPageHOC(ProxyHOC);