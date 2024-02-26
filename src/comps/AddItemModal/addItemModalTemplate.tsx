import React, {useState} from 'react'
import {Form, Modal} from 'react-bootstrap';
import './addItemModal.scss'
import ActionButton from "../actionButton/actionButton";
import {useSelector} from "react-redux";
import {Types} from "../../utils/types";
import {getPluralItemType, itemTypes} from "../../utils/itemTypes";
import AddProductCard from "../AddProductCard/AddProductCard";
import AddDishOrMealCard from "../AddDishOrMealCard/AddDishOrMealCard";

export const ItemModalTemplate: React.FC<Types.AddItemModalProps> = ({showModal, closeModal, setEditedItem, editedItem, itemType, addItem, updateExistingItem}) => {

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

    const pageTags: any = useSelector((state: Types.MainState) => {
        const fieldName = getPluralItemType(itemType);
        // @ts-ignore
        return state.user.currentUser.intakeData.tags[fieldName];
    });

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
            if (item.isThisInitItem) {
                addItem(item);
            } else {
                updateExistingItem(item);
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
                    <Form.Control isInvalid={!editedItem.name}
                                  value={editedItem.name}
                                  type="text"
                                  placeholder="name"
                                  onChange={(e: any) => {
                                      setEditedItem({...editedItem, name: e.target.value})
                                  }}/>
                    <Form.Control isInvalid={!editedItem.description}
                                  value={editedItem.description}
                                  type="text"
                                  placeholder="description"
                                  onChange={(e: any) => {
                                      setEditedItem({...editedItem, description: e.target.value})
                                  }}/>
                    <Form.Group>
                        {pageTags && pageTags.length > 0 && pageTags.map((pageTag: string, index: number) => {
                            return <Form.Check
                                key={index}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setEditedItem({...editedItem, tags: [...editedItem.tags, e.target.id]})
                                    } else {
                                        const index = editedItem.tags.findIndex((tag: string) => tag === e.target.id);
                                        setEditedItem({...editedItem, tags: [...editedItem.tags.slice(0, index),
                                                ...editedItem.tags.slice(index + 1)]});
                                    }
                                }}
                                inline
                                checked={editedItem.tags.includes(pageTag)}
                                id={pageTag}
                                label={pageTag}
                            />
                        })}
                        {(isDish || isMeal) && <AddDishOrMealCard setEditedItem={setEditedItem} editedItem={editedItem}/>}
                        {isProduct && <AddProductCard setEditedItem={setEditedItem} editedItem={editedItem}/>}
                        <ActionButton onClick={(e) => {
                            AddOrUpdateItem(e, editedItem)
                        }}
                                      label={editedItem.isThisInitItem ? 'add' : 'update'}/>
                        {inValidError && <div>fill all fields</div>}
                    </Form.Group>
                </div>}
            </Modal.Body>
        </Modal>
    </div>
};