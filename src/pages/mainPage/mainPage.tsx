import React, {useEffect, useState} from "react";
import './mainPage.scss';
import {useDispatch, useSelector} from 'react-redux'
import ActionButton from "../../comps/actionButton/actionButton";
import {Stat} from "../../comps/Stat/stat";
import {Meals} from "../../comps/Meals/meals";
import {fetchUserStatForToday} from "../../utils/store/asyncThunks";
import {Search} from "../../comps/Search/search";
import {AddItemModal} from "../../comps/AddItemModal/addItemModal";
import {Types} from "../../utils/types";


const MainPage: React.FC<any> = () => {

    const [filteredMeals, setFilteredMeals] = useState();
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserStatForToday());
    }, []);

    const userStat: Types.UserStat = useSelector((state: Types.MainState) => {
        console.log('userFromUseSelect', state.user);
        return state.user.userStat;
    });
    const meals = useSelector((state: { items: any }) => {
        return state.items.meals;
    });

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

    return <div className="page main_page">
        <div className="main_page__content">
            <AddItemModal showModal={showModal} setShowModal={setShowModal}/>
            <Stat mainStat={userStat.mainStat} statArray={userStat.statArray}/>
            <Search onSearchChange={onSearchChange}/>
            <ActionButton onClick={openModalToAddMeal} label={'add meal'}/>
            <Meals meals={filteredMeals || meals}/>
        </div>

    </div>
};

export default MainPage;