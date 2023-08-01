import React from 'react'
import './stat.scss'
import {useSelector} from "react-redux";
import {Types} from "../../utils/types";
import Loader from "../loader/loader";
import {AmountInfo} from "../AmountInfo/amountInfo";

export const Stat: React.FC<any> = ({mainStat, dailyStat}) => {

    console.log(mainStat, dailyStat);

    const isUserStatLoading: boolean = useSelector((state: Types.MainState) => {
        return state.user.isUserStatLoading;
    });

    interface UserStat {
        readonly mainStat: {
            energyValue: {
                calories: number,
                proteines: number,
                fats: number,
                carbohydrates: number
            },
            weight: number,
            price: number,
        },
        readonly statArray: Stat[]
    }

    interface Stat {
        dateString: string,
        energyValue: {
            calories: number,
            proteines: number,
            fats: number,
            carbohydrates: number
        }
        energyValueDifference: {
            calories: number,
            proteines: number,
            fats: number,
            carbohydrates: number
        }
        meals: any[],
        price: number,
        weight: number
    }

    const getStatContent = () => {
        return <div className='d-flex flex-column w-100'>
            <div className="text-center fw-bold py-3">Daily statistic</div>
            <AmountInfo price={dailyStat.price}
                        calories={dailyStat.energyValue.calories}
                        weight={dailyStat.weight}
                        fats={dailyStat.energyValue.fats}
                        carbohydrates={dailyStat.energyValue.carbohydrates}
                        proteines={dailyStat.energyValue.proteines}/>
        </div>
    };

    return <div className='stat'>
        {isUserStatLoading && <Loader/>}
        {!isUserStatLoading && dailyStat && getStatContent()}
        {!isUserStatLoading && (!dailyStat || Object.keys(dailyStat).length === 0)
            && <div className="text-center fw-bold py-3 m-auto">No stat yet</div>}
    </div>;


};