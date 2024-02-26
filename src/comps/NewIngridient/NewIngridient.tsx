import React, {useEffect, useState} from 'react'
import './newIngridient.scss'
import {Types} from '../../utils/types'
import {Form} from "react-bootstrap";
import {useSelector} from "react-redux";
import {getPluralItemType, itemTypes} from "../../utils/itemTypes";
import RemoveItem from "../../assets/images/remove_item.png";

const NewIngridient: React.FC<Types.NewIngridientProps> = ({
                                                               index,
                                                               items,
                                                               ingridientObject,
                                                               setNewIngridient,
                                                               removeIngridientField
                                                           }: Types.NewIngridientProps) => {

    // прилетает либо нормальный ingridientObject, либо ingridientObject с null в поле ingridient, либо {}

    const getInitIngridientType = (): string => {
        if (ingridientObject?.type) {
            return ingridientObject.type;
        } else if (items.products.length) {
            return itemTypes.PRODUCT;
        } else {
            return Object.keys(items)[0];
        }
    };
    const [ingridientType, setIngridientType] = useState(getInitIngridientType());
    const [localItemsObject, setLocalItemsObject] = useState(null);
    const [currentItemsArray, setCurrentItemsArray] = useState([]);

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
        // если ingridientObject.ingridient нет то пихаем на первое место null
        // если нет ingridientObject, то ниче не пихаем, возвращаем как есть
        return {...items, [fieldName]: arrayForAdding};
    };

    const createIngridientForSaveFromSelected = (givenIngridientObject: any) => {
        let ingridientForSave: any = {
            ingridient: givenIngridientObject,
            type: givenIngridientObject.type
        };
        if (givenIngridientObject.isThatPieceItem) {
            ingridientForSave.amount = 0;
        } else {
            ingridientForSave.weight = 0;
        }
        return ingridientForSave;
    };

    useEffect(() => {
        const newLocalItemsObject = putIngridientObjectToStartOfLocalItemsObject(ingridientObject, items);
        setLocalItemsObject(newLocalItemsObject);
    }, [ingridientObject]);

    useEffect(() => {
        let newCurrentItemsArray = localItemsObject && localItemsObject[getPluralItemType(ingridientType)];
        if (!newCurrentItemsArray) {
            newCurrentItemsArray = [];
        }
        setCurrentItemsArray(newCurrentItemsArray);
    }, [ingridientType, localItemsObject]);

    useEffect(() => {
        if (currentItemsArray
            && currentItemsArray.length
            && (!Object.keys(ingridientObject).length
                || ingridientObject.ingridient && (ingridientObject.ingridient._id !== currentItemsArray[0]._id))
        ) {
            setNewIngridient(createIngridientForSaveFromSelected(currentItemsArray[0]), index)
        }
    }, [currentItemsArray]);

    if (!ingridientObject) {
        return <div>no ingridient</div>
    }

    return <div className='ingridient_container'>
        <div className="">
            <div className='d-flex justify-content-between mb-3'>
                <div className="">
                    {/*<div className="">{ingridientObject.ingridient?.name}</div>*/}
                    <Form.Label>type</Form.Label>
                    <Form.Select defaultValue={ingridientType} onChange={(event) => {
                        setIngridientType(event.target.value)
                    }}>
                        {items.products.length && <option value={itemTypes.PRODUCT}>{itemTypes.PRODUCT.slice(0, 1)}</option>}
                        {items.dishes.length && <option value={itemTypes.DISH}>{itemTypes.DISH.slice(0, 1)}</option>}
                    </Form.Select>
                </div>
                <div className="">
                    <Form.Label>ingridient</Form.Label>
                    <Form.Select value={'0'}
                                 onChange={(e) => {
                                     setNewIngridient(createIngridientForSaveFromSelected(currentItemsArray[+e.target.value]), index)
                                 }}>

                        {currentItemsArray && currentItemsArray.map((item: any, index: number) => {
                            return <option key={index}
                                           value={index}>{item?.name || 'Deleted'}</option>
                        })}
                    </Form.Select>
                </div>

                {ingridientObject.hasOwnProperty('weight') && <div className="ingridient-amount-data weight">
                    <Form.Label>weight</Form.Label>
                    <div className="">
                        <Form.Control value={ingridientObject.weight || '0'} type="text" placeholder="weight"
                                      disabled={!ingridientObject.ingridient}
                                      onChange={(e: any) => {
                                          setNewIngridient({...ingridientObject, weight: +e.target.value}, index);
                                      }}/>
                        {ingridientObject.ingridient && ingridientObject.ingridient.cookingCoefficient && ingridientObject.ingridient.cookingCoefficient !== 1 &&
                        <div>{'* ' + ingridientObject.ingridient.cookingCoefficient + ' = ' + +(ingridientObject.ingridient.cookingCoefficient * ingridientObject.weight).toFixed(2)}</div>}
                    </div>
                </div>}
                {ingridientObject.hasOwnProperty('amount') && <div className="ingridient-amount-data amount">
                    <Form.Label>amount</Form.Label>
                    <Form.Control value={ingridientObject.amount} type="text" placeholder="amount"
                                  disabled={!ingridientObject.ingridient}
                                  onChange={(e: any) => {
                                      setNewIngridient({...ingridientObject, amount: +e.target.value}, index);
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
                    <Form.Control value={ingridientObject.price} type="text" readOnly disabled/>
                </div>
                <div className="ingridient_data calories">
                    <Form.Label>calories</Form.Label>
                    <Form.Control value={ingridientObject.energyValue?.calories} type="text" readOnly disabled/>
                </div>
                <div className="ingridient_data fats">
                    <Form.Label>fats</Form.Label>
                    <Form.Control value={ingridientObject.energyValue?.fats} type="text" readOnly disabled/>
                </div>
                <div className="ingridient_data carbs">
                    <Form.Label>carbs</Form.Label>
                    <Form.Control value={ingridientObject.energyValue?.carbohydrates} type="text" readOnly disabled/>
                </div>
                <div className="ingridient_data prots">
                    <Form.Label>prots</Form.Label>
                    <Form.Control value={ingridientObject.energyValue?.proteines} type="text" readOnly disabled/>
                </div>
                {ingridientObject.hasOwnProperty('weightForTakenAmount') && <div className="ingridient_data weightForTakenAmount">
                    <Form.Label>weight</Form.Label>
                    <Form.Control value={ingridientObject.weightForTakenAmount} type="text" readOnly disabled/>
                </div>}
            </div>
        </div>
    </div>
};

export default NewIngridient;