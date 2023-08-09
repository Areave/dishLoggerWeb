import React, {useEffect, useState} from 'react'
import {Form, Modal} from 'react-bootstrap';
import './addItemModal.scss'
import ActionButton from "../actionButton/actionButton";
import {useSelector} from "react-redux";
import {Types} from "../../utils/types";
import {getPluralItemType, itemTypes} from "../../utils/itemTypes";
import ItemsState = Types.ItemsState;
import Dish = Types.Dish;
import Product = Types.Product;

export const ItemModalTemplate: React.FC<Types.AddItemModalProps> = ({showModal, closeModal, itemType, addItem, editedItem}) => {

    const initNewItem = {name: '', description: '', ingridients: [{}]};
    const [newItem, setNewItem] = useState(initNewItem);
    // @ts-ignore
    const initIngridientsArray = editedItem && editedItem.ingridients ? editedItem.ingridients : [{}];
    // console.log('initIngridientsArray', initIngridientsArray)
    const [ingridientsArray, setIngridientsArray] = useState(initIngridientsArray);


    const items = useSelector((state: Types.MainState) => {
        return {
            dishes: state.items.dishes,
            products: state.items.products
        };
    });

    useEffect(() => {
        if (Object.keys(editedItem).length) {
            // console.log('editedItem', editedItem);
            const copyeditedItem = JSON.parse(JSON.stringify(editedItem));

            // @ts-ignore
            setNewItem({_id: copyeditedItem._id,
                name: copyeditedItem.name,
                description: copyeditedItem.description,
                ingridients: copyeditedItem.ingridients});
            // @ts-ignore
            setIngridientsArray(editedItem.ingridients);
        }
        // const newItem2 = editedItem ? JSON.parse(JSON.stringify(editedItem)) : {...newItem, ingridients: [{}]};

    }, [editedItem]);

    // console.log('newItem', newItem);
    // console.log('editedItem', editedItem);
    // console.log('items', items);
    // console.log('ingridientsArray', ingridientsArray);


    const addIngridientField = () => {
        setIngridientsArray([...ingridientsArray, {}])
    };
    const removeIngridientField = (index: number) => {
        // console.log('ingridientsArray', ingridientsArray);
        // console.log('newArray', [...ingridientsArray.slice(0, index), ...ingridientsArray.slice(index+1)]);
        setIngridientsArray([...ingridientsArray.slice(0, index), ...ingridientsArray.slice(index + 1)])
    };
    // console.log(newItem);


    return <div style={{display: 'block', position: 'initial'}}>
        <Modal show={showModal} onHide={() => {
            closeModal();
            console.log('close, initNewItem', initNewItem)
            setNewItem(initNewItem);
            // @ts-ignore
            setIngridientsArray([{}]);
            // @ts-ignore
            // setNewItemData({});
        }} className='modal'>
            {/*<Modal.Header className='modal__header' closeButton>*/}
            {/*    <Modal.Title>{getButtonTitle()}</Modal.Title>*/}
            {/*</Modal.Header>*/}
            <Modal.Body>
                <Form.Control value={newItem.name} type="text" placeholder="name" onChange={(e: any) => {
                    setNewItem({...newItem, name: e.target.value})
                }}/>
                <Form.Control value={newItem.description} type="text" placeholder="description" onChange={(e: any) => {
                    setNewItem({...newItem, description: e.target.value})
                }}/>
                <Form.Group>


                    {/*{ingridientsArray.map((ingridientObject: any, index: number, array: any) => {*/}

                    {newItem.ingridients.map((ingridientObject: any, index: number, array: any) => {
                        // if (index === 0) console.log(array)

                        return <NewIngridientSelect
                            key={index + ' ' + ingridientObject.ingridient?.name}
                            index={index}
                            items={items}
                            ingridientObject={ingridientObject}
                            newItem={newItem}
                            setNewItem={setNewItem}
                            removeIngridientField={removeIngridientField}/>
                    })}
                    <ActionButton onClick={addIngridientField} label={'add ingridient'}/>
                    <ActionButton onClick={() => {
                        console.log(newItem)
                    }} label={'print newItem'}/>
                    <ActionButton onClick={() => {
                    }} label={'add item'}/>
                </Form.Group>

            </Modal.Body>
            {/*<Modal.Footer>*/}
            {/*    <ActionButton onClick={() => {*/}
            {/*        // console.log(newItemData);*/}
            {/*        addItem();*/}
            {/*        closeModal();*/}
            {/*    }} label={'add'}/>*/}
            {/*</Modal.Footer>*/}
        </Modal>
    </div>
};

