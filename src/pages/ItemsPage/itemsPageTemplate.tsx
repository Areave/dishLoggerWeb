import React from "react";
import './itemsPage.scss';
import ActionButton from "../../comps/actionButton/actionButton";
import {Stat} from "../../comps/Stat/stat";
import {Search} from "../../comps/Search/search";
import {getPluralItemType, itemTypes} from "../../utils/itemTypes";
import {ItemCard} from "../../comps/ItemCard/itemCard";
import LoadingPage from "../loadingPage/loadingPage";
import {ItemModalTemplate} from "../../comps/AddItemModal/addItemModalTemplate";
import { Form } from "react-bootstrap";


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
                                              isItemsLoading,
                                              currentTagsArray,
                                              setCurrentTagsArray,
                                              pageTags
                                          }) => {
    if (isItemsLoading) return <LoadingPage/>;
    return <div className="page items-page">
        <div className="items-page__content">
            <ItemModalTemplate itemType={itemType} editedItem={editedItem} setEditedItem={setEditedItem} addItem={addItem}
                               updateExistingItem={updateExistingItem} showModal={showModal}
                               closeModal={() => {
                                   setEditedItem(null);
                                   setShowModal(false)
                               }}/>
            {itemType === itemTypes.MEAL && <Stat statArray={userStat.statArray}/>}

            <Search setSearchString={setSearchString}/>
            {pageTags && pageTags.length > 0 && pageTags.map((pageTag: string) => {
                return <Form.Check
                    onChange={(e) => {
                        if (e.target.checked) {
                            setCurrentTagsArray([e.target.id, ...currentTagsArray])
                        } else {
                            const index = currentTagsArray.findIndex((tag: string) => tag === e.target.id);
                            setCurrentTagsArray([...currentTagsArray.slice(0, index),
                                ...currentTagsArray.slice(index + 1)])
                        }
                    }}
                    id={pageTag}
                    label={pageTag}
                />
            })}
            <ActionButton className='add-item__button my-3' onClick={openModalToAddItem} label={'add ' + itemType.toLowerCase()}/>
            <div className='mb-5'>
                {items?.length ? items.map((item: any, index: number) =>
                        <ItemCard key={index}
                                  itemType={itemType}
                                  item={item}
                                  removeItem={removeItem}
                                  openModalForEdit={(e: any) => openModalToAddItem(e, item)}/>)
                    : <div className="text-center fw-bold py-3 mt-3">{'no ' + getPluralItemType(itemType) + ' yet'}</div>}
            </div>
        </div>
    </div>
};

export default ItemsPageTemplate;