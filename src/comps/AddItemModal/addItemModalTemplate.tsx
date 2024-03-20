import React, {useEffect, useState} from 'react'
import {Alert, Form, Modal} from 'react-bootstrap';
import './addItemModal.scss'
import ActionButton from "../actionButton/actionButton";
import {useSelector} from "react-redux";
import {Types} from "../../utils/types";
import {getPluralItemType, itemTypes} from "../../utils/itemTypes";
import AddProductCard from "../AddProductCard/AddProductCard";
import AddDishOrMealCard from "../AddDishOrMealCard/AddDishOrMealCard";

export const ItemModalTemplate: React.FC<Types.AddItemModalProps> = ({
                                                                         showModal,
                                                                         closeModal,
                                                                         setEditedItem,
                                                                         editedItem,
                                                                         itemType,
                                                                         addItem,
                                                                         updateExistingItem
                                                                     }) => {

    const [itemInvalidError, setItemInvalidError] = useState('');
    const [changesArray, setChangesArray] = useState([]);
    const [showAllert, setShowAllert] = useState(false);

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

    const currentCurrencyRate: number = useSelector((state: Types.MainState) => {
        return state.user.currentCurrencyRate;
    });

    const getItemInvalidError = (item: any): string => {

        if (!item) {
            return 'no item';
        }

        const keys = Object.keys(item);

        if (!keys.length) {
            return 'no item';
        }
        for (let key in item) {
            const value = item[key];

            if ((!value && value !== 0 && typeof value !== 'boolean') || value === '') {
                return 'fill all fields';
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
                return getItemInvalidError(value);
            }
        }

        return '';
    };

    const createChangesArrayFromItem = (itemIngridients: Types.Ingridient[]) => {
        const changesArray: any[] = [];

        const getPriceForIngridientForAmountOrWeight = (ingridientProduct: Types.Product, amountOrWeight: number): number => {
            let priceForOneAmount;
            if (ingridientProduct.isThatPieceItem) {
                // ingridientForSave.price = +((ingridient.ingridient.priceForAllItems / ingridient.ingridient.amount)
                //     * ingridient.amount).toFixed(2);

                priceForOneAmount = +((ingridientProduct.priceForAllItems / ingridientProduct.amount) * amountOrWeight).toFixed(2);
            } else {
                priceForOneAmount = +((ingridientProduct.price / ingridientProduct.weight) * amountOrWeight).toFixed(2);
            }
            // @ts-ignore
            // return +((priceForOneAmount * amountOrWeight).toFixed(2));
            return priceForOneAmount;
        };

        itemIngridients.forEach((ingridient: Types.Ingridient, index: number) => {

            if (ingridient.type === itemTypes.DISH) {
                return;
            }

            const ingridientProduct = ingridient.ingridient;

            const oldPrice = ingridient.price;


            const actualProduct = items.products.find((product: Types.Product) => {
                return product._id === ingridientProduct._id;
            });

            if (!actualProduct) {
                return;
            }
            const newPrice = getPriceForIngridientForAmountOrWeight(actualProduct, ingridient.amount || ingridient.weight);

            if (oldPrice !== newPrice) {
                changesArray.push({
                    index,
                    ingridientProduct: actualProduct,
                    priceDifference: {newPrice, oldPrice}
                });
            }

        });

        return changesArray;
    };

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
                let coeff;
                if (itemType === itemTypes.PRODUCT) {
                    coeff = +ingridient.weight / 100;
                } else {
                    coeff = +ingridient.weight / +ingridient.ingridient.weight;
                }
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
                const ingridientWeight = +ingridient.weight;
                // @ts-ignore
                if (ingridient.ingridient?.cookingCoefficient) {
                    // @ts-ignore
                    ingridientWeight = ingridientWeight * ingridient.ingridient.cookingCoefficient
                }
                itemData.weight += ingridientWeight;
            } else if (ingridient.amount) {
                itemData.weight += +ingridient.weightForTakenAmount;
            }

            const {calories, proteines, fats, carbohydrates} = ingridient.energyValue;
            itemData.energyValue.calories += calories;
            itemData.energyValue.proteines += proteines;
            itemData.energyValue.fats += fats;
            itemData.energyValue.carbohydrates += carbohydrates;
        });
        if (editedItem.type === itemTypes.MEAL) {
            itemData.priceUSD = itemData.price * currentCurrencyRate;
        }
        return {...editedItem, ...itemData};
    };

    const setRecalculateDishForActualPrice = (currentItem: Types.Dish, changesArray: Types.PriceDifferenceObject[]) => {
        let ingridientsArray = [...currentItem.ingridients];
        changesArray.forEach((changeObject: Types.PriceDifferenceObject) => {
            const oldIngridientObject = {...ingridientsArray[changeObject.index], ingridient: changeObject.ingridientProduct};
            const recalculatedIngridient = getIngridientWithValues(oldIngridientObject);
            ingridientsArray = [
                ...ingridientsArray.slice(0, changeObject.index),
                recalculatedIngridient,
                ...ingridientsArray.slice(changeObject.index + 1)
            ];
        });
        const newItem = getEditedItemWithValues(currentItem, ingridientsArray);
        setEditedItem({...newItem, ingridients: ingridientsArray});
    };

    const AddOrUpdateItem = (e: any, item: any) => {

        const itemInvalidError = getItemInvalidError(item);

        // if (itemInvalidError && !skipRecalculate) {
        if (itemInvalidError) {
            setItemInvalidError(itemInvalidError);
            return;
        } else if (itemInvalidError) {
            setItemInvalidError('');
        }

        if (isDish) {

            const changesArray = createChangesArrayFromItem(item.ingridients);

            if (changesArray.length) {
                setChangesArray(changesArray);
                return;
            } else if (changesArray.length) {
                setChangesArray([]);
            }
        }

        if (item.isThisInitItem) {
            addItem(item);
        } else {
            updateExistingItem(item);
        }
    };

    useEffect(() => {
        if (changesArray.length) {
            setShowAllert(true);
        }
    }, [changesArray]);

    return <div style={{display: 'block', position: 'initial'}}>
        <Modal show={showModal} onHide={() => {
            closeModal();
            setEditedItem(null);
            setChangesArray([]);
            setItemInvalidError('');
            setShowAllert(false);
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
                                        setEditedItem({
                                            ...editedItem, tags: [...editedItem.tags.slice(0, index),
                                                ...editedItem.tags.slice(index + 1)]
                                        });
                                    }
                                }}
                                inline
                                checked={editedItem.tags.includes(pageTag)}
                                id={pageTag}
                                label={pageTag}
                            />
                        })}
                        {(isDish || isMeal) && <AddDishOrMealCard getEditedItemWithValues={getEditedItemWithValues} getIngridientWithValues={getIngridientWithValues} setEditedItem={setEditedItem} editedItem={editedItem}/>}
                        {isProduct && <AddProductCard setEditedItem={setEditedItem} editedItem={editedItem}/>}
                        {showAllert && <Alert className={'alert'} show={showAllert} variant="warning">
                            <Alert.Heading>price change!</Alert.Heading>
                            <div className="changes">{
                                changesArray.map((changeObject: Types.PriceDifferenceObject, index: number) => {
                                    return <div key={index} className={'price_difference'}>
                                        <div className="name">
                                            {'#' + (changeObject.index + 1) + ' ' + changeObject.ingridientProduct.name}
                                        </div>
                                        <div className="price_block old_price">
                                            <span className="label">Old price: </span>
                                            <span className="value">{changeObject.priceDifference.oldPrice}</span>
                                        </div>
                                        <div className="price_block new_price">
                                            <span className="label">New price: </span>
                                            <span className="value">{changeObject.priceDifference.newPrice}</span>
                                        </div>
                                    </div>
                                })
                            }</div>
                            <hr/>
                            <div className="d-flex justify-content-end">
                                <ActionButton onClick={(e) => {
                                    setRecalculateDishForActualPrice(editedItem, changesArray);
                                    setShowAllert(false);
                                }} label={'recalculate'}/>
                            </div>
                            <div className="d-flex justify-content-end">
                                <ActionButton onClick={(e) => {
                                    setItemInvalidError('');
                                    AddOrUpdateItem(e, editedItem);
                                    setShowAllert(false);
                                }} label={'keep as is'}/>
                            </div>
                        </Alert>}
                        {!showAllert && <ActionButton onClick={(e) => {
                            AddOrUpdateItem(e, editedItem)
                        }}
                                      label={editedItem.isThisInitItem ? 'add' : 'update'}/>}
                        {itemInvalidError && <div>{itemInvalidError}</div>}
                    </Form.Group>
                </div>}
            </Modal.Body>
        </Modal>
    </div>
};