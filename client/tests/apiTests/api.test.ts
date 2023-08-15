import {adminApi} from '../../src/API/API'
import {describe, expect, test} from '@jest/globals';
// const instance = axios.create({
//     baseURL: 'http://localhost:5000/'
// })

// const authInterceptor = (config: any) => {
//     config.headers.authorization = `Bearer ${sessionStorage.getItem('token')}`
//     return config
// }

// instance.interceptors.request.use(authInterceptor)

// async function addBrand({name}: Brand) {
//     return axios.post('/api/brand', {name})
// }

describe('sum module', () => {
    test('the data is peanut butter', async () => {
        const data = await adminApi.addBrand({ name: 'brand' });
        console.log(data);
        expect(data).toBe('peanut butter');
    });
})