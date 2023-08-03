import React, {useCallback, useEffect, useState} from "react";
import ItemsPageTemplate from "./itemsPageTemplate";
import {useDispatch, useSelector} from "react-redux";
import {Types} from "../../utils/types";
import {addNewItem, fetchItems, fetchUser, fetchUserStatForToday, removeNewItem} from "../../utils/store/asyncThunks";
import {createSetDishesAction, createSetMealsAction, getCreateSetItemsActionByType} from "../../utils/store/actionCreators";
import apiService from "../../utils/apiService";
import {getPluralItemType, itemTypes} from "../../utils/itemTypes";
import ItemsPageTemplate2 from "../ItemsPage2/itemsPageTemplate2";

const ItemsPageHOC = (Comp: React.FC<any>, props?: any) => {

    const itemType = itemTypes.DISH;

    console.log('itemType', itemType)

    const [filteredItems, setFilteredItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [newItemData, setNewItemData] = useState({});
    const dispatch = useDispatch();

    type ObjectKey = keyof typeof mockData;
    const key = itemType.toLowerCase() as ObjectKey;

    const userStat: Types.UserStat = useSelector((state: Types.MainState) => {
        return state.user.userStat;
    });
    const itemsArray: Types.CommonEntitiesType[] = useSelector((state: {items: any}) => {
        return state.items[getPluralItemType(itemType)];
    });

    const apiMethodsObject = apiService.getApiMethodsObject(itemType);

    const fetchStat = useCallback(() => {
        dispatch(fetchUserStatForToday());
    }, [itemsArray]);

    useEffect(() => {
        if (!itemsArray.length) {
            dispatch(fetchItems(itemType, createAction));
        }
    }, []);

    useEffect(() => {
        if (searchString) {
            setFilteredItems(filterItems(searchString));
            return;
        }
        setFilteredItems(itemsArray);
    }, [searchString]);

    useEffect(() => {
        setFilteredItems(itemsArray);
    }, [itemsArray]);


    const filterItems = (searchString: string): Types.CommonEntitiesType[] => {
        const filterFunc = (item: Types.CommonEntitiesType) => {
            return item.name.includes(searchString)
                || item.description.includes(searchString);
        };
        return itemsArray.filter(filterFunc);
    };

    const openModalToAddItem = () => {
        setShowModal(true);
    };

    const mockData = {
        dish: {
            "name": Math.random() + '' + Math.random() + Math.random() + Math.random() + Math.random() + Math.random(),
            "type": "dish",
            "description": "my mealmy mealmy mealmy mealmy mealmy mealmy mealmy mealmy mealmy mealmy mealmy mealmy mealmy mealmy mealmy mealmy mealmy mealmy mealmy mealmy " +
                "mealmy mealmy mealmy mealmy mealmy mealmy mealmy meal",
            "ingridients": [{
                "ingridient": {
                    "_id": "64990c370fe5d33b76d0cdb7",
                    "name": "B",
                    "type": "product"
                },
                "weight": "350",
                "price": 77,
                "energyValue": {
                    "calories": 100,
                    "proteines": 100,
                    "fats": 10,
                    "carbohydrates": 100
                }
            }, {
                "ingridient": {
                    "_id": "64c09dd161060a8945bb1227",
                    "name": "breakfast1",
                    "type": "dish"
                },
                "weight": "350",
                "price": 77,
                "energyValue": {
                    "calories": 100,
                    "proteines": 100,
                    "fats": 10,
                    "carbohydrates": 100
                }
            }
            ],
            "weight": 1666,
            "price": 16666,
            "energyValue": {
                "calories": "12333",
                "proteines": "12333",
                "fats": "45677",
                "carbohydrates": "65432"
            }
        }
    };

    const createAction = getCreateSetItemsActionByType(itemType);

    const addItem = () => {
        // @ts-ignore
        dispatch(createSetDishesAction([...itemsArray, mockData[key]]));
        dispatch(addNewItem(apiMethodsObject.addItem, createAction, {[key]: mockData[key]}))
    };

    const removeItem = (id: string) => {
        // @ts-ignore
        dispatch(createAction(itemsArray.filter((item: Types.CommonEntitiesType) => item._id !== id)));
        dispatch(removeNewItem(apiMethodsObject.removeItem, createAction, id));
    };

    const wrappedProps = {
        ...props,
        itemType,
        setNewItemData,
        addItem,
        showModal,
        setShowModal,
        filteredItems,
        userStat,
        setSearchString,
        openModalToAddItem,
        removeItem
    };

    return <Comp {...wrappedProps}/>
};


export const DishesPage = () => ItemsPageHOC(ItemsPageTemplate);