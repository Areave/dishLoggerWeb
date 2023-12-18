import React, {useEffect, useState} from "react";
import ItemsPageTemplate from "./itemsPageTemplate";
import {useDispatch, useSelector} from "react-redux";
import {Types} from "../../utils/types";
import {addNewItem, fetchItems, fetchUserStatForToday, removeNewItem} from "../../utils/store/asyncThunks";
import {
    getCreateSetItemActionByType,
    getCreateSetItemsActionByType
} from "../../utils/store/actionCreators";
import apiService from "../../utils/apiService";
import {getPluralItemType, itemTypes} from "../../utils/itemTypes";
import mockItems from '../../assets/stub/mockItemsForAdding.json'

const ItemsPageHOC = (Comp: React.FC<any>, props: any) => {

    const itemType = props.itemType;

    const [filteredItems, setFilteredItems] = useState();
    const [showModal, setShowModal] = useState(false);
    const [searchString, setSearchString] = useState();
    const [editedItem, setEditedItem] = useState(null);

    const dispatch = useDispatch();
    type ObjectKey = keyof typeof mockItems;
    const key = itemType.toLowerCase() as ObjectKey;

    const userStat: Types.UserStat = useSelector((state: Types.MainState) => {
        return state.user.userStat;
    });
    const itemsArray: Types.CommonEntitiesType[] = useSelector((state: { items: any }) => {
        return state.items[getPluralItemType(itemType)];
    });
    const isItemsLoading: boolean = useSelector((state: { items: any }) => {
        return state.items.isItemsLoading;
    });

    const createSetItemsAction = getCreateSetItemsActionByType(itemType);
    const createSetItemAction = getCreateSetItemActionByType(itemType);
    const apiMethodsObject = apiService.getApiMethodsObject(itemType);

    useEffect(() => {
        // console.log('itemsArray',itemsArray);
        // if (!itemsArray) {
            // dispatch(fetchItems(itemType, createSetItemsAction));
        // } else {
            if (!userStat.statArray.length) {
                dispatch(fetchUserStatForToday());
            }
        // }
    }, []);

    const filterItems = (searchString: string): Types.CommonEntitiesType[] => {
        const filterFunc = (item: Types.CommonEntitiesType) => {
            return item.name.includes(searchString)
                || item.description?.includes(searchString);
        };
        return itemsArray.filter(filterFunc);
    };

    useEffect(() => {
        if (typeof searchString === 'undefined' || searchString === '') {
            // @ts-ignore
            setFilteredItems(itemsArray);
            return
        }
        // @ts-ignore
        setFilteredItems(filterItems(searchString));

    }, [searchString, itemsArray]);

    const openModalToAddItem = (event: any, item?: Types.CommonEntitiesType) => {
        event.stopPropagation();
        if (item) {
            setEditedItem(item);
        }
        setShowModal(true);
    };

    const addItem = () => {
        const newItem = mockItems[key];
        console.log(newItem)
        newItem.name = Math.random() + ' ' + Math.random() + Math.random() + Math.random() + Math.random() + Math.random();
        // @ts-ignore
        dispatch(createSetItemsAction([...itemsArray, newItem]));
        dispatch(addNewItem(apiMethodsObject.addItem, createSetItemsAction, {[key]: mockItems[key]}))
    };

    const removeItem = (event: any, id: string) => {
        event.stopPropagation();
        // @ts-ignore
        dispatch(createSetItemsAction(itemsArray.filter((item: Types.CommonEntitiesType) => item._id !== id)));
        dispatch(removeNewItem(apiMethodsObject.removeItem, createSetItemsAction, id));
    };

    const wrappedProps = {
        ...props,
        itemType,
        editedItem,
        setEditedItem,
        addItem,
        showModal,
        setShowModal,
        items: filteredItems,
        userStat,
        setSearchString,
        openModalToAddItem,
        removeItem,
        isItemsLoading
    };

    return <Comp {...wrappedProps}/>
};

export const ProxyHOC = (props: any) => ItemsPageHOC(ItemsPageTemplate, props);