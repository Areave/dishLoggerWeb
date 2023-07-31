import React from 'react'
import {Modal} from 'react-bootstrap';
import './addItemModal.scss'
import ActionButton from "../actionButton/actionButton";
import {useSelector} from "react-redux";
import Loader from "../loader/loader";

export const AddItemModal: React.FC<any> = ({showModal, setShowModal, addMeal}) => {

    const isItemLoading = useSelector((state: { items: any }) => {
        return state.items.isItemLoading;
    });

    if (isItemLoading) return <Loader/>

    return <div className='addItemModal'
                style={{display: 'block', position: 'initial'}}>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            {/*<Modal.Dialog>*/}
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Modal body text goes here.</p>
            </Modal.Body>
            <Modal.Footer>
                <ActionButton onClick={() => {
                }} label={'label1'}/>
                <ActionButton onClick={() => {
                }} label={'label2'}/>
            </Modal.Footer>
            {/*</Modal.Dialog>*/}
        </Modal>
    </div>
};