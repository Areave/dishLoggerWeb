import React, {useCallback, useEffect, useMemo, useState} from "react";
import './mainPage.scss';
import {useDispatch, useSelector} from 'react-redux'
import ActionButton from "../../comps/actionButton/actionButton";
import {Stat} from "../../comps/Stat/stat";
// import {Meals} from "../../comps/Meals/meals";
import {addNewItem, fetchUserStatForToday, removeNewItem} from "../../utils/store/asyncThunks";
import {Search} from "../../comps/Search/search";
import {AddItemModal} from "../../comps/AddItemModal/addItemModal";
import {Types} from "../../utils/types";
import {itemTypes} from "../../utils/itemTypes";
import apiService from "../../utils/apiService";
import {createSetMealsAction} from "../../utils/store/actionCreators";


const MainPage: React.FC<any> = () => {

    const [filteredMeals, setFilteredMeals] = useState();
    const [showModal, setShowModal] = useState(false);
    const [searchString, setSearchString] = useState('');
    const dispatch = useDispatch();

    const userStat: Types.UserStat = useSelector((state: Types.MainState) => {
        return state.user.userStat;
    });
    const meals = useSelector((state: { items: any }) => {
        return state.items.meals;
    });

    const fetchStat = useCallback(() => {
        // dispatch(fetchUserStatForToday());
    }, [meals]);

    useEffect(() => {
        // fetchStat();
        // dispatch(fetchUserStatForToday());
    }, []);
    useEffect(() => {
        // @ts-ignore
        setFilteredMeals(filterMeals(searchString));
    }, [searchString, meals]);

    const filterMeals = (searchString: string): Types.Meal[] => {
        if (!searchString) {
            setFilteredMeals(meals);
            return;
        }
        const filterFunc = (meal: any) => {
            return meal.name.includes(searchString)
                || meal.description.includes(searchString);
        };
        return meals.filter(filterFunc);
    };

    const openModalToAddMeal = () => {
        setShowModal(true);
    };

    const [newItemData, setNewItemData] = useState({});
    const mockData = {
        meal: {
            "name": Math.random() + '' + Math.random() + Math.random() + Math.random() + Math.random() + Math.random(),
            "type": "meal",
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

    const addItem = () => {
        dispatch(createSetMealsAction([...meals, mockData.meal]));
        dispatch(addNewItem(apiService.addMeal, createSetMealsAction, {meal: mockData.meal}))
    };

    const removeMeal = (id: string) => {
        dispatch(createSetMealsAction(meals.filter((meal: Types.Meal) => meal._id !== id)));
        dispatch(removeNewItem(apiService.removeMeal, createSetMealsAction, id));
    };

    return <div className="page main-page">
        <div className="main-page__content">
            <AddItemModal targetItem={itemTypes.MEAL} setNewItemData={setNewItemData} addItem={addItem} showModal={showModal} closeModal={() => setShowModal(false)}/>
            <Stat mainStat={userStat.mainStat} statArray={userStat.statArray}/>
            {(filteredMeals || meals.length) ? <Search setSearchString={setSearchString}/> : <div className="text-center fw-bold py-1">No meals yet</div>}
            <ActionButton className='add-item__button my-3' onClick={() => openModalToAddMeal()} label={'add meal'}/>
            {/*<Meals meals={filteredMeals || meals} removeMeal={removeMeal}/>*/}
        </div>
    </div>
};

export default MainPage;