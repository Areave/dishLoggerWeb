import React from "react";
import {itemTypes} from "../../utils/itemTypes";
import {ProxyHOC} from "./proxyHOC";

const ItemsPageHOC = (Comp: React.FC<any>) => {
    return <Comp itemType={itemTypes.PRODUCT}/>
};

export const ProductsPage = () => ItemsPageHOC(ProxyHOC);