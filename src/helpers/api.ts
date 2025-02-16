import axios from 'axios';
import { getQuery } from './url';

const baseUrl = 'https://fakestoreapi.com/';

export const getProductList = async () =>{
    const category = getQuery("category");
    if(category) {
        return axios.get(`${baseUrl}products/category/${category}?limit=20`);
    } else {
        return axios.get(`${baseUrl}products?limit=20`);
    }
}

export const getAllCategories = () =>{
    return axios.get(`${baseUrl}products/categories`);
}

export const getProductDetail =async (productId:number) =>{
    return axios.get(`${baseUrl}products/${productId}`);
}
