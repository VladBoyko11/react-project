import axios from "axios";
import { Brand } from "src/redux/types";

// const instance = axios.create({
//     baseURL: 'http://localhost:5000/'
// })

// const authInterceptor = (config: any) => {
//     config.headers.authorization = `Bearer ${sessionStorage.getItem('token')}`
//     return config
// }

// instance.interceptors.request.use(authInterceptor)

async function addBrand({name}: Brand) {
    return axios.post('/api/brand', {name})
}

test('the data is peanut butter', () => {
    return addBrand({name: 'brand'}).then(data => {
        console.log(data)
        expect(data).toBe('peanut butter');
    });
});