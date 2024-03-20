import axios from 'axios';
import {dishesEndpoint, mealsEndpoint, productsEndpoint, statsEndpoint, usersEndpoint, currencyEndpoint} from "./endpoints";
import {itemTypes} from "./itemTypes";
import {responses} from "../assets/stub/responses";

axios.defaults.withCredentials = true;

const isStubMode = process.env.API_MODE === 'stub';

// const dispatch = useDispatch();

// axios.interceptors.response.use(function (response) {
//     console.log('response interseptor!', response.data);
//     return response;
// }, function (error) {
//     console.log('error interseptor!', error);
//     return Promise.reject(error);
// });

const errorHandler = (error: any) => {
    let message = 'Error';
    if (error.message) {
        message = error.message;
    } else if (error.response.data && typeof error.response.data === 'string' && error.response.data[0] !== '<') {
        message = error.response.data;
    }
    error.message = {
        type: 'error',
        text: message
    };
    throw error;
};

const apiGetRequest = (url: string) => {
    if (isStubMode) {
        return Promise.resolve(responses[url].data || responses.error);
    }
    return new Promise((res, rej) => {
        if (isStubMode) {
            return Promise.resolve(responses[url] || responses.error);
        }
        return res(axios.get(url).then((data: any) => {
                // console.log(url, JSON.stringify(data));
                return Promise.resolve(data.data)
            }).catch(error => {
                errorHandler(error);
            })
        )
    });
};
const apiPostRequest = (url: string, data: any) => {
    if (isStubMode) {
        return Promise.resolve(responses[url].data || responses.error);
    }
    return axios.post(url, data).then((data: any) => {
        // console.log(url, JSON.stringify(data));
        return Promise.resolve(data.data)
    }).catch(error => {
        errorHandler(error);
    })
};
const apiPutRequest = (url: string, data: any) => {
    if (isStubMode) {
        return Promise.resolve(responses[url].data || responses.error);
    }
    // return new Promise((res, rej) => {
    // return res(setTimeout(() => {
    return axios.put(url, data).then((data: any) => {
        // console.log(url, JSON.stringify(data));
        console.log(url, data);
        return Promise.resolve(data.data)
    }).catch(error => {
        errorHandler(error);
        // }).catch((error)=>{
        //     errorHandler(error);
        // })
        // }, 1000));
    })
};
const apiDeleteRequest = (url: string, id: string = '') => {
    if (isStubMode) {
        return Promise.resolve(responses[url].data || responses.error);
    }
    return axios.delete(url + '/' + id).then((data: any) => {
        // console.log(url, JSON.stringify(data));
        return Promise.resolve(data.data)
    }).catch(error => {
        errorHandler(error);
    })
};

// currency
const getCurrencyRate = async (from: string): Promise<any> => {
    const url = `get_exchange_rate?from=${from}&to=USD`;
    return apiGetRequest(currencyEndpoint + url);
    const res = {
        "timestamp": 1709100991,
        "date": "2024-02-28",
        "from": "USD",
        "to": "UZS",
        "amount": 1,
        "value": 12522.52227663
    };
};
const getCurrenciesList = async (): Promise<any> => {
    const url = 'get_currencies_list';
    return apiGetRequest(currencyEndpoint + url);

    const res = [{
        code: "840",
        decimal_mark: ".",
        id: 147,
        name: "US Dollar",
        precision: 2,
        short_code: "USD",
        subunit: 100,
        symbol: "$",
        symbol_first: true,
        thousands_separator: ",",
    }]
};
const getCurrenciesListCurrent = async (): Promise<any> => {
    const url = 'get_currencies_list_current';
    return apiGetRequest(currencyEndpoint + url);
};

// users
const getUserData = () => {
    const url = usersEndpoint + 'get';
    return apiGetRequest(url);
};
const getAllUsers = () => {
    const url = usersEndpoint + 'get_all';
    return apiGetRequest(url);
};
const authorization = (data: any) => {
    const url = usersEndpoint + 'auth';
    return apiPostRequest(url, data);
};
const login = (data: any) => {
    const url = usersEndpoint + 'login';
    return apiPostRequest(url, data);
};
const logout = () => {
    const url = usersEndpoint + 'logout';
    return apiPostRequest(url, {});
};
const updateUserData = (newUser: any) => {
    const url = usersEndpoint + 'update';
    return apiPutRequest(url, newUser);
};
const deleteAllUsers = () => {
    const url = usersEndpoint + 'delete_all';
    return apiDeleteRequest(url);
};

const getEndpointByType = (itemType: string): string => {
    switch (itemType) {
        case itemTypes.PRODUCT:
            return productsEndpoint;
            break;
        case itemTypes.DISH:
            return dishesEndpoint;
            break;
        case itemTypes.MEAL:
            return mealsEndpoint;
            break;
    }
};

