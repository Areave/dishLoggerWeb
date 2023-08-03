import React from 'react'
import './dailyStat.scss'
import {StatSlider} from "../StatSlider/statSlider";
import {useSelector} from "react-redux";
import {Types} from "../../utils/types";
import Loader from "../loader/loader";
import {AmountInfo} from "../AmountInfo/amountInfo";

export const DailyStat: React.FC<any> = ({dailyStat}) => {

    const isUserStatLoading: boolean = useSelector((state: Types.MainState) => {
        return state.user.isUserStatLoading;
    });

    const createSliderItemsArray = (dailyStat: any[]): any[] => {
        return dailyStat.map((statObject: any) => {
            return <>
                <div className="text-center fw-bold py-3">{'Daily stat for ' + statObject.dateString}</div>
                <AmountInfo price={statObject.price}
                            calories={statObject.energyValue.calories}
                            weight={statObject.weight}
                            fats={statObject.energyValue.fats}
                            carbohydrates={statObject.energyValue.carbohydrates}
                            proteines={statObject.energyValue.proteines}/>
            </>
        })
    };

    return <div className='daily-stat w-100 d-flex'>
        {!isUserStatLoading && dailyStat && <StatSlider items={createSliderItemsArray(dailyStat)}/>}
        {isUserStatLoading && <Loader/>}
    </div>

};