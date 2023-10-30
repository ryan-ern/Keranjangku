import { GET_CART, GET_CART_FAILED, GET_CART_SUCCESS } from "../actionTypes"
import axiosInstance from "../../helper/axios-helper"

const getCart = () => {
    return {
        type: GET_CART,
    }
}

const getCartSuccess = (dataCart) => {
    return {
        type: GET_CART_SUCCESS,
        payload: dataCart
    }
}

const getCartFailed = () => {
    return {
        type: GET_CART_FAILED,
    }
}


export const getCartData = () => {
    return async (dispatch) => {
        dispatch(getCart());
        try {
            const response = await axiosInstance.get('/get-cart');
            const dataCart = response.data;
            await dispatch(getCartSuccess(dataCart));
        } catch (error) {
            dispatch(getCartFailed(error.message));
        }
    };
};