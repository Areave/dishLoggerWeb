import React, {useEffect, useState} from "react";
import ItemsPageTemplate from "./itemsPageTemplate";
import {useDispatch, useSelector} from "react-redux";
import {Types} from "../../utils/types";
import {addNewItem, updateItem, removeNewItem} from "../../utils/store/asyncThunks";
import {
    getCreateSetItemActionByType,
    getCreateSetItemsActionByType
} from "../../utils/store/actionCreators";
import apiService from "../../utils/apiService";
import {getPluralItemType, itemTypes} from "../../utils/itemTypes";
import mockItems from '../../assets/stub/users/login.json'
import {initDishItem, initMealItem, initProductItem} from "../../utils/initItems";

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
                // dispatch(fetchUserStatForToday());
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
            return;
        }
        // @ts-ignore
        setFilteredItems(filterItems(searchString));

    }, [searchString, itemsArray]);

    const getInitItemByType = (itemType: string): Types.CommonEntitiesType | {} => {
        switch (itemType) {
            case itemTypes.PRODUCT:
                return initProductItem;
                break;
            case itemTypes.DISH:
                return initDishItem;
                break;
            case itemTypes.MEAL:
                return initMealItem;
                break;
            default: return {};
        }
    };

    const openModalToAddItem = (event: any, item?: Types.CommonEntitiesType) => {
        event.stopPropagation();
        if (item) {
            setEditedItem(item);
        } else {
            setEditedItem(getInitItemByType(itemType));
        }
        setShowModal(true);
    };


    const addItem = (newItem: any) => {

        newItem.type = itemType;

        if (itemType === itemTypes.PRODUCT) {
            delete newItem.isThisInitItem;
            if (newItem.isThatPieceItem) {
                delete newItem.price;
                delete newItem.weight;
                delete newItem.energyValue;
            } else {
                delete newItem.priceForOneItem;
                delete newItem.amount;
                delete newItem.energyValueForOneItem;
                delete newItem.weightForAllItems;
            }
        }
        setShowModal(false);
        dispatch(addNewItem(apiMethodsObject.addItem, createSetItemsAction, newItem));
    };

    const updateExistingItem = (item: any) => {
        setShowModal(false);
        dispatch(updateItem(apiMethodsObject.updateItem, createSetItemsAction, item));
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
        updateExistingItem,
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