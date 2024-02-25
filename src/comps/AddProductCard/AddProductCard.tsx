import React from 'react'
import './addProductCard.scss'
import {Types} from '../../utils/types'
import DigitalValueItem from "../DigitalValueItem/DigitalValueItem";

const AddProductCard: React.FC<Types.AddProductCardProps> = ({editedItem, setEditedItem}: any) => {

    return <div className='product'>
        {!editedItem.isThisInitItem && (editedItem.isThatPieceItem ? <div>PieceProduct</div> : <div>WeightProduct</div>)}
        <div className="cookingCoefficient">
            <DigitalValueItem editedItem={editedItem}
                              setEditedItem={setEditedItem}
                              fieldName='cookingCoefficient'/>
        </div>

        {editedItem.isThatPieceItem && <div>
            {['amount', 'priceForAllItems', 'weightForAllItems'].map((field: string, index: number) =>
                <DigitalValueItem key={index}
                                  editedItem={editedItem}
                                  setEditedItem={setEditedItem}
                                  fieldName={field}/>
            )}
        </div>}
        {!editedItem.isThatPieceItem && <div>
            {['weight', 'price'].map((field: string, index: number) =>
                <DigitalValueItem key={index}
                                  editedItem={editedItem}
                                  setEditedItem={setEditedItem}
                                  fieldName={field}/>
            )}
        </div>}
        <div className="energyValue">
            <div className="energyValue_label">{editedItem.isThatPieceItem ? 'energyValue for one piece' : 'energyValue for 100gr'}</div>
            <div className="energyValue_data">
                {['calories', 'proteines', 'fats', 'carbohydrates'].map((field: string, index: number) =>
                    <DigitalValueItem key={index}
                                      editedItem={editedItem}
                                      setEditedItem={setEditedItem}
                                      energyValueFieldName={editedItem.isThatPieceItem ? 'energyValueForOneItem' : 'energyValue'}
                                      fieldName={field}/>
                )}
            </div>
        </div>
    </div>
};

export default AddProductCard;