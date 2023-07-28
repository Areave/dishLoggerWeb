import React, {useEffect} from "react";
import './mainPage.scss';
import {useDispatch, useSelector} from 'react-redux'
import ActionButton from "../../comps/actionButton/actionButton";
import apiService from "../../utils/apiService";
import {
    setIsAuthorizedAction,
    setUserStatAction
} from "../../utils/store/actionCreators";
import {RootState} from "../../utils/store";
import {useNavigate} from "react-router";
import {Stat} from "../../comps/Stat/stat";
import {Meals} from "../../comps/Meals/meals";



const MainPage: React.FC<any> = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        const date = new Date();
        const dateString = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;
        apiService.getStatsForOneDay({dateString}).then((dailyStat) => {
            console.log('dailyStat', dailyStat);
            dispatch(setUserStatAction(dailyStat));
        })
    }, []);

    // @ts-ignore
    const user: {
        userStat: any;
        name: string} = useSelector((state: RootState) => {
            console.log('userFromUseSelect', state.user);
        return state.user;
    });
    const meals = useSelector((state: {items: any}) => {
        // @ts-ignore
        return state.items.allMeals;
    });

    const logout = () => {
        apiService.logout().then(res => {
            dispatch(setIsAuthorizedAction(false));
            // removeCookie('jwt');
            navigate('/auth');
        });
    };

    // @ts-ignore
    return <div className="page main_page">
        <Stat mainStat={user.userStat.mainStat} statArray={user.userStat.statArray}/>
        <Meals meals={meals}/>
        <ActionButton onClick={logout} label={'logout'}/>
    </div>
};

export default MainPage;