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

export const ItemModalTemplate: React.FC<Types.AddItemModalProps> = ({showModal, closeModal, editedItem, itemType, addItem}) => {

    // @ts-ignore
    const initLocalEditedItem = {_id: '', name: '', description: '', ingridients: [{}]};
    // const [itemToSave, setItemToSave] = useState(initItemToSave);
    const [localEditedItem, setLocalEditedItem] = useState(initLocalEditedItem);

    console.log('localEditedItem', localEditedItem);
    // console.log('editedItem', editedItem);


    const items = useSelector((state: Types.MainState) => {
        return {
            dishes: state.items.dishes,
            products: state.items.products
        };
    });

    useEffect(() => {
        // TODO: понять, зачем
        if (editedItem) {
            const copyEditedItem = JSON.parse(JSON.stringify(editedItem));
            setLocalEditedItem({
                _id: copyEditedItem._id,
                name: copyEditedItem.name,
                description: copyEditedItem.description,
                ingridients: copyEditedItem.ingridients
            });
        } else {
            console.log('no editedItem', editedItem)
        }
    }, [editedItem]);

    useEffect(() => {
        console.log('localEditedItem from useEffect', localEditedItem);
    }, [localEditedItem]);

    const addIngridientField = () => {
        setLocalEditedItem({...localEditedItem, ingridients: [...localEditedItem.ingridients, {}]})
    };

    const removeIngridientField = (index: number) => {
        const newIngridientsArray = [...localEditedItem.ingridients.slice(0, index),
            ...localEditedItem.ingridients.slice(index + 1)];
        setLocalEditedItem({...localEditedItem, ingridients: newIngridientsArray})
    };

    const setNewIngridient = (ingridient: any, index: number) => {
        const newIngridientsArray = [
            ...localEditedItem.ingridients.slice(0, index),
            ingridient,
            ...localEditedItem.ingridients.slice(index + 1)
        ];
        setLocalEditedItem({...localEditedItem, ingridients: newIngridientsArray});

    };

    return <div style={{display: 'block', position: 'initial'}}>
        <Modal show={showModal} onHide={() => {
            closeModal();
            // setItemToSave(initItemToSave);
            setLocalEditedItem(initLocalEditedItem);
        }} className='modal'>
            <Modal.Body>
                <Form.Control value={localEditedItem?.name || ''} type="text" placeholder="name" onChange={(e: any) => {
                    setLocalEditedItem({...localEditedItem, name: e.target.value})
                }}/>
                <Form.Control value={localEditedItem?.description || ''} type="text" placeholder="description" onChange={(e: any) => {
                    setLocalEditedItem({...localEditedItem, description: e.target.value})
                }}/>
                <Form.Group>
                    {itemType === itemTypes.PRODUCT && <AddProductCard setLocalEditedItem={setLocalEditedItem} localEditedItem={localEditedItem}/>}
                    {itemType !== itemTypes.PRODUCT && localEditedItem.ingridients.map((ingridientObject: any, index: number) => {
                        return <NewIngridientSelect
                            // key={index + '_' + ingridientObject?.ingridient?.name}
                            key={index}
                            index={index}
                            ingridientObject={ingridientObject}
                            items={items}
                            removeIngridientField={removeIngridientField}
                            setNewIngridient={setNewIngridient}/>
                    })}
                    <ActionButton onClick={addIngridientField} label={'add ingridient'}/>
                    <ActionButton onClick={() => {
                        // console.log(newItemIngridients)
                    }} label={'print newItemIngridients'}/>
                    <ActionButton onClick={() => {
                    }} label={'add item'}/>
                </Form.Group>
            </Modal.Body>
        </Modal>
    </div>
};

