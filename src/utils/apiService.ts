import axios from 'axios';
import {usersEndpoint, productsEndpoint, dishesEndpoint, mealsEndpoint, statsEndpoint} from "./endpoints";
import {useDispatch} from "react-redux";
import {createAddMessageAction} from "./store/actionCreators";
import {useError} from "./hooks/useError";

axios.defaults.withCredentials = true;

// const dispatch = useDispatch();


const apiGetRequest = (url: string) => {
    // const showToast = useError();
    // return axios.get(url).then((data: any) => Promise.resolve(data.data)).catch(error => {
    //     return {
    //         message: 'Database error',
    //         stack: error.message
    //     }
    // });
    return new Promise((res, rej) => {
        setTimeout(() => {
            return res(axios.get(url).then((data: any) => {
                return Promise.resolve(data.data)
            }).catch(error => {
                return error.response.data || {
                    message: {
                        type: 'error',
                        text: error.message
                    }
                };
            }))
        }, 1000)
    });
};
const apiPostRequest = (url: string, data: any) => {
    return axios.post(url, data).then((data: any) => {
        console.log(data);

        return Promise.resolve(data.data)
    }).catch(error => {
        return error.response.data || {
            message: {
                type: 'error',
                text: error.message
            }
        };
    })
};
const apiPutRequest = (url: string, data: any) => {
    return new Promise((res, rej) => {
        return res(setTimeout(() => {
            return axios.put(url, data).then((data: any) => Promise.resolve(data.data)).catch(error => {
                return error.response.data || {
                    message: {
                        type: 'error',
                        text: error.message
                    }
                };
            })
        }, 1000));
    })
};
const apiDeleteRequest = (url: string, data?: any) => {
    return axios.delete(url, data).then((data: any) => Promise.resolve(data.data)).catch(error => {
        return error.response.data || {
            message: {
                type: 'error',
                text: error.message
            }
        };
    })
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
const updateUserData = (data: any) => {
    const url = usersEndpoint + 'update';
    return apiPutRequest(url, data);
};
const deleteAllUsers = () => {
    const url = usersEndpoint + 'delete_all';
    return apiDeleteRequest(url);
};

// products
const addProduct = (data: any) => {
    const url = productsEndpoint + 'add';
    return apiPostRequest(url, data);
};
const getProduct = (productId: string) => {
    const url = productsEndpoint + 'product/' + productId;
    return apiGetRequest(url);
};
const getAllProducts = () => {
    const url = productsEndpoint + 'get_all';
    return apiGetRequest(url);
};
const updateProduct = (data: any) => {
    const url = productsEndpoint + 'update';
    return apiPutRequest(url, data);
};
const removeProduct = (data: any) => {
    const url = productsEndpoint + 'remove';
    return apiDeleteRequest(url, data);
};
const removeAllProducts = () => {
    const url = productsEndpoint + 'remove_all';
    return apiDeleteRequest(url);
};

// dishes
const addDish = (data: any) => {
    const url = dishesEndpoint + 'add';
    return apiPostRequest(url, data);
};
const getDish = (dishId: string) => {
    const url = dishesEndpoint + 'dish/' + dishId;
    return apiGetRequest(url);
};
const getAllDishes = () => {
    const url = dishesEndpoint + 'get_all';
    return apiGetRequest(url);
};
const updateDish = (data: any) => {
    const url = dishesEndpoint + 'update';
    return apiPutRequest(url, data);
};
const removeDish = (data: any) => {
    const url = dishesEndpoint + 'remove';
    return apiDeleteRequest(url, data);
};
const removeAllDishes = () => {
    const url = dishesEndpoint + 'remove_all';
    return apiDeleteRequest(url);
};

// meals
const addMeal = (data: any) => {
    const url = mealsEndpoint + 'add';
    return apiPostRequest(url, data);
};
const getMeal = (mealId: string) => {
    const url = mealsEndpoint + 'meal/' + mealId;
    return apiGetRequest(url);
};
const getAllMeals = () => {
    const url = mealsEndpoint + 'get_all';
    return apiGetRequest(url);
};
const updateMeal = (data: any) => {
    const url = mealsEndpoint + 'update';
    return apiPutRequest(url, data);
};
const removeMeal = (data: any) => {
    const url = mealsEndpoint + 'remove';
    return apiDeleteRequest(url, data);
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

export default {

    // users
    getUserData,
    getAllUsers,
    authorization,
    login,
    logout,
    updateUserData,
    deleteAllUsers,

    // products
    addProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    removeProduct,
    removeAllProducts,

    // dishes
    addDish,
    getDish,
    getAllDishes,
    updateDish,
    removeDish,
    removeAllDishes,

    // meals
    addMeal,
    getMeal,
    getAllMeals,
    updateMeal,
    removeMeal,
    removeAllMeals,

    // stats
    getAllStats,
    getStatsForInterval,
    getStatsForOneDay,
};