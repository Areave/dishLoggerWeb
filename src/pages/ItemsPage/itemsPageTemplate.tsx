import React from "react";
import './itemsPage.scss';
import ActionButton from "../../comps/actionButton/actionButton";
import {Stat} from "../../comps/Stat/stat";
import {Search} from "../../comps/Search/search";
import {AddItemModal} from "../../comps/AddItemModal/addItemModal";
import {getPluralItemType, itemTypes} from "../../utils/itemTypes";
import {ItemCard} from "../../comps/ItemCard/itemCard";


const ItemsPageTemplate: React.FC<any> = ({
                                              itemType,
                                              setNewItemData,
                                              addItem,
                                              showModal,
                                              setShowModal,
                                              filteredItems,
                                              userStat,
                                              setSearchString,
                                              openModalToAddItem,
                                              removeItem
                                          }) => {
    return <div className="page items-page">
        <div className="items-page__content">
            <AddItemModal itemType={itemType} setNewItemData={setNewItemData} addItem={addItem} showModal={showModal}
                          closeModal={() => setShowModal(false)}/>
            {itemType === itemTypes.MEAL && <Stat mainStat={userStat.mainStat} statArray={userStat.statArray}/>}
            {/*{itemsArrayCurrent.length ? <Search setSearchString={setSearchString}/> :*/}
            {/*    <div className="text-center fw-bold py-1">No meals yet</div>}*/}
            <Search setSearchString={setSearchString}/>
            <ActionButton className='add-item__button my-3' onClick={openModalToAddItem} label={'add ' + itemType.toLowerCase()}/>
            <div className='mb-5'>
                {filteredItems.length ? filteredItems.map((item: any, index: number) =>
                        <ItemCard key={index} itemType={itemType} item={item} removeItem={removeItem}/>)
                    : <div>`no ${getPluralItemType(itemType)} yet`</div>}
            </div>
        </div>
    </div>
};

export default ItemsPageTemplate;