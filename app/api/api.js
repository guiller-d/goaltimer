import { create } from 'apisauce';

const baseURL = create({ baseURL: 'http://192.168.1.33:8080/', method: "get", headers: { Accept: 'application/json' } });

export default {
    baseURL
}