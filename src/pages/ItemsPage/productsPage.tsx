import React, {useEffect, useState} from "react";
import ItemsPageTemplate from "./itemsPageTemplate";
import {useDispatch, useSelector} from "react-redux";
import {Types} from "../../utils/types";
import {addNewItem, removeNewItem} from "../../utils/store/asyncThunks";
import {getCreateSetItemsActionByType} from "../../utils/store/actionCreators";
import apiService from "../../utils/apiService";
import {getPluralItemType, itemTypes} from "../../utils/itemTypes";
import mockItems from '../../assets/stub/mockItemsForAdding.json'

const ItemsPageHOC = (Comp: React.FC<any>, props?: any) => {

    const itemType = itemTypes.PRODUCT;

    const [filteredItems, setFilteredItems] = useState();
    const [showModal, setShowModal] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [newItemData, setNewItemData] = useState({});
    const dispatch = useDispatch();

    type ObjectKey = keyof typeof mockItems;
    const key = itemType.toLowerCase() as ObjectKey;

    const userStat: Types.UserStat = useSelector((state: Types.MainState) => {
        return state.user.userStat;
    });
    const itemsArray: Types.CommonEntitiesType[] = useSelector((state: {items: any}) => {
        return state.items[getPluralItemType(itemType)];
    });

    const createAction = getCreateSetItemsActionByType(itemType);
    const apiMethodsObject = apiService.getApiMethodsObject(itemType);

    const filterItems = (searchString: string): Types.CommonEntitiesType[] => {
        const filterFunc = (item: Types.CommonEntitiesType) => {
            return item.name.includes(searchString)
                || item.description.includes(searchString);
        };
        return itemsArray.filter(filterFunc);
    };

    useEffect(() => {
        if (searchString) {
            // @ts-ignore
            setFilteredItems(filterItems(searchString));
            return;
        }
    }, [searchString]);

    const openModalToAddItem = () => {
        setShowModal(true);
    };

    const addItem = () => {
        const newProduct = mockItems.productPieceAndAmount;
        // @ts-ignore
        dispatch(createAction([...itemsArray, newProduct]));
        dispatch(addNewItem(apiMethodsObject.addItem, createAction, {product: newProduct}))
    };

    const removeItem = (id: string) => {
        // @ts-ignore
        dispatch(createAction(itemsArray.filter((item: Types.CommonEntitiesType) => item._id !== id)));
        dispatch(removeNewItem(apiMethodsObject.removeItem, createAction, id));
    };

    const items = filteredItems ? filteredItems : itemsArray;

    const wrappedProps = {
        ...props,
        itemType,
        setNewItemData,
        addItem,
        showModal,
        setShowModal,
        items,
        userStat,
        setSearchString,
        openModalToAddItem,
        removeItem
    };

    return <Comp {...wrappedProps}/>
};

export const ProductsPage = () => ItemsPageHOC(ItemsPageTemplate);