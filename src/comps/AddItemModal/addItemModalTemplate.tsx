import React, {useEffect, useState} from 'react'
import {Form, Modal} from 'react-bootstrap';
import './addItemModal.scss'
import ActionButton from "../actionButton/actionButton";
import {useSelector} from "react-redux";
import {Types} from "../../utils/types";
import {itemTypes} from "../../utils/itemTypes";
import AddProductCard from "../AddProductCard/AddProductCard";
import AddDishOrMealCard from "../AddDishOrMealCard/AddDishOrMealCard";

export const ItemModalTemplate: React.FC<Types.AddItemModalProps> = ({showModal, closeModal, setEditedItem, editedItem, itemType, addItem, updateExistingItem}) => {

    const [isExistingItem, setIsExistingItem] = useState(false);
    const [inValidError, setInValidError] = useState(false);

    console.log('editedItem', editedItem);

    const isProduct = itemType === itemTypes.PRODUCT;
    const isDish = itemType === itemTypes.DISH;
    const isMeal = itemType === itemTypes.MEAL;

    const items = useSelector((state: Types.MainState) => {
        return {
            dishes: state.items.dishes,
            products: state.items.products
        };
    });

    useEffect(() => {
        setIsExistingItem(!editedItem?.isThisInitItem)
    }, [editedItem]);

    const setValuesToSelectedIngridient = (ingridient: any) => {
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

    const setNewIngridient = (ingridient: any, index: number) => {
        const ingridientWithValues = setValuesToSelectedIngridient(ingridient);
        const newIngridientsArray = [
            ...editedItem.ingridients.slice(0, index),
            ingridientWithValues,
            ...editedItem.ingridients.slice(index + 1)
        ];
        const itemData = createEnergyValueFromIngridientsArray(newIngridientsArray);
        setEditedItem({
            ...editedItem,
            price: itemData.price,
            weight: itemData.weight,
            energyValue: itemData.energyValue,
            ingridients: newIngridientsArray
        });
    };

    const createEnergyValueFromIngridientsArray = (ingridientsArray: Types.Ingridient[]): any => {
        const itemData: any = {};

        itemData.price = 0;
        itemData.weight = 0;
        itemData.energyValue = {
            calories: 0,
            proteines: 0,
            fats: 0,
            carbohydrates: 0
        };

        ingridientsArray.forEach((ingridient: Types.Ingridient) => {
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
        return itemData;
    };

    const checkIsItemValid = (item: any): boolean => {

        let isItemValid = true;

        if (!item) {
            isItemValid = false;
            return;
        }

        const keys = Object.keys(item);

        if (!keys.length) {
            isItemValid = false;
            return;
        }
        for (let key in item) {
            const value = item[key];

            if ((!value && value !== 0 && typeof value !== 'boolean') || value === '') {
                isItemValid = false;
                return;
            }
            if (typeof value === 'function' || Array.isArray(value)) {
                continue;
            }
            if (isProduct || isDish) {
                if ((item.isThatPieceItem && (key === 'price' || key === 'weight' || key === 'energyValue'))
                    || (!item.isThatPieceItem && (key === 'priceForOneItem' || key === 'amount' || key === 'energyValueForOneItem'))) {
                    continue;
                }
            }
            if (typeof value === "object") {
                isItemValid = checkIsItemValid(value);
            }
        }
        return isItemValid;
    };

    const AddOrUpdateItem = (e: any, item: any) => {
        const isItemValid = checkIsItemValid(item);
        if (!isItemValid) {
            setInValidError(true)
        } else {
            setInValidError(false);
            if (isExistingItem) {
                updateExistingItem(item)
            } else {
                addItem(item);
            }
        }
    };


    return <div style={{display: 'block', position: 'initial'}}>
        <Modal show={showModal} onHide={() => {
            closeModal();
            setEditedItem(null);
        }} className='modal'>
            <Modal.Body>
                {!editedItem && <div>no item</div>}
                {!editedItem && !isProduct && !items.products.length && <div>no products</div>}
                {editedItem && <div>
                    <Form.Control isInvalid={!editedItem.name} value={editedItem.name} type="text" placeholder="name" onChange={(e: any) => {
                        setEditedItem({...editedItem, name: e.target.value})
                    }}/>
                    <Form.Control isInvalid={!editedItem.description} value={editedItem.description} type="text" placeholder="description"
                                  onChange={(e: any) => {
                                      setEditedItem({...editedItem, description: e.target.value})
                                  }}/>
                    <Form.Group>
                        {(isDish || isMeal) && <AddDishOrMealCard setNewIngridient={setNewIngridient}
                                                                  setEditedItem={setEditedItem}
                                                                  editedItem={editedItem}/>}
                        {isProduct && <AddProductCard setEditedItem={setEditedItem}
                                                      editedItem={editedItem}/>}

                        <ActionButton onClick={(e) => {
                            AddOrUpdateItem(e, editedItem)
                        }} label={isExistingItem ? 'update' : 'add'}/>
                        {inValidError && <div>fill all fields</div>}
                    </Form.Group>
                </div>}
            </Modal.Body>
        </Modal>
    </div>
};