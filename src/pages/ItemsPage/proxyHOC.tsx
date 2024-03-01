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
import {getPluralItemType, itemTypes, filterFunctionsEnum} from "../../utils/itemTypes";
import mockItems from '../../assets/stub/users/login.json'
import {initDishItem, initMealItem, initProductItem} from "../../utils/initItems";
import {types} from "util";

const ItemsPageHOC = (Comp: React.FC<any>, props: any) => {

    const itemType = props.itemType;

    const [filteredItems, setFilteredItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [filterObject, setFilterObject] = useState({
        searchString: '',
        searchTags: [],
        sorted: ''
    });
    const [editedItem, setEditedItem] = useState(null);

    const dispatch = useDispatch();
    type ObjectKey = keyof typeof mockItems;
    const key = itemType.toLowerCase() as ObjectKey;

    const userStat: Types.UserStat = useSelector((state: Types.MainState) => {
        return state.user.userStat;
    });
    const pageTags: any = useSelector((state: Types.MainState) => {
        const fieldName = getPluralItemType(itemType);
        // @ts-ignore
        return state.user.currentUser.intakeData.tags[fieldName];
    });
    const itemsArray: Types.CommonEntitiesType[] = useSelector((state: { items: any }) => {
        return state.items[getPluralItemType(itemType)];
    });
    const isItemsLoading: boolean = useSelector((state: { items: any }) => {
        return state.items.isItemsLoading;
    });
    const filterOptions = Object.values(filterFunctionsEnum);

    useEffect(() => {
        if (isFilterObjectEmpty(filterObject)) {
            setFilteredItems(itemsArray);
        } else {
            const filteredItemsArray = getFilteredItemsArray(itemsArray, filterObject);
            setFilteredItems(filteredItemsArray);
        }

    }, [filterObject, itemsArray]);

    const createSetItemsAction = getCreateSetItemsActionByType(itemType);
    const apiMethodsObject = apiService.getApiMethodsObject(itemType);

    const isFilterObjectEmpty = (filterObject: Types.FilterObject): boolean => {
        // TODO: универсализировать?
        return (!filterObject.searchString
            && !filterObject.searchTags.length
            && !filterObject.sorted);
    };

    const getSortFunctionByType = (type: string): any => {

        const sortByName = (itemA: Types.CommonEntitiesType, itemB: Types.CommonEntitiesType) => {
            const isGreater = itemA.name.toLowerCase() > itemB.name.toLowerCase()
            if (isGreater) {return 1} else {return -1}
        };
        const sortByNameReverse = (itemA: Types.CommonEntitiesType, itemB: Types.CommonEntitiesType) => {
            const isGreater = itemA.name.toLowerCase() < itemB.name.toLowerCase()
            if (isGreater) {return 1} else {return -1}
        };

        const sortByPrice = (itemA: Types.CommonEntitiesType, itemB: Types.CommonEntitiesType) => {
            return itemA.price - itemB.price;
        };
        const sortByPriceReverse = (itemA: Types.CommonEntitiesType, itemB: Types.CommonEntitiesType) => {
            return itemB.price - itemA.price;
        };

        switch (type) {
            case filterFunctionsEnum.BYNAME:
                return sortByName;
                break;
            case filterFunctionsEnum.BYNAMEREVERSE:
                return sortByNameReverse;
                break;
            case filterFunctionsEnum.BYPRICE:
                return sortByPrice;
                break;
            case filterFunctionsEnum.BYPRICEREVERSE:
                return sortByPriceReverse;
                break;
            default:
                return sortByName;
        }
    };

    const getFilteredItemsArray = (itemsArray: Types.CommonEntitiesType[], filterObject: Types.FilterObject): Types.CommonEntitiesType[] => {

        if (itemsArray.length === 0) return itemsArray;

        let filteredItemsArray: Types.CommonEntitiesType[] = itemsArray;

        if (filterObject.searchString) {
            const filterFunc = (item: Types.CommonEntitiesType) => {
                return item.name.toLowerCase().includes(filterObject.searchString.toLowerCase())
                    || item.description.toLowerCase().includes(filterObject.searchString.toLowerCase());
            };
            filteredItemsArray = filteredItemsArray.filter(filterFunc);
        }

        if (filterObject.searchTags.length) {
            const filterFunc = (item: Types.CommonEntitiesType) => {
                // @ts-ignore
                if (!item.tags || !item.tags.length) {
                    return false;
                } else {
                    // @ts-ignore
                    return item.tags.some((itemTag: string) => {
                        return filterObject.searchTags.some((localTag: string) => {
                            // @ts-ignore
                            return item.tags.includes(localTag);
                        })
                    })
                }
            };
            filteredItemsArray = filteredItemsArray.filter(filterFunc);
        }

        if (filterObject.sorted) {
            const sortFunc = getSortFunctionByType(filterObject.sorted);
            filteredItemsArray = [...filteredItemsArray].sort(sortFunc);
        }
        return filteredItemsArray;
    };

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
            default:
                return {};
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
                delete newItem.priceForAllItems;
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
        filteredItems,
        userStat,
        openModalToAddItem,
        removeItem,
        isItemsLoading,
        filterObject,
        setFilterObject,
        pageTags,
        filterOptions
    };

    return <Comp {...wrappedProps}/>
};

export const ProxyHOC = (props: any) => ItemsPageHOC(ItemsPageTemplate, props);