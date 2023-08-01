import React from 'react'
import {Modal} from 'react-bootstrap';
import './addItemModal.scss'
import ActionButton from "../actionButton/actionButton";
import {useSelector} from "react-redux";
import Loader from "../loader/loader";
import {Types} from "../../utils/types";

export const AddItemModalTemplate: React.FC<Types.AddItemModalProps> = ({showModal, closeModal, targetItem, addItem, setNewItemData}) => {

    const isItemLoading = useSelector((state: { items: any }) => {
        return state.items.isItemLoading;
    });

    if (isItemLoading) return <Loader/>;

    return <div className='add-item__modal'
                style={{display: 'block', position: 'initial'}}>
        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{'Add new ' + targetItem.toLowerCase()}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Modal body text goes here.</p>
            </Modal.Body>
            <Modal.Footer>
                <ActionButton onClick={() => {
                    addItem();
                    closeModal();
                }} label={'Add new ' + targetItem.toLocaleLowerCase()}/>
            </Modal.Footer>
        </Modal>
    </div>
};