const AddProductCard = ({localEditedItem, setLocalEditedItem}: any) => {


    // isThatPieceProduct: Boolean,

//     amountOfPieces: Number,
//     priceForAllPieces: Number,

//     energyValueForOnePiece: {
//     calories: Number,
//         proteines: Number,
//         fats: Number,
//         carbohydrates: Number
    // },

    // weight: Number,
//     price: Number,

//     energyValue: {
//     calories: Number,
//         proteines: Number,
//         fats: Number,
//         carbohydrates: Number
// },


    const [isPieceProduct, setIsPieceProduct] = useState(false);
    const [energyValueFieldName, setEnergyValueFieldName] = useState('energyValue');

    const handleToggle = () => {
        setIsPieceProduct(!isPieceProduct);
    };

    useEffect(() => {
        setEnergyValueFieldName(isPieceProduct ? 'energyValueForOnePiece' : 'energyValue');
    }, [isPieceProduct]);

    return <div className='product'>
        {!localEditedItem && <Form.Check type="switch"
                    id="custom-switch"
                    label={isPieceProduct ? 'PieceProduct' : 'WeightProduct'}
                    checked={isPieceProduct}
                    onChange={handleToggle}/>}
        {isPieceProduct && <div>
            <div className="amountOfPieces">
                <Form.Label>amountOfPieces</Form.Label>
                <Form.Control value={localEditedItem?.amountOfPieces || ''} type="text" placeholder="amountOfPieces" onChange={(e: any) => {
                    setLocalEditedItem({...localEditedItem, amountOfPieces: +e.target.value})
                }}/></div>
            <div className="priceForAllPieces">
                <Form.Label>priceForAllPieces</Form.Label>
                <Form.Control value={localEditedItem?.priceForAllPieces || ''} type="text" placeholder="priceForAllPieces" onChange={(e: any) => {
                    setLocalEditedItem({...localEditedItem, priceForAllPieces: +e.target.value})
                }}/></div>
        </div>}
        {!isPieceProduct && <div>
            <div className="weight">
                <Form.Label>weight</Form.Label>
                <Form.Control value={localEditedItem?.weight || ''} type="text" placeholder="weight" onChange={(e: any) => {
                    setLocalEditedItem({...localEditedItem, weight: +e.target.value})
                }}/></div>
            <div className="price">
                <Form.Label>price</Form.Label>
                <Form.Control value={localEditedItem?.price || ''} type="text" placeholder="price" onChange={(e: any) => {
                    setLocalEditedItem({...localEditedItem, price: +e.target.value})
                }}/></div>
        </div>}
        <div className="energyValue">
            <div className="energyValue_label">{isPieceProduct ? 'energyValue for one piece' : 'energyValue'}</div>
            <div className="energyValue_data">
                <div className="calories">
                    <Form.Label>calories</Form.Label>
                    <Form.Control value={localEditedItem && localEditedItem[energyValueFieldName].calories || ''} type="text" placeholder="calories" onChange={(e: any) => {
                        setLocalEditedItem({...localEditedItem,[energyValueFieldName]: {
                                ...localEditedItem[energyValueFieldName],
                                calories: +e.target.value}})
                    }}/></div>
                <div className="proteines">
                    <Form.Label>proteines</Form.Label>
                    <Form.Control value={localEditedItem && localEditedItem[energyValueFieldName].proteines || ''} type="text" placeholder="proteines" onChange={(e: any) => {
                        setLocalEditedItem({...localEditedItem,[energyValueFieldName]: {
                                ...localEditedItem[energyValueFieldName],
                                proteines: +e.target.value}})
                    }}/></div>
                <div className="fats">
                    <Form.Label>fats</Form.Label>
                    <Form.Control value={localEditedItem && localEditedItem[energyValueFieldName].fats || ''} type="text" placeholder="fats" onChange={(e: any) => {
                        setLocalEditedItem({...localEditedItem,[energyValueFieldName]: {
                                ...localEditedItem[energyValueFieldName],
                                fats: +e.target.value}})
                    }}/></div>
                <div className="carbohydrates">
                    <Form.Label>carbohydrates</Form.Label>
                    <Form.Control value={localEditedItem && localEditedItem[energyValueFieldName].carbohydrates || ''} type="text" placeholder="carbohydrates" onChange={(e: any) => {
                        setLocalEditedItem({...localEditedItem,[energyValueFieldName]: {
                                ...localEditedItem[energyValueFieldName],
                                carbohydrates: +e.target.value}})
                    }}/></div>
            </div>

        </div>
    </div>

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