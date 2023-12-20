import React from "react";
import './itemsPage.scss';
import ActionButton from "../../comps/actionButton/actionButton";
import {Stat} from "../../comps/Stat/stat";
import {Search} from "../../comps/Search/search";
import {AddItemModal} from "../../comps/AddItemModal/addItemModal";
import {getPluralItemType, itemTypes} from "../../utils/itemTypes";
import {ItemCard} from "../../comps/ItemCard/itemCard";
import LoadingPage from "../loadingPage/loadingPage";
import {ItemModalTemplate} from "../../comps/AddItemModal/addItemModalTemplate";


const ItemsPageTemplate: React.FC<any> = ({
                                              itemType,
                                              editedItem,
                                              setEditedItem,
                                              addItem,
                                              updateExistingItem,
                                              showModal,
                                              setShowModal,
                                              items,
                                              userStat,
                                              setSearchString,
                                              openModalToAddItem,
                                              removeItem,
                                              isItemsLoading
                                          }) => {
    // console.log('render page');
    if (isItemsLoading) return <LoadingPage/>;
    return <div className="page items-page">
        <div className="items-page__content">
            <ItemModalTemplate itemType={itemType} editedItem={editedItem} addItem={addItem} updateExistingItem={updateExistingItem} showModal={showModal}
                          closeModal={() => {
                              setEditedItem({});
                              setShowModal(false)}}/>
            {itemType === itemTypes.MEAL && <Stat statArray={userStat.statArray}/>}
            <Search setSearchString={setSearchString}/>
            <ActionButton className='add-item__button my-3' onClick={(e) => openModalToAddItem(e, null)} label={'add ' + itemType.toLowerCase()}/>
            <div className='mb-5'>
                {items?.length ? items.map((item: any, index: number) =>
                        <ItemCard key={index} itemType={itemType} item={item} removeItem={removeItem} openModalForEdit={(e: any) => openModalToAddItem(e, item)}/>)
                    : <div className="text-center fw-bold py-3 mt-3">{'no '+ getPluralItemType(itemType) + ' yet'}</div>}
            </div>
        </div>
    </div>
};

export default ItemsPageTemplate;