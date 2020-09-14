import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-a6f08.firebaseio.com/'
});

export default instance;