const NewIngridientSelect = ({index, items, ingridientObject, newItem, setNewItem, removeIngridientField}: {
    index: number,
    items: {
        products: Product[] | null,
        dishes: Dish[] | null,
    },
    ingridientObject: any,
    newItem: any,
    setNewItem: (args: any) => void,
    removeIngridientField: (args: any) => void,
}) => {

    // console.log('ingridientObject', ingridientObject)
    const [ingridientType, setIngridientType] = useState(ingridientObject.type || itemTypes.PRODUCT as string);
    const [currentItemsArray, setCurrentItemsArray] = useState([]);
    const [localItemsObject, setLocalItemsObject] = useState({});

    const addIngridientObjectToLocalItemsObject = (ingridientObject: any, items: any) => {
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
            arrayForAdding = [ingridientObject.ingridient, ...arrayForAdding.slice(0, index), ...arrayForAdding.slice(index + 1)];
        }
        return {...items, [fieldName]: arrayForAdding};
    };

    const createSelectOptionsArray = () => {
        // console.log('currentItemsArray', currentItemsArray)
        return currentItemsArray.map((item: any, index: number) => {
            // console.log('item', item)
            return <option key={index}
                           value={index}>{item ? item.name : 'Deleted'}</option>
        })
    };

    useEffect(() => {
        const localItemsObject = addIngridientObjectToLocalItemsObject(ingridientObject, items);
        // console.log('localItemsObject',localItemsObject)
        setLocalItemsObject(localItemsObject);
    }, []);

    useEffect(() => {
        // @ts-ignore
        let currentItemsArray = localItemsObject && localItemsObject[getPluralItemType(ingridientType)];
        // console.log('currentItemsArray',currentItemsArray)
        // console.log('currentItemsArray from hook', currentItemsArray)
        if (currentItemsArray) {
            setCurrentItemsArray(currentItemsArray);
            ingridientChangeHandler({
                ingridient: currentItemsArray[0] ? currentItemsArray[0]._id : null,
                type: ingridientType
            }, index)
        } else {
            setCurrentItemsArray([]);
        }


    }, [ingridientType, localItemsObject]);

    const ingridientChangeHandler = (ingridientObject: any, index: number) => {
        // console.log('index', index)
        let newItemIngridientsArray = newItem.ingridients || [];
        const updatedIngridientObject = {...newItemIngridientsArray[index], ...ingridientObject}
        // if (newItemIngridientsArray.length === 1 && index === 0) {
        //     newItemIngridientsArray = [updatedIngridientObject]
        // }
        const newIngridientsArray = [
            ...newItemIngridientsArray.slice(0, index),
            updatedIngridientObject,
            ...newItemIngridientsArray.slice(index + 1)
        ];
        setNewItem({...newItem, ingridients: newIngridientsArray})
    };


    // console.log('currentItemsArray', currentItemsArray);


    return <div className='d-flex'>
        <div className="" onClick={(event) => removeIngridientField(index)}>remove</div>
        <Form.Select className='w-25' defaultValue={ingridientType} onChange={(event) => {
            // console.log('name', event.target.value)
            setIngridientType(event.target.value)
        }}>
            <option value={itemTypes.PRODUCT}>{itemTypes.PRODUCT.slice(0, 1)}</option>
            <option value={itemTypes.DISH}>{itemTypes.DISH.slice(0, 1)}</option>
        </Form.Select>
        <Form.Select className='w-25' onChange={
            (event) => {
                if (!event.target.value) {
                    return;
                } else {
                    console.log('selected ingridient', currentItemsArray[+event.target.value]);
                    // @ts-ignore
                    ingridientChangeHandler({ingridient: currentItemsArray[+event.target.value]._id}, index)

                }
            }

            // setNewItem(ingridientIndex,
            // // @ts-ignore
            // {ingridient: localItemsArray[event.target.value]._id})
        }>
            {createSelectOptionsArray()}
        </Form.Select>
        {ingridientObject.weight && <Form.Control className='w-25' value={ingridientObject.weight} type="text" placeholder="weight"
                                                  onChange={(e: any) => {
                                                      // @ts-ignore
                                                      // addIngridientToItemIngridients(ingridientIndex, {...newItemData, weight: e.target.value})
                                                  }}/>}
        {ingridientObject.amountOfItems && <Form.Control className='w-25' value={ingridientObject.amountOfItems} type="text" placeholder="amount"
                                                         onChange={(e: any) => {
                                                             // @ts-ignore
                                                             // addIngridientToItemIngridients(ingridientIndex, {...newItemData, amountOfItems: e.target.value})
                                                         }}/>}
    </div>
};