// common
const addItem = (item: any) => {
    const endpoint = getEndpointByType(item.type);
    return apiPostRequest(endpoint + 'add', {item});
};
const getItem = (itemId: string) => {
    const url = productsEndpoint + 'product/' + itemId;
    return apiGetRequest(url);
};
const getAllItems = () => {
    const url = productsEndpoint + 'get_all';
    return apiGetRequest(url);
};
const updateItem = (item: any) => {
    const url = productsEndpoint + 'update';
    return apiPutRequest(url, {item});
};
const removeItem = (id: string) => {
    const url = productsEndpoint + 'remove';
    return apiDeleteRequest(url, id);
};
const removeAllItems = () => {
    const url = productsEndpoint + 'remove_all';
    return apiDeleteRequest(url);
};

// Products
const addProduct = (product: any) => {
    const url = productsEndpoint + 'add';
    return apiPostRequest(url, {product});
};
const getProduct = (productId: string) => {
    const url = productsEndpoint + 'product/' + productId;
    return apiGetRequest(url);
};
const getAllProducts = () => {
    const url = productsEndpoint + 'get_all';
    return apiGetRequest(url);
};
const updateProduct = (product: any) => {
    const url = productsEndpoint + 'update';
    return apiPutRequest(url, {product});
};
const removeProduct = (id: string) => {
    const url = productsEndpoint + 'remove';
    return apiDeleteRequest(url, id);
};
const removeAllProducts = () => {
    const url = productsEndpoint + 'remove_all';
    return apiDeleteRequest(url);
};

// Dishes
const addDish = (dish: any) => {
    const url = dishesEndpoint + 'add';
    return apiPostRequest(url, {dish});
};
const getDish = (dishId: string) => {
    const url = dishesEndpoint + 'dish/' + dishId;
    return apiGetRequest(url);
};
const getAllDishes = () => {
    const url = dishesEndpoint + 'get_all';
    return apiGetRequest(url);
};
const updateDish = (dish: any) => {
    const url = dishesEndpoint + 'update';
    return apiPutRequest(url, {dish});
};
const removeDish = (id: string) => {
    const url = dishesEndpoint + 'remove';
    return apiDeleteRequest(url, id);
};
const removeAllDishes = () => {
    const url = dishesEndpoint + 'remove_all';
    return apiDeleteRequest(url);
};

// Meals
const addMeal = (meal: any) => {
    const url = mealsEndpoint + 'add';
    return apiPostRequest(url, {meal});
};
const getMeal = (mealId: string) => {
    const url = mealsEndpoint + 'meal/' + mealId;
    return apiGetRequest(url);
};
const getAllMeals = () => {
    const url = mealsEndpoint + 'get_all';
    return apiGetRequest(url);
};
// const getAllMealsForDay = (data: {date: Date}) => {
//     const url = mealsEndpoint + 'get_all';
//     return apiPostRequest(url);
// };
const updateMeal = (meal: any) => {
    const url = mealsEndpoint + 'update';
    return apiPutRequest(url, {meal});
};
const removeMeal = (id: string) => {
    const url = mealsEndpoint + 'remove';
    return apiDeleteRequest(url, id);
};
const removeAllMeals = () => {
    const url = mealsEndpoint + 'remove_all';
    return apiDeleteRequest(url);
};

// stats
const getAllStats = () => {
    const url = statsEndpoint + 'get_all';
    return apiGetRequest(url);
};
const getStatsForInterval = (data: any) => {
    const url = statsEndpoint + 'get_stat_for_interval';
    return apiPostRequest(url, data);
};
const getStatsForOneDay = (data: any) => {
    const url = statsEndpoint + 'get_stat_for_day';
    return apiPostRequest(url, data);
};

const getApiMethodsObject = (itemType: string) => {
    switch (itemType) {
        case itemTypes.PRODUCT:
            return {
                addItem: addProduct,
                getItem: getProduct,
                getAllItems: getAllProducts,
                updateItem: updateProduct,
                removeItem: removeProduct,
                removeAllItems: removeAllProducts,

            };
        case itemTypes.DISH:
            return {
                addItem: addDish,
                getItem: getDish,
                getAllItems: getAllDishes,
                updateItem: updateDish,
                removeItem: removeDish,
                removeAllItems: removeAllDishes,

            };
        case itemTypes.MEAL:
            return {
                addItem: addMeal,
                getItem: getMeal,
                getAllItems: getAllMeals,
                updateItem: updateMeal,
                removeItem: removeMeal,
                removeAllItems: removeAllMeals,

            };
    }
};

export default {

    // other
    getCurrenciesList,
    getCurrencyRate,
    getCurrenciesListCurrent,

    // users
    getUserData,
    getAllUsers,
    authorization,
    login,
    logout,
    updateUserData,
    deleteAllUsers,

    // common methods getter
    getApiMethodsObject,

    // common
    addItem,
    getItem,
    getAllItems,
    updateItem,
    removeItem,
    removeAllItems,

    // stats
    getAllStats,
    getStatsForInterval,
    getStatsForOneDay,
};