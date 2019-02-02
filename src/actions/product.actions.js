import { Api } from "../utils"

export const PRODUCTS_REQUESTED = 'PRODUCTS_REQUESTED'
export const productsRequested = () => ({
    type: PRODUCTS_REQUESTED,
})

export const PRODUCTS_SUCCESS = 'PRODUCTS_SUCCESS'
export const productsSuccess = (items) => ({
    type: PRODUCTS_SUCCESS,
    items
})

export const PRODUCTS_ERROR = 'PRODUCTS_ERROR'
export const productsError = (error) => ({
    type: PRODUCTS_ERROR,
    error
})

export const fetchProducts = () => dispatch => {
    return Api.get('products/')
    .then(items => dispatch(productsSuccess(items)))
    .catch(error => dispatch(productsError(error)))
}