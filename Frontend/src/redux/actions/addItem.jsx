import { ADD_ITEM, ADD_ITEM_FAILED, ADD_ITEM_SUCCESS } from "../actionTypes"
import { getItemData } from "./getItem"
import axiosInstance from "../../helper/axios-helper"

const addItem = (formData) => {
    return {
        type: ADD_ITEM,
        payload: formData
    }
}

const addItemSuccess = (dataAdd) => {
    return {
        type: ADD_ITEM_SUCCESS,
        payload: dataAdd
    }
}

const addItemFailed = (error) => {
    return {
        type: ADD_ITEM_FAILED,
        payload: error
    }
}


export const addData = (formData) => {
    return async (dispatch) => {
        dispatch(addItem());
        try {
            const response = await axiosInstance.post('/add-item', formData);
            const dataAdd = response.data;
            dispatch(addItemSuccess(dataAdd));
            alert(dataAdd?.description)
            await dispatch(getItemData());
        } catch (error) {
            dispatch(addItemFailed(error.message));
        }
    };
};