import React, {useEffect, useState} from "react";
import ItemsPageTemplate from "./itemsPageTemplate";
import {useDispatch, useSelector} from "react-redux";
import {Types} from "../../utils/types";
import {addNewItem, fetchUserStatForToday, removeNewItem} from "../../utils/store/asyncThunks";
import {
    createSetMealAction,
    createSetMealsAction,
    getCreateSetItemActionByType,
    getCreateSetItemsActionByType
} from "../../utils/store/actionCreators";
import apiService from "../../utils/apiService";
import {getPluralItemType, itemTypes} from "../../utils/itemTypes";
import mockItems from '../../assets/stub/mockItemsForAdding.json'

const ItemsPageHOC = (Comp: React.FC<any>, props?: any) => {

    const itemType = itemTypes.MEAL;

    const [filteredItems, setFilteredItems] = useState();
    const [showModal, setShowModal] = useState(false);
    const [searchString, setSearchString] = useState();
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

    const createSetItemsAction = getCreateSetItemsActionByType(itemType);
    const createSetItemAction = getCreateSetItemActionByType(itemType);
    const apiMethodsObject = apiService.getApiMethodsObject(itemType);

    useEffect(() => {
        if (!userStat.statArray.length) {
                dispatch(fetchUserStatForToday());
        }
    }, []);

    const filterItems = (searchString: string): Types.CommonEntitiesType[] => {
        const filterFunc = (item: Types.CommonEntitiesType) => {
            console.log('from filter', item, item.name.includes(searchString))
            return item.name.includes(searchString)
                || item.description?.includes(searchString);
        };
        console.log(itemsArray.filter(filterFunc), searchString)
        return itemsArray.filter(filterFunc);
    };

    useEffect(() => {
        if (typeof searchString === 'undefined') return;
            // @ts-ignore
            setFilteredItems(filterItems(searchString));

    }, [searchString]);

    const openModalToAddItem = (item?: Types.CommonEntitiesType) => {
        if (item) {
            // @ts-ignore
            dispatch(createSetItemAction(item));
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

    const removeItem = (id: string) => {
        // @ts-ignore
        dispatch(createSetItemsAction(itemsArray.filter((item: Types.CommonEntitiesType) => item._id !== id)));
        dispatch(removeNewItem(apiMethodsObject.removeItem, createSetItemsAction, id));
    };

    const items = filteredItems ? filteredItems : itemsArray;

    console.log('filteredItems', !!filteredItems);
    console.log('items', items);

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

export const MealsPage = () => ItemsPageHOC(ItemsPageTemplate);