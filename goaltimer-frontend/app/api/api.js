import { create } from 'apisauce';

const baseURL = create({ baseURL: 'http:8080/', method: "get", headers: { Accept: 'application/json' } });

export default {
    baseURL
}