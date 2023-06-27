import axios from 'axios';

const endPointStub = '../assets/stub/';
const randomFaceUrl = 'thisPersondoesnotexist.com/image';
const chuckNorrisJokeUrl = 'https://api.chucknorris.io/jokes/random';
const dishLoggerApiUrl = 'https://dish-logger.onrender.com/api/users/get_all';
const dishLoggerApiUrlAuth = 'https://dish-logger.onrender.com/api/users/login';
const dishLoggerProducts = 'https://dish-logger.onrender.com/api/products/get_all';

const apiGetRequest = (url: string) => {
    return axios.get(url);
};

const getRandomFace = () => {
    return axios({
        method: 'GET',
        url: randomFaceUrl,
        responseType: 'stream'
    }).then(stream => {
//fs does not work on client-side
    })
};

const getRandomJoke = () => {
    return axios.get(chuckNorrisJokeUrl).then((data: any) => Promise.resolve(data.data.value));
};

const getUsers = () => {
    return axios.get(dishLoggerApiUrl).then((data: any) => Promise.resolve(data.data));
};

const authorization = (data: any) => {
    // const body = JSON.stringify(data);
    const body = data;
    return axios.post(dishLoggerApiUrlAuth, body).then((data: any) => Promise.resolve(data.data));
};
const getProducts = () => {
    // const body = JSON.stringify(data);
    const body = data;
    return axios.get(dishLoggerProducts).then((data: any) => Promise.resolve(data.data));
};

export default {
    getRandomJoke, getUsers, authorization
};