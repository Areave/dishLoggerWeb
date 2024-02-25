import React from 'react'
import './digitalValueItem.scss'
import {Types} from '../../utils/types'
import {Form} from "react-bootstrap";

const DigitalValueItem: React.FC<Types.DigitalValueItemProps> = ({editedItem, setEditedItem, energyValueFieldName, fieldName}: any) => {

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

export default DigitalValueItem;