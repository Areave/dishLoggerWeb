import React, {useEffect, useState} from 'react'
import {Form, Modal} from 'react-bootstrap';
import './addItemModal.scss'
import ActionButton from "../actionButton/actionButton";
import {useSelector} from "react-redux";
import {Types} from "../../utils/types";
import {getPluralItemType, itemTypes} from "../../utils/itemTypes";
import Dish = Types.Dish;
import Product = Types.Product;

export const ItemModalTemplate: React.FC<Types.AddItemModalProps> = ({showModal, closeModal, editedItem, itemType, addItem}) => {

    // @ts-ignore
    const initLocalEditedItem = {_id: '', name: '', description: '', ingridients: []};
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

    // TODO: докидать weight и прочие параметры, общие для сущностей
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
                    {itemType === itemTypes.PRODUCT && <>{'product'}</>}
                    {itemType !== itemTypes.PRODUCT && <IngridientsGroup
                        items={items}
                        setNewIngridient={setNewIngridient}
                        removeIngridientField={removeIngridientField}
                        // @ts-ignore
                        ingridientsArray={localEditedItem?.ingridients || []}/>}

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

// @ts-ignore
const IngridientsGroup = ({ingridientsArray, items, setNewIngridient, removeIngridientField}): any => {

    if (ingridientsArray.length) {
        return ingridientsArray.map((ingridientObject: any, index: number) => {
            return <NewIngridientSelect
                key={index + ' ' + ingridientObject.ingridient?.name}
                index={index}
                ingridientObject={ingridientObject}
                items={items}
                removeIngridientField={removeIngridientField}
                // ingridientsArray={newItem.ingridients}
                // newItemIngridients={newItemIngridients}
                setNewIngridient={setNewIngridient}
                // removeIngridientField={removeIngridientField}
            />
        });
    } else {
        return <NewIngridientSelect
            key={'0'}
            index={0}
            ingridientObject={null}
            items={{}}
            removeIngridientField={removeIngridientField}
            // ingridientsArray={newItem.ingridients}
            // newItemIngridients={newItemIngridients}
            setNewIngridient={setNewIngridient}
            // removeIngridientField={removeIngridientField}
        />
    }
};

const NewIngridientSelect = ({
                                 index,
                                 ingridientObject,
                                 items,
                                 // ingridientsArray,
                                 // newItemIngridients,
                                 setNewIngridient,
                                 removeIngridientField
                             }: {
    index: number,
    ingridientObject: any,
    items: {
        products: Product[] | null,
        dishes: Dish[] | null,
    } | {},
    // ingridientsArray: any[],
    // newItemIngridients: any[],
    setNewIngridient: (ingridient: any, index: number) => void,
    removeIngridientField: (args: any) => void,
}) => {

    // console.log('ingridientObject', ingridientObject)
    const [ingridientType, setIngridientType] = useState(ingridientObject?.type || itemTypes.PRODUCT as string);
    const [localItemsObject, setLocalItemsObject] = useState(null);
    const [currentItemsArray, setCurrentItemsArray] = useState([]);
    const [selectedIngridient, setSelectedIngridient] = useState(null);



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

    useEffect(() => {
        if (ingridientObject) {
            const localItemsObject = putIngridientObjectToStartOfLocalItemsObject(ingridientObject, items);
            setLocalItemsObject(localItemsObject);
        }
    }, []);

    useEffect(() => {
        // @ts-ignore
        let currentItemsArray = localItemsObject && localItemsObject[getPluralItemType(ingridientType)];

        if (currentItemsArray) {
            setCurrentItemsArray(currentItemsArray);
            setSelectedIngridient(currentItemsArray[0])
        } else {
            setCurrentItemsArray([]);
        }

    }, [ingridientType, localItemsObject]);

    const createSelectOptionsArray = () => {
        // console.log('currentItemsArray', currentItemsArray)
        return currentItemsArray.map((item: any, index: number) => {
            // console.log('item', item)
            return <option key={index}
                           value={index}>{item ? item.name : 'Deleted'}</option>
        })
    };


    const onSelectIngridientChange = (event: any) => {
            setSelectedIngridient(currentItemsArray[+event.target.value]);
    };

    useEffect(() => {
        if (selectedIngridient) {
            setNewIngridient({
                ingridient: selectedIngridient,
                type: selectedIngridient.type
            }, index)
        }
    }, [selectedIngridient]);


    return <div className='d-flex'>
        {/*<div className="" onClick={(event) => removeIngridientField(index)}>remove</div>*/}
        <Form.Select className='w-25' defaultValue={ingridientType} onChange={(event) => {
            // console.log('name', event.target.value)
            setIngridientType(event.target.value)
        }}>
            <option value={itemTypes.PRODUCT}>{itemTypes.PRODUCT.slice(0, 1)}</option>
            <option value={itemTypes.DISH}>{itemTypes.DISH.slice(0, 1)}</option>
        </Form.Select>

        <Form.Select className='w-25' onChange={onSelectIngridientChange}>
            {createSelectOptionsArray()}
        </Form.Select>
        <div className="" onClick={() => removeIngridientField(index)}>remove</div>
    </div>
};