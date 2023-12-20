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
import {initProductItem} from "../../utils/initItems";

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
        // TODO: понять, зачем
        // @ts-ignore
        if (editedItem && Object.keys(editedItem).length && !editedItem.isThisInitItem) {
            const copyEditedItem = JSON.parse(JSON.stringify(editedItem));
            // setEditedItem({
            //     _id: copyEditedItem._id,
            //     name: copyEditedItem.name,
            //     description: copyEditedItem.description,
            //     ingridients: copyEditedItem.ingridients
            // });
            setIsExistingItem(true);
            // setEditedItem(editedItem);
            // setEditedItem(copyEditedItem);
        } else {
            // console.log('no editedItem', editedItem)
            setIsExistingItem(false);
        }
    }, [editedItem]);

    // useEffect(() => {
    //     // console.log('editedItem from useEffect', editedItem);
    // }, [editedItem]);

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
        setEditedItem({...editedItem, ingridients: newIngridientsArray});

    };


    const checkIsItemValid = (item: any) => {

        let isItemValid = true;

        for (let key in item) {
            const value = item[key];
            if (typeof value == "object" && typeof value.length !== 'number') {
                checkIsItemValid(value);
            }
            if ((value === '' || typeof value === 'undefined') && value !== 0 ) {
                isItemValid = false;
                return;
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
            // setItemToSave(initItemToSave);
            // @ts-ignore
            setEditedItem(null);
        }} className='modal'>
            <Modal.Body>
                <Form.Control isInvalid={!editedItem?.name} value={editedItem?.name || ''} type="text" placeholder="name" onChange={(e: any) => {
                    setEditedItem({...editedItem, name: e.target.value})
                }}/>
                <Form.Control isInvalid={!editedItem?.description} value={editedItem?.description || ''} type="text" placeholder="description" onChange={(e: any) => {
                    setEditedItem({...editedItem, description: e.target.value})
                }}/>
                <Form.Group>
                    {itemType === itemTypes.PRODUCT &&
                    <AddProductCard setEditedItem={setEditedItem} editedItem={editedItem} isExistingItem={isExistingItem}/>}
                    {itemType !== itemTypes.PRODUCT
                    // @ts-ignore
                    && editedItem.ingridients &&
                    // @ts-ignore
                    editedItem.ingridients.map((ingridientObject: any, index: number) => {
                        return <NewIngridientSelect
                            // key={index + '_' + ingridientObject?.ingridient?.name}
                            key={index}
                            index={index}
                            ingridientObject={ingridientObject}
                            items={items}
                            removeIngridientField={removeIngridientField}
                            setNewIngridient={setNewIngridient}/>
                    })}
                    {itemType !== itemTypes.PRODUCT && <div>
                        <ActionButton onClick={addIngridientField} label={'add ingridient'}/>
                        <ActionButton onClick={() => {
                            // console.log(newItemIngridients)
                        }} label={'print newItemIngridients'}/>
                    </div>}
                    {inValidError && <div>fill all fields</div>}
                    <ActionButton onClick={(e) => {
                        AddOrUpdateItem(e, editedItem)
                    }} label={isExistingItem ? 'update' : 'add'}/>
                </Form.Group>
            </Modal.Body>
        </Modal>
    </div>
};

const AddProductCard = ({editedItem, setEditedItem, isExistingItem}: any) => {

    console.log('editedItem from product', editedItem);

    const [isThatPieceProduct, setIsThatPieceProduct] = useState(editedItem?.isThatPieceProduct || false);
    const [energyValueFieldName, setEnergyValueFieldName] = useState('energyValue');

    const handleToggle = (e: any) => {
        setIsThatPieceProduct(!isThatPieceProduct);
        setEditedItem({...editedItem, isThatPieceProduct: e.target.checked})
    };

    // useEffect(() => {
    //     if (!isExistingItem) {
    //         setEditedItem(initProductItem)
    //     }
    // }, [isExistingItem]);
    useEffect(() => {
        if (editedItem) {
            setIsThatPieceProduct(editedItem.isThatPieceProduct);
        } else {
            setEditedItem(initProductItem)
        }

    }, [editedItem]);

    useEffect(() => {
        setEnergyValueFieldName(isThatPieceProduct ? 'energyValueForOnePiece' : 'energyValue');
    }, [isThatPieceProduct]);

    if (!editedItem) {
        return <div>no item</div>
    }
    return <div className='product'>
        {isExistingItem && (editedItem.isThatPieceProduct ? <div>PieceProduct</div> : <div>WeightProduct</div>)}
        {!isExistingItem && <Form.Check type="switch"
                    id="custom-switch"
                    label={isThatPieceProduct ? 'PieceProduct' : 'WeightProduct'}
                    checked={isThatPieceProduct}
                    onChange={handleToggle}/>}
        <div className="cookingCoefficient">
            <DigitalValueItem editedItem={editedItem}
                              setEditedItem={setEditedItem}
                              fieldName='cookingCoefficient'/>
        </div>

        {isThatPieceProduct && <div>
            {['amountOfPieces', 'priceForAllPieces'].map((field: string) =>
                <DigitalValueItem editedItem={editedItem}
                                 setEditedItem={setEditedItem}
                                 fieldName={field}/>
            )}
        </div>}
        {!isThatPieceProduct && <div>
            {['weight', 'price'].map((field: string) =>
                <DigitalValueItem editedItem={editedItem}
                                 setEditedItem={setEditedItem}
                                 fieldName={field}/>
            )}
        </div>}
        <div className="energyValue">
            <div className="energyValue_label">{isThatPieceProduct ? 'energyValue for one piece' : 'energyValue for 100gr'}</div>
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
        const value = e.target.value;
        let valueToSet = e.target.value;
        if (isNaN(+value) && value.slice(-1) !== '.' && value.slice(-1) !== ',') {
            return;
        } else {
            if (value.slice(-1) === ',') {
                valueToSet = value.slice(0, value.length - 1) + '.';
            }
            if (energyValueFieldName) {
                let energyValue = editedItem[energyValueFieldName] ?
                    editedItem[energyValueFieldName] : {};
                setEditedItem({
                    ...editedItem, [energyValueFieldName]: {
                        ...energyValue,
                        [fieldName]: valueToSet
                    }
                })
            } else {
                setEditedItem({...editedItem, [fieldName]: valueToSet})
            }
        }
    };
    return <div className={fieldName}>
        <Form.Label>{fieldName}</Form.Label>
        <Form.Control isInvalid={!value} value={value} type="text" placeholder={fieldName}
                      onChange={onControlChange}/></div>
};

const NewIngridientSelect = ({
                                 index,
                                 ingridientObject,
                                 items,
                                 setNewIngridient,
                                 removeIngridientField
                             }: Types.NewIngridientProps) => {

    // console.log('ingridientObject', ingridientObject)
    const [ingridientType, setIngridientType] = useState(ingridientObject?.type || itemTypes.PRODUCT as string);
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
            arrayForAdding = [ingridientObject.ingridient, ...arrayForAdding]
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

    const setIngridientAsCurrent = (givenIngridientObject: any) => {
        if ((givenIngridientObject === null && ingridientObject?.ingridient === null)
            || (givenIngridientObject?._id === ingridientObject?.ingridient?._id)) {
            setSelectedIngridient(ingridientObject);
        } else {
            setSelectedIngridient({
                ...givenIngridientObject,
                type: givenIngridientObject?.type,
                ingridient: givenIngridientObject
            });
        }
    };

    useEffect(() => {
        if (ingridientObject) {
            const newLocalItemsObject = putIngridientObjectToStartOfLocalItemsObject(ingridientObject, items);
            setLocalItemsObject(newLocalItemsObject);
        }
    }, []);

    useEffect(() => {
        // @ts-ignore
        let currentItemsArray = localItemsObject && localItemsObject[getPluralItemType(ingridientType)];

        if (currentItemsArray) {
            setCurrentItemsArray(currentItemsArray);
        } else {
            setCurrentItemsArray([]);
        }

    }, [ingridientType, localItemsObject]);

    useEffect(() => {
        if (currentItemsArray.length) {
            const firstIngridient = currentItemsArray[0];
            setIngridientAsCurrent(firstIngridient);

        }
    }, [currentItemsArray]);

    useEffect(() => {
        if (selectedIngridient) {
            setNewIngridient(selectedIngridient, index)
            // const ingridientInfo: Types.IngridientInfo = getIngridientInfo(selectedIngridient);
            // setIngridientInfo(ingridientInfo);
        }
    }, [selectedIngridient]);

    // useEffect(() => {
    //     setNewIngridient(selectedIngridient, index);
    // }, [ingridientInfo]);

    const createSelectOptionsArray = () => {
        // console.log('currentItemsArray', currentItemsArray)
        return currentItemsArray.map((item: any, index: number) => {
            // console.log('item', item)
            return <option key={index}
                           value={index}>{item ? item.name : 'Deleted'}</option>
        })
    };

    const getIngridientInfo = (ingridient: Types.Ingridient): Types.IngridientInfo => {
        let newIngridientInfo: Types.IngridientInfo;

        // @ts-ignore
        if (ingridient.ingridient.isThatPieceProduct) {
            newIngridientInfo = {
                // @ts-ignore
                price: +((ingridient.ingridient.priceForAllPieces / ingridient.ingridient.amountOfPieces) * ingridient.amount).toFixed(2),
                energyValue: {
                    // @ts-ignore
                    calories: +(ingridient.ingridient.energyValueForOnePiece.calories * ingridient.amount),
                    // @ts-ignore
                    proteines: +(ingridient.ingridient.energyValueForOnePiece.proteines * ingridient.amount),
                    // @ts-ignore
                    fats: +(ingridient.ingridient.energyValueForOnePiece.fats * ingridient.amount),
                    // @ts-ignore
                    carbohydrates: +(ingridient.ingridient.energyValueForOnePiece.carbohydrates * ingridient.amount),
                }
            };
        } else {
            newIngridientInfo = {
                price: +((ingridient.ingridient.price / ingridient.ingridient.weight) * ingridient.weight).toFixed(2),
                energyValue: {
                    calories: +((ingridient.ingridient.energyValue.calories / 100) * ingridient.weight).toFixed(2),
                    proteines: +((ingridient.ingridient.energyValue.proteines / 100) * ingridient.weight).toFixed(2),
                    fats: +((ingridient.ingridient.energyValue.fats / 100) * ingridient.weight).toFixed(2),
                    carbohydrates: +((ingridient.ingridient.energyValue.carbohydrates / 100) * ingridient.weight).toFixed(2)
                }
            };
        }
        return newIngridientInfo;
    };


    const onSelectIngridientChange = (event: any) => {
        const firstIngridient = currentItemsArray[+event.target.value]
        setIngridientAsCurrent(firstIngridient);
    };

    return <div className='ingridient_container'>
        {/*<div className="" onClick={(event) => removeIngridientField(index)}>remove</div>*/}
        <div className="">
            <div className='d-flex justify-content-between mb-3'>
                <div className="">
                    <Form.Label>type</Form.Label>
                    <Form.Select defaultValue={ingridientType} onChange={(event) => {
                        // console.log('name', event.target.value)
                        setIngridientType(event.target.value)
                    }}>
                        <option value={itemTypes.PRODUCT}>{itemTypes.PRODUCT.slice(0, 1)}</option>
                        <option value={itemTypes.DISH}>{itemTypes.DISH.slice(0, 1)}</option>
                    </Form.Select>
                </div>
                <div className="">
                    <Form.Label>ingridient</Form.Label>
                    <Form.Select onChange={onSelectIngridientChange}>
                        {createSelectOptionsArray()}
                    </Form.Select>
                </div>
                {selectedIngridient?.weight && <div className="weight">
                    <Form.Label>weight</Form.Label>
                    <Form.Control value={selectedIngridient?.weight || ''} type="text" placeholder="weight" onChange={(e: any) => {
                        setSelectedIngridient({...selectedIngridient, weight: e.target.value})
                    }}/>
                </div>}
                {selectedIngridient?.amount && <div className="amount">
                    <Form.Label>amount</Form.Label>
                    <Form.Control value={selectedIngridient?.amountOfItems || ''} type="text" placeholder="amount" onChange={(e: any) => {
                        setSelectedIngridient({...selectedIngridient, amountOfItems: e.target.value})
                    }}/>
                </div>}
                <div className="d-flex justify-content-center align-items-center">
                    <div className="remove_item_icon_container" onClick={() => removeIngridientField(index)}><img
                        src={RemoveItem} alt=""/></div>
                </div>
            </div>
            <div className="d-flex justify-content-between">
                {/*<div className="ingridient_data price">*/}
                {/*    <Form.Label>price</Form.Label>*/}
                {/*    <Form.Control value={ingridientInfo.price || ''} type="text" readOnly/>*/}
                {/*</div>*/}
                {/*<div className="ingridient_data calories">*/}
                {/*    <Form.Label>calories</Form.Label>*/}
                {/*    <Form.Control value={ingridientInfo.energyValue.calories || ''} type="text" readOnly/>*/}
                {/*</div>*/}
                {/*<div className="ingridient_data fats">*/}
                {/*    <Form.Label>fats</Form.Label>*/}
                {/*    <Form.Control value={ingridientInfo.energyValue.fats || ''} type="text" readOnly/>*/}
                {/*</div>*/}
                {/*<div className="ingridient_data carbs">*/}
                {/*    <Form.Label>carbs</Form.Label>*/}
                {/*    <Form.Control value={ingridientInfo.energyValue.carbohydrates || ''} type="text" readOnly/>*/}
                {/*</div>*/}
                {/*<div className="ingridient_data prots">*/}
                {/*    <Form.Label>prots</Form.Label>*/}
                {/*    <Form.Control value={ingridientInfo.energyValue.proteines || ''} type="text" readOnly/>*/}
                {/*</div>*/}
            </div>
        </div>
    </div>
};