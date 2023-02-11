import axios from 'axios';

let BaseApi = axios.create({
    baseURL : 'https://mytest.aslu2183.info/api',
    
})
let Axios = function () {
    BaseApi.defaults.headers.common['Accept'] = 'application/json';
    return BaseApi    
}

export default Axios;