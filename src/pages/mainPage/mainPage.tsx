import React, {useCallback, useEffect, useMemo, useState} from "react";
import './mainPage.scss';
import {useDispatch, useSelector} from 'react-redux'
import ActionButton from "../../comps/actionButton/actionButton";
import {Stat} from "../../comps/Stat/stat";
import {Meals} from "../../comps/Meals/meals";
import {addNewItem, fetchUserStatForToday} from "../../utils/store/asyncThunks";
import {Search} from "../../comps/Search/search";
import {AddItemModal} from "../../comps/AddItemModal/addItemModal";
import {Types} from "../../utils/types";
import {itemTypes} from "../../utils/itemTypes";
import apiService from "../../utils/apiService";
import {
    createAddDishAction,
    createAddMealAction,
    createAddProductAction,
    createSetDishesAction,
    createSetMealsAction, createSetProductsAction
} from "../../utils/store/actionCreators";


const MainPage: React.FC<any> = () => {

    const [filteredMeals, setFilteredMeals] = useState();
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const userStat: Types.UserStat = useSelector((state: Types.MainState) => {
        console.log('userFromUseSelect', state.user);
        return state.user.userStat;
    });
    const meals = useSelector((state: { items: any }) => {
        return state.items.meals;
    });

    const fetchStat = useCallback(() => {
        dispatch(fetchUserStatForToday());
    }, [meals]);

    useEffect(() => {
        // fetchStat();
        dispatch(fetchUserStatForToday());
    }, []);


    const onSearchChange = (event: any) => {
        const searchString = event.target.value;
        if (!searchString) {
            setFilteredMeals(meals);
            return;
        }
        const filterFunc = (meal: any) => {
            return meal.name.includes(searchString)
                || meal.description.includes(searchString);
        };
        const filteredMeals = meals.filter(filterFunc);
        setFilteredMeals(filteredMeals);
    };

    const openModalToAddMeal = () => {
        setShowModal(true);
    };

    const [newItemData, setNewItemData] = useState({});
    const mockData = {
        meal: {
            "name": Math.random() + '',
            "type": "meal",
            "description": "my meal",
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
            "weight": 1,
            "price": 1,
            "energyValue": {
                "calories": "1",
                "proteines": "1",
                "fats": "1",
                "carbohydrates": "1"
            }
        }
    };

    const addItem = () => {
        dispatch(createSetMealsAction([...meals, mockData.meal]));
        dispatch(addNewItem(apiService.addMeal, createSetMealsAction, {meal: mockData.meal}))
    };

    return <div className="page main_page">
        <div className="main_page__content">
            <AddItemModal targetItem={itemTypes.MEAL} setNewItemData={setNewItemData} addItem={addItem} showModal={showModal} closeModal={() => setShowModal(false)}/>
            <Stat mainStat={userStat.mainStat} statArray={userStat.statArray}/>
            <Search onSearchChange={onSearchChange}/>
            <ActionButton customClassName='add_item__button' onClick={openModalToAddMeal} label={'add meal'}/>
            <Meals meals={filteredMeals || meals}/>
        </div>

    </div>
};

export default MainPage;