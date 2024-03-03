import React from 'react'
import './addDishOrMealCard.scss'
import {Types} from '../../utils/types'
import {Form} from "react-bootstrap";
import NewIngridient from "../NewIngridient/NewIngridient";
import ActionButton from "../actionButton/actionButton";
import {useSelector} from "react-redux";
import {itemTypes} from "../../utils/itemTypes";

const AddDishOrMealCard: React.FC<Types.AddDishOrMealCardProps> = ({editedItem, setEditedItem, getIngridientWithValues, getEditedItemWithValues}: any) => {

    const items = useSelector((state: Types.MainState) => {
        return {
            dishes: state.items.dishes,
            products: state.items.products
        };
    });

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
                items={items}
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