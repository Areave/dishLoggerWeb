import React, {useEffect, useState} from 'react'
import {Form, Modal} from 'react-bootstrap';
import './addItemModal.scss'
import ActionButton from "../actionButton/actionButton";
import {useSelector} from "react-redux";
import {Types} from "../../utils/types";
import {getPluralItemType, itemTypes} from "../../utils/itemTypes";
import Dish = Types.Dish;
import Product = Types.Product;
import RemoveItem from '../../assets/images/remove_item.png';
import {initDishItem, initProductItem} from "../../utils/initItems";
import {ItemType} from "../ItemType/itemType";
import {Ingridient} from "../Ingridient/ingridient";

export const ItemModalTemplate: React.FC<Types.AddItemModalProps> = ({showModal, closeModal, setEditedItem, editedItem, itemType, addItem, updateExistingItem}) => {

    // @ts-ignore
    // const initLocalEditedItem = {_id: '', name: '', description: '', ingridients: [{}]};
    const initLocalEditedItem: any = {};
    // const [itemToSave, setItemToSave] = useState(initItemToSave);
    // const [editedItem, setEditedItem] = useState(initLocalEditedItem);
    const [isExistingItem, setIsExistingItem] = useState(false);
    const [inValidError, setInValidError] = useState(false);

    console.log('editedItem', editedItem);
    // console.log('editedItem', editedItem);

    const items = useSelector((state: Types.MainState) => {
        return {
            dishes: state.items.dishes,
            products: state.items.products
        };
    });


    useEffect(() => {
        console.log('editedItem?.isThisInitItem', editedItem?.isThisInitItem);
        setIsExistingItem(!editedItem?.isThisInitItem)
    }, [editedItem]);

    const addIngridientField = () => {
        // @ts-ignore
        setEditedItem({...editedItem, ingridients: [...editedItem.ingridients, {}]})
    };

    const removeIngridientField = (index: number) => {
        // @ts-ignore
        const newIngridientsArray = [...editedItem.ingridients?.slice(0, index),
            // @ts-ignore
            ...editedItem.ingridients.slice(index + 1)];
        setEditedItem({...editedItem, ingridients: newIngridientsArray})
    };

    const setNewIngridient = (ingridient: any, index: number) => {
        const newIngridientsArray = [
            // @ts-ignore
            ...editedItem.ingridients.slice(0, index),
            ingridient,
            // @ts-ignore
            ...editedItem.ingridients.slice(index + 1)
        ];
        // @ts-ignore
        const itemData = createEnergyValueFromIngridientsArray(newIngridientsArray);
        console.log('itemData', itemData);
        editedItem.price = itemData.price;
        editedItem.weight = itemData.weight;
        editedItem.weight = itemData.weight;
        editedItem.energyValue = itemData.energyValue;
        setEditedItem({...editedItem, ingridients: newIngridientsArray});

    };

    const createEnergyValueFromIngridientsArray = (ingridientsArray: Types.Ingridient[]): any => {
        console.log('count itemData');
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
    // @ts-ignore
    // if (editedItem && editedItem.ingridients) {
    //     // @ts-ignore
    //     const namesAr = editedItem.ingridients.map((ingridient: any) => {
    //         if (ingridient.ingridient) {
    //             return ingridient.ingridient?.name} });
    //     console.log(namesAr);
    // }

    const isProduct = itemType === itemTypes.PRODUCT;
    const isDish = itemType === itemTypes.DISH;
    const isMeal = itemType === itemTypes.MEAL;

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
                        <div className="d-flex">
                            {isProduct && <Form.Check type="switch"
                                                                  id="custom-switch"
                                                                  label={editedItem.isThatPieceItem ? ('Piece ' + itemType.toLowerCase()) : ('Weight ' + itemType.toLowerCase())}
                                                                  checked={editedItem.isThatPieceItem}
                                                                  onChange={(e) => {
                                                                      setEditedItem({
                                                                          ...editedItem,
                                                                          isThatPieceItem: e.target.checked
                                                                      })
                                                                  }}/>}
                            {isDish && <div className="">
                                <Form.Label>weight</Form.Label>
                                <Form.Control value={editedItem.weight} type="text" placeholder="weight" onChange={(e: any) => {
                                    setEditedItem({...editedItem, weight: +e.target.value})
                                }}/>
                            </div>}
                            {/*{isDish && editedItem.isThatPieceItem && <div>*/}
                            {/*    <Form.Label>amount</Form.Label>*/}
                            {/*    <Form.Control value={editedItem.amount} type="text" placeholder="amount" onChange={(e: any) => {*/}
                            {/*        setEditedItem({...editedItem, amount: +e.target.value})*/}
                            {/*    }}/>*/}
                            {/*</div>}*/}
                        </div>

                        {isDish && <div className='commonData d-flex justify-content-between'>

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

                        </div>}
                        {isProduct &&
                        <AddProductCard setEditedItem={setEditedItem} setIsExistingItem={setIsExistingItem} editedItem={editedItem}
                                        isExistingItem={isExistingItem}/>}
                        {!isProduct &&
                        // @ts-ignore
                        editedItem.ingridients.map((ingridientObject: any, index: number) => {
                            return <NewIngridientSelect
                                key={index + '_' + ingridientObject.name || ingridientObject.type}
                                index={index}
                                ingridientObject={ingridientObject}
                                removeIngridientField={removeIngridientField}
                                setNewIngridient={setNewIngridient}/>
                        })}
                        {!isProduct && <div>
                            <ActionButton onClick={addIngridientField} label={'add ingridient'}/>
                            {/*<ActionButton onClick={() => {*/}
                            {/*    // console.log(newItemIngridients)*/}
                            {/*}} label={'print newItemIngridients'}/>*/}
                        </div>}
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

const AddProductCard = ({editedItem, setEditedItem, setIsExistingItem, isExistingItem}: any) => {

    const [isThatPieceItem, setIsThatPieceItem] = useState(editedItem?.isThatPieceItem || false);
    const [energyValueFieldName, setEnergyValueFieldName] = useState('energyValue');

    // const handleToggle = (e: any) => {
    //     setIsThatPieceItem(!isThatPieceItem);
    //     setEditedItem({...editedItem, isThatPieceItem: e.target.checked})
    // };

    // useEffect(() => {
    //     setIsThatPieceItem(editedItem.isThatPieceItem);
    //     setIsExistingItem(!editedItem.isThisInitItem)
    // }, [editedItem]);

    useEffect(() => {
        setEnergyValueFieldName(editedItem.isThatPieceItem ? 'energyValueForOneItem' : 'energyValue');
    }, [isThatPieceItem]);

    return <div className='product'>
        {!editedItem.isThisInitItem && (editedItem.isThatPieceItem ? <div>PieceProduct</div> : <div>WeightProduct</div>)}
        {/*{!editedItem.isThisInitItem && <Form.Check type="switch"*/}
        {/*                                id="custom-switch"*/}
        {/*                                label={editedItem.isThatPieceItem ? 'Piece Product' : 'Weight Product'}*/}
        {/*                                checked={editedItem.isThatPieceItem}*/}
        {/*                                onChange={handleToggle}/>}*/}
        <div className="cookingCoefficient">
            <DigitalValueItem editedItem={editedItem}
                              setEditedItem={setEditedItem}
                              fieldName='cookingCoefficient'/>
        </div>

        {editedItem.isThatPieceItem && <div>
            {['amount', 'priceForAllItems', 'weightForAllItems'].map((field: string) =>
                <DigitalValueItem editedItem={editedItem}
                                  setEditedItem={setEditedItem}
                                  fieldName={field}/>
            )}
        </div>}
        {!editedItem.isThatPieceItem && <div>
            {['weight', 'price'].map((field: string) =>
                <DigitalValueItem editedItem={editedItem}
                                  setEditedItem={setEditedItem}
                                  fieldName={field}/>
            )}
        </div>}
        <div className="energyValue">
            <div className="energyValue_label">{editedItem.isThatPieceItem ? 'energyValue for one piece' : 'energyValue for 100gr'}</div>
            <div className="energyValue_data">
                {['calories', 'proteines', 'fats', 'carbohydrates'].map((field: string) =>
                    <DigitalValueItem editedItem={editedItem}
                                      setEditedItem={setEditedItem}
                                      energyValueFieldName={energyValueFieldName}
                                      fieldName={field}/>
                )}
            </div>
        </div>
    </div>

};

const DigitalValueItem = ({editedItem, setEditedItem, energyValueFieldName, fieldName}: any) => {

    let value;
    if (energyValueFieldName && editedItem[energyValueFieldName]) {
        value = editedItem[energyValueFieldName][fieldName]
    } else if (editedItem[fieldName]) {
        value = editedItem[fieldName];
    } else {
        value = '';
    }

    const onControlChange = (e: any) => {
        let value = e.target.value;
        if (isNaN(+value) && value.slice(-1) !== '.' && value.slice(-1) !== ',') {
            return;
        } else {
            if (value.slice(-1) === ',') {
                value = value.slice(0, value.length - 1) + '.';
            }
            if (value.length === 2 && value[0] === '0' && !isNaN(+value[1])) {
                value = value[1];
            }
            if (energyValueFieldName) {
                let energyValue = editedItem[energyValueFieldName] ?
                    editedItem[energyValueFieldName] : {};
                setEditedItem({
                    ...editedItem, [energyValueFieldName]: {
                        ...energyValue,
                        [fieldName]: value
                    }
                })
            } else {
                setEditedItem({...editedItem, [fieldName]: value})
            }
        }
    };
    return <div className={fieldName}>
        <Form.Label>{fieldName}</Form.Label>
        <Form.Control isInvalid={!value && value !== 0} value={value} type="text" placeholder={fieldName}
                      onChange={onControlChange}/></div>
};

const NewIngridientSelect = ({index, ingridientObject, setNewIngridient, removeIngridientField}: Types.NewIngridientProps) => {

    const items = useSelector((state: Types.MainState) => {
        return {
            dishes: state.items.dishes,
            products: state.items.products
        };
    });
    const getInitIngridientType = (): string => {
        if (ingridientObject?.type) {
            return ingridientObject.type;
        } else if (items.products.length) {
            return itemTypes.PRODUCT;
        } else {
            return Object.keys(items)[0];
        }
    };
    // const [ingridientType, setIngridientType] = useState(getInitIngridientType());
    const [ingridientType, setIngridientType] = useState(getInitIngridientType());
    const [localItemsObject, setLocalItemsObject] = useState(null);
    const [currentItemsArray, setCurrentItemsArray] = useState([]);
    const [selectedIngridient, setSelectedIngridient] = useState(null);


    // const [ingridientInfo, setIngridientInfo] = useState({
    //     price: 0,
    //     energyValue: {
    //         calories: 0,
    //         proteines: 0,
    //         fats: 0,
    //         carbohydrates: 0
    //     }
    // });


    const putIngridientObjectToStartOfLocalItemsObject = (ingridientObject: any, items: any) => {

        // устанавливаем переданный ингридиент на первое место
        if (!ingridientObject.type) {
            return items;
        }
        const fieldName = getPluralItemType(ingridientType);

        let arrayForAdding = items[fieldName] || [];
        if (!ingridientObject.ingridient) {
            arrayForAdding = [null, ...arrayForAdding]
        } else {
            const index = arrayForAdding.findIndex((item: any) => {
                return ingridientObject && (item._id === ingridientObject.ingridient?._id)
            });
            if (index !== 0) {
                arrayForAdding = [ingridientObject.ingridient, ...arrayForAdding.slice(0, index), ...arrayForAdding.slice(index + 1)];
            }
        }
        return {...items, [fieldName]: arrayForAdding};
    };

    // useEffect(() => {
    //     const newLocalItemsObject = putIngridientObjectToStartOfLocalItemsObject(ingridientObject, items);
    //     setLocalItemsObject(newLocalItemsObject);
    // }, [ingridientObject]);

    useEffect(() => {
        const newLocalItemsObject = putIngridientObjectToStartOfLocalItemsObject(ingridientObject, items);
        setLocalItemsObject(newLocalItemsObject);
    }, [ingridientObject]);

    useEffect(() => {
        // @ts-ignore
        let currentItemsArray = localItemsObject && localItemsObject[getPluralItemType(ingridientType)];

        if (currentItemsArray) {
            setCurrentItemsArray(currentItemsArray);
        } else {
            setCurrentItemsArray([]);
        }

    }, [ingridientType, localItemsObject]);

    const createIngridientForSaveFromSelected = (givenIngridientObject: any) => {
        let ingridientForSave;
        if (givenIngridientObject?._id === ingridientObject?.ingridient?._id
            || !givenIngridientObject && !ingridientObject.ingridient) {
            ingridientForSave = ingridientObject;
        } else {
            ingridientForSave = {
                ...selectedIngridient,
                ingridient: givenIngridientObject
            };
            if (!ingridientForSave.type) {
                ingridientForSave.type = givenIngridientObject.type;
            }
            if (givenIngridientObject.isThatPieceItem) {
                ingridientForSave.amount = 0;
                delete ingridientForSave.weight;
            } else {
                ingridientForSave.weight = 0;
                delete ingridientForSave.amount;
            }
        }
        return ingridientForSave;
    };

    useEffect(() => {
        if (currentItemsArray.length) {
            setSelectedIngridient(createIngridientForSaveFromSelected(currentItemsArray[0]))
        }
    }, [currentItemsArray]);

    useEffect(() => {
        console.log('selectedIngridient', selectedIngridient);
        if (selectedIngridient && selectedIngridient.ingridient) {
            if (selectedIngridient.amount === 0 || selectedIngridient.weight === 0) {
                selectedIngridient.price = 0;
                selectedIngridient.energyValue = {
                    calories: 0,
                    proteines: 0,
                    fats: 0,
                    carbohydrates: 0
                };
            } else {
                if (selectedIngridient.ingridient.isThatPieceItem) {
                    selectedIngridient.price = +((selectedIngridient.ingridient.priceForAllItems / selectedIngridient.ingridient.amount)
                        * selectedIngridient.amount).toFixed(2);
                    selectedIngridient.weightForTakenAmount = +((selectedIngridient.ingridient.weightForAllItems / selectedIngridient.ingridient.amount)
                        * selectedIngridient.amount).toFixed(2);
                    selectedIngridient.energyValue = {
                        calories: +(selectedIngridient.ingridient.energyValueForOneItem.calories * selectedIngridient.amount).toFixed(2),
                        proteines: +(selectedIngridient.ingridient.energyValueForOneItem.proteines * selectedIngridient.amount).toFixed(2),
                        fats: +(selectedIngridient.ingridient.energyValueForOneItem.fats * selectedIngridient.amount).toFixed(2),
                        carbohydrates: +(selectedIngridient.ingridient.energyValueForOneItem.carbohydrates * selectedIngridient.amount).toFixed(2),
                    };
                } else {
                    const coeff = +selectedIngridient.weight / 100;
                    selectedIngridient.price = +((selectedIngridient.ingridient.price / selectedIngridient.ingridient.weight)
                        * selectedIngridient.weight).toFixed(2);
                    selectedIngridient.energyValue = {
                        calories: +(selectedIngridient.ingridient.energyValue.calories * coeff).toFixed(2),
                        proteines: +(selectedIngridient.ingridient.energyValue.proteines * coeff).toFixed(2),
                        fats: +(selectedIngridient.ingridient.energyValue.fats * coeff).toFixed(2),
                        carbohydrates: +(selectedIngridient.ingridient.energyValue.carbohydrates * coeff).toFixed(2)
                    };
                }
            }

            setNewIngridient(selectedIngridient, index)
        }
    }, [selectedIngridient]);


    if (!selectedIngridient) {
        return <div>no ingridient</div>
    }

    return <div className='ingridient_container'>
        <div className="">
            <div className='d-flex justify-content-between mb-3'>
                <div className="">
                    {/*<div className="">{ingridientObject.ingridient?.name}</div>*/}
                    <Form.Label>type</Form.Label>
                    <Form.Select defaultValue={ingridientType} onChange={(event) => {
                        // console.log('name', event.target.value)
                        setIngridientType(event.target.value)
                    }}>
                        <option value={itemTypes.PRODUCT}>{itemTypes.PRODUCT.slice(0, 1)}</option>
                        {items.dishes && <option value={itemTypes.DISH}>{itemTypes.DISH.slice(0, 1)}</option>}
                    </Form.Select>
                </div>
                <div className="">
                    <Form.Label>ingridient</Form.Label>
                    <Form.Select value={'0'}
                                 onChange={(e) => {
                                     const ingridient = createIngridientForSaveFromSelected(currentItemsArray[+e.target.value]);
                                     setSelectedIngridient(ingridient)
                                 }}>

                        {currentItemsArray.map((item: any, index: number) => {
                            return <option key={index}
                                           value={index}>{item?.name || 'Deleted'}</option>
                        })}
                    </Form.Select>
                </div>

                {selectedIngridient.hasOwnProperty('weight') && <div className="ingridient-amount-data weight">
                    <Form.Label>weight</Form.Label>
                    <div className="">
                        <Form.Control value={selectedIngridient.weight} type="text" placeholder="weight"
                                      disabled={!ingridientObject.ingridient}
                                      onChange={(e: any) => {
                                          setSelectedIngridient({...selectedIngridient, weight: +e.target.value})
                                      }}/>
                        {ingridientObject.ingridient.cookingCoefficient && ingridientObject.ingridient.cookingCoefficient !== 1 &&
                        <div>{'* ' + ingridientObject.ingridient.cookingCoefficient + ' = ' + +(ingridientObject.ingridient.cookingCoefficient * selectedIngridient.weight).toFixed(2)}</div>}
                    </div>


                </div>}
                {selectedIngridient.hasOwnProperty('amount') && <div className="ingridient-amount-data amount">
                    <Form.Label>amount</Form.Label>
                    <Form.Control value={selectedIngridient.amount} type="text" placeholder="amount"
                                  disabled={!ingridientObject.ingridient}
                                  onChange={(e: any) => {
                                      setSelectedIngridient({...selectedIngridient, amount: +e.target.value})
                                  }}/>
                </div>}
                <div className="d-flex justify-content-center align-items-center">
                    <div className="remove_item_icon_container" onClick={() => removeIngridientField(index)}><img
                        src={RemoveItem} alt=""/></div>
                </div>
            </div>
            <div className="d-flex justify-content-between">
                <div className="ingridient_data price">
                    <Form.Label>price</Form.Label>
                    <Form.Control value={selectedIngridient.price} type="text" readOnly disabled/>
                </div>
                <div className="ingridient_data calories">
                    <Form.Label>calories</Form.Label>
                    <Form.Control value={selectedIngridient.energyValue?.calories} type="text" readOnly disabled/>
                </div>
                <div className="ingridient_data fats">
                    <Form.Label>fats</Form.Label>
                    <Form.Control value={selectedIngridient.energyValue?.fats} type="text" readOnly disabled/>
                </div>
                <div className="ingridient_data carbs">
                    <Form.Label>carbs</Form.Label>
                    <Form.Control value={selectedIngridient.energyValue?.carbohydrates} type="text" readOnly disabled/>
                </div>
                <div className="ingridient_data prots">
                    <Form.Label>prots</Form.Label>
                    <Form.Control value={selectedIngridient.energyValue?.proteines} type="text" readOnly disabled/>
                </div>
                {selectedIngridient.hasOwnProperty('weightForTakenAmount') && <div className="ingridient_data weightForTakenAmount">
                    <Form.Label>weight</Form.Label>
                    <Form.Control value={selectedIngridient.weightForTakenAmount} type="text" readOnly disabled/>
                </div>}
            </div>
        </div>
    </div>
};