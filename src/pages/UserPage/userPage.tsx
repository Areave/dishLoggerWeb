import './userPage.scss'
import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import {Types} from "../../utils/types";
import {useDispatch, useSelector} from "react-redux";
import ActionButton from "../../comps/actionButton/actionButton";
import {
    checkCurrencyRateAndSetIfNeed,
    checkResponseForMessage,
    fetchCurrencyList,
    fetchCurrencyRate,
    fetchUser,
    updateUser
} from "../../utils/store/asyncThunks";
import apiService from "../../utils/apiService";
import {itemTypes} from "../../utils/itemTypes";
import {setCurrentCurrencyRate} from "../../utils/store/actionCreators";

const UserPage = () => {

    const [localCurrentUser, setLocalCurrentUser] = useState(null);
    const [tagsToAdd, setTagsToAdd] = useState({
        products: '',
        dishes: ''
    });
    // const [currencyArray, setCurrencyArray] = useState(null);

    const currentUser: Types.User = useSelector((state: Types.MainState) => {
        return state.user.currentUser;
    });

    const currentCurrencyRate: number = useSelector((state: Types.MainState) => {
        return state.user.currentCurrencyRate;
    });
    const currenciesList: Types.Currency[] = useSelector((state: Types.MainState) => {
        return state.user.currenciesList;
    });

    console.log('currentCurrencyRate', currentCurrencyRate);

    const dispatch = useDispatch();

    const onSaveUserDataClick = () => {
        console.log('localCurrentUser', localCurrentUser);
        dispatch(updateUser({
            newUser: localCurrentUser
        }));
    };

    useEffect(() => {
        if (!currenciesList.length) {
            dispatch(fetchCurrencyList());
        }
    }, []);

    useEffect(() => {
        setLocalCurrentUser((currentUser));
    }, [currentUser]);

    useEffect(() => {
        if (localCurrentUser?.intakeData?.currency.short_code
            && localCurrentUser?.intakeData?.currency.short_code !== currentUser.intakeData.currency.short_code) {
            dispatch(checkCurrencyRateAndSetIfNeed(localCurrentUser?.intakeData?.currency.short_code));
        }
    }, [localCurrentUser?.intakeData?.currency]);


    if (!localCurrentUser) {
        return <div className="page user-page">
            <div>no current user</div>
        </div>
    }
    const {name, intakeData} = localCurrentUser;
    const {tags, energyValue, currency} = intakeData;

    return <div className="page user-page">
        <div className="intake_data">
            <div className="info-block">
                <div className="info-title">Имя:</div>
                <Form.Control value={name}
                              type="text"
                              placeholder={'name'}
                              onChange={(e: any) => {
                                  setLocalCurrentUser({...localCurrentUser, name: e.target.value})
                              }}/>
            </div>
            {currenciesList && currenciesList.length > 0 && <div className="info-block">
                <div className="info-title">Валюта</div>
                <Form.Select
                    defaultValue={intakeData.currency && currenciesList.findIndex((currencyObject: any) => {
                        return currencyObject.short_code === intakeData.currency.short_code
                    })}
                    onChange={(event) => {
                        const value = event.target.value;
                        // @ts-ignore
                        const {name, symbol, short_code} = currenciesList[value];
                        setLocalCurrentUser({
                            ...localCurrentUser, intakeData: {
                                ...localCurrentUser.intakeData,
                                currency: {name, symbol, short_code}
                            }
                        })
                    }}>{currenciesList.map((currency: any, index: number) => {
                    return <option key={index} value={index}>{currency.name + ' ' + currency.short_code}</option>
                })}
                </Form.Select>
            </div>}
            {!!currentCurrencyRate && <div className="info-block">
                <div className="info-title">Курс к доллару:</div>
                {/*<div className="currency-rate">{currentCurrencyRate}</div>*/}
                <div className="">{`${1 / currentCurrencyRate} ${currency.short_code} for 1USD`}</div>
            </div>}
            {Object.keys(tags).length > 0 && <div className="info-block">
                <div className="info-title">Тэги:</div>
                {Object.keys(tags).map((key: string, index: number) => {
                    const tagsArray = tags[key];
                    if (!tagsArray.length) {
                        return;
                    }
                    return <div key={index} className={'info-tags'}>
                        <div className="info-tag-label">{key}</div>
                        {tagsArray.map((tag: string, index: number) => {
                            return <span key={index}>{tag + ' '}</span>
                        })}
                        <div className="info-add-tag">
                            <Form.Label>Добавить тэг</Form.Label>
                            <Form.Control placeholder={'tag'}
                                          onChange={(e: any) => {
                                              const newTag = e.target.value;
                                              setTagsToAdd({...tagsToAdd, [key]: newTag})
                                          }}/>
                        </div>
                        <ActionButton onClick={() => {
                            // @ts-ignore
                            const newTag = tagsToAdd[key];
                            const newTagsArrayForKey = [...intakeData.tags[key], newTag];
                            const newIntakeDataTags = {...intakeData.tags, [key]: newTagsArrayForKey};
                            const newIntakeData = {...localCurrentUser.intakeData, tags: newIntakeDataTags};
                            const newLocalUser = {...localCurrentUser, intakeData: newIntakeData};
                            setLocalCurrentUser(newLocalUser);
                        }} label={'add'}/>
                    </div>
                })}
            </div>}
            <div className="info-block">
                <div className="info-title">Нормы энергопотребления:</div>
                {Object.keys(energyValue).map((key: string, index: number) => {
                    // @ts-ignore
                    const value = energyValue[key];
                    return <div key={index}>
                        <span>{key}</span>
                        <Form.Control value={
                            localCurrentUser.intakeData.energyValue[key]}
                                      type="text"
                                      placeholder={key}
                                      onChange={(e: any) => {
                                          const intakeData = {
                                              ...localCurrentUser.intakeData,
                                              energyValue: {
                                                  ...localCurrentUser.intakeData.energyValue,
                                                  [key]: e.target.value
                                              }
                                          };
                                          setLocalCurrentUser({...localCurrentUser, intakeData})
                                      }}/>
                    </div>
                })}
            </div>
            <ActionButton onClick={onSaveUserDataClick} label={'Save data'}/>
        </div>
    </div>
};
export default UserPage;
