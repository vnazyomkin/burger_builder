import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-53654.firebaseio.com/',
});

export default instance;