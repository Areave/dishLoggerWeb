import React from 'react'
import './addDishOrMealCard.scss'
import {Types} from '../../utils/types'
import {Form} from "react-bootstrap";
import NewIngridient from "../NewIngridient/NewIngridient";
import ActionButton from "../actionButton/actionButton";

const AddDishOrMealCard: React.FC<Types.AddDishOrMealCardProps> = ({editedItem, setEditedItem}: any) => {

    const getIngridientWithValues = (ingridient: any) => {
        const ingridientForSave: any = JSON.parse(JSON.stringify(ingridient));
        if (ingridient.amount === 0 || ingridient.weight === 0) {
            ingridientForSave.price = 0;
            ingridientForSave.energyValue = {
                calories: 0,
                proteines: 0,
                fats: 0,
                carbohydrates: 0
            };
            if (ingridient.ingridient.isThatPieceItem) {
                ingridientForSave.weightForTakenAmount = 0;
            }
        } else {
            if (ingridient.ingridient.isThatPieceItem) {
                ingridientForSave.price = +((ingridient.ingridient.priceForAllItems / ingridient.ingridient.amount)
                    * ingridient.amount).toFixed(2);
                ingridientForSave.weightForTakenAmount = +((ingridient.ingridient.weightForAllItems / ingridient.ingridient.amount)
                    * ingridient.amount).toFixed(2);
                ingridientForSave.energyValue = {
                    calories: +(ingridient.ingridient.energyValueForOneItem.calories * ingridient.amount).toFixed(2),
                    proteines: +(ingridient.ingridient.energyValueForOneItem.proteines * ingridient.amount).toFixed(2),
                    fats: +(ingridient.ingridient.energyValueForOneItem.fats * ingridient.amount).toFixed(2),
                    carbohydrates: +(ingridient.ingridient.energyValueForOneItem.carbohydrates * ingridient.amount).toFixed(2),
                };
            } else {
                const coeff = +ingridient.weight / 100;
                ingridientForSave.price = +((ingridient.ingridient.price / ingridient.ingridient.weight)
                    * ingridient.weight).toFixed(2);
                ingridientForSave.energyValue = {
                    calories: +(ingridient.ingridient.energyValue.calories * coeff).toFixed(2),
                    proteines: +(ingridient.ingridient.energyValue.proteines * coeff).toFixed(2),
                    fats: +(ingridient.ingridient.energyValue.fats * coeff).toFixed(2),
                    carbohydrates: +(ingridient.ingridient.energyValue.carbohydrates * coeff).toFixed(2)
                };
            }
        }
        return ingridientForSave;
    };

    const getEditedItemWithValues = (editedItem: any, newIngridientsArray: any[]) => {
        const itemData: any = {};

        itemData.price = 0;
        itemData.weight = 0;
        itemData.energyValue = {
            calories: 0,
            proteines: 0,
            fats: 0,
            carbohydrates: 0
        };

        newIngridientsArray.forEach((ingridient: Types.Ingridient) => {
            itemData.price += ingridient.price;
            if (ingridient.weight) {
                const ingridientWeight = ingridient.weight;
                // @ts-ignore
                if (ingridient.ingridient.cookingCoefficient) {
                    // @ts-ignore
                    ingridientWeight = ingridientWeight * ingridient.ingridient.cookingCoefficient
                }
                itemData.weight += ingridientWeight;
            } else if (ingridient.amount) {
                itemData.weight += ingridient.weightForTakenAmount;
            }

            const {calories, proteines, fats, carbohydrates} = ingridient.energyValue;
            itemData.energyValue.calories += calories;
            itemData.energyValue.proteines += proteines;
            itemData.energyValue.fats += fats;
            itemData.energyValue.carbohydrates += carbohydrates;
        });
        return {...editedItem, ...itemData};
    };

    const setNewIngridient = (ingridient: any, index: number) => {
        const ingridientWithValues = getIngridientWithValues(ingridient);
        const newIngridientsArray = [
            ...editedItem.ingridients.slice(0, index),
            ingridientWithValues,
            ...editedItem.ingridients.slice(index + 1)
        ];
        const editedItemWithValues = getEditedItemWithValues(editedItem, newIngridientsArray);
        setEditedItem({...editedItemWithValues, ingridients: newIngridientsArray})
    };

    const removeIngridientField = (index: number) => {
        const newIngridientsArray = [...editedItem.ingridients?.slice(0, index),
            ...editedItem.ingridients.slice(index + 1)];
        const editedItemWithValues = getEditedItemWithValues(editedItem, newIngridientsArray);
        setEditedItem({...editedItemWithValues, ingridients: newIngridientsArray})
    };

    return <div className='product'>
        <div className="d-flex">
            <div className="">
                <Form.Label>weight</Form.Label>
                <Form.Control value={editedItem.weight} type="text" placeholder="weight" onChange={(e: any) => {
                    setEditedItem({...editedItem, weight: +e.target.value})
                }}/>
            </div>
        </div>
        <div className='commonData d-flex justify-content-between'>
            <div className="common_data">
                <Form.Label>price</Form.Label>
                <Form.Control value={editedItem.price || '-'} type="text" readOnly disabled/>
            </div>
            <div className="common_data">
                <Form.Label>calories</Form.Label>
                <Form.Control value={editedItem.energyValue?.calories || '-'} type="text" readOnly disabled/>
            </div>
            <div className="common_data">
                <Form.Label>fats</Form.Label>
                <Form.Control value={editedItem.energyValue?.fats || '-'} type="text" readOnly disabled/>
            </div>
            <div className="common_data">
                <Form.Label>carbs</Form.Label>
                <Form.Control value={editedItem.energyValue?.carbohydrates || '-'} type="text" readOnly disabled/>
            </div>
            <div className="common_data">
                <Form.Label>prots</Form.Label>
                <Form.Control value={editedItem.energyValue?.proteines || '-'} type="text" readOnly disabled/>
            </div>
        </div>
        {editedItem.ingridients.map((ingridientObject: any, index: number) => {
            return <NewIngridient
                key={index + '_' + ingridientObject.name || ingridientObject.type}
                index={index}
                ingridientObject={ingridientObject}
                removeIngridientField={removeIngridientField}
                setNewIngridient={setNewIngridient}/>
        })}
        <div>
            <ActionButton onClick={() => setEditedItem({...editedItem, ingridients: [...editedItem.ingridients, {}]})} label={'add ingridient'}/>
        </div>
    </div>
};

export default AddDishOrMealCard;