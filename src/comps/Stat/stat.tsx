import React from 'react'
import './stat.scss'
import {useSelector} from "react-redux";
import {Types} from "../../utils/types";
import Loader from "../loader/loader";
import {AmountInfo} from "../AmountInfo/amountInfo";
import {StatSlider} from "../StatSlider/statSlider";
import {DailyStat} from "../DailyStat/dailyStat";

export const Stat: React.FC<any> = ({mainStat, statArray}) => {

    // console.log(mainStat, statArray);



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

    const dailyStat = statArray;

    const getStatContent = () => {
        return <div className='d-flex flex-column w-100'>
            <DailyStat dailyStat={dailyStat}/>
            <div className="text-center fw-bold py-3">Daily statistic</div>
            <AmountInfo price={mainStat.price}
                        calories={mainStat.energyValue.calories}
                        weight={mainStat.weight}
                        fats={mainStat.energyValue.fats}
                        carbohydrates={mainStat.energyValue.carbohydrates}
                        proteines={mainStat.energyValue.proteines}/>
        </div>
    };

    const getStatInterval = (statArray: any[]): string => {
        if (!statArray || statArray.length === 0) {
            return '...'
        }
        if (statArray.length === 1) {
            return ' ' + statArray[0].dateString;
        }
        if (statArray.length > 1) {
            return ' ' + statArray[0].dateString + ' - ' + statArray.slice(-1)[0].dateString;
        }

    };

    return <div className='stat d-flex flex-column w-100'>
        <DailyStat dailyStat={dailyStat}/>
        <div className="text-center fw-bold py-3 mt-3">{'Common stat for period' + getStatInterval(statArray)}</div>
        <AmountInfo price={mainStat.price}
                    calories={mainStat.energyValue.calories}
                    weight={mainStat.weight}
                    fats={mainStat.energyValue.fats}
                    carbohydrates={mainStat.energyValue.carbohydrates}
                    proteines={mainStat.energyValue.proteines}/>
        {/*{isUserStatLoading && <Loader/>}*/}
        {/*{!isUserStatLoading && dailyStat && getStatContent()}*/}
        {/*{!isUserStatLoading && (!dailyStat || Object.keys(dailyStat).length === 0)*/}
        {/*    && <div className="text-center fw-bold py-3 m-auto">No stat yet</div>}*/}
    </div>;


};