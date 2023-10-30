import { CREATE_ITEM, CREATE_ITEM_FAILED, CREATE_ITEM_SUCCESS } from "../actionTypes"
import { getItemUserData } from "./getItem"
import axiosInstance from "../../helper/axios-helper"

const createItem = (formData) => {
    return {
        type: CREATE_ITEM,
        payload: formData
    }
}

const createItemSuccess = (dataCreate) => {
    return {
        type: CREATE_ITEM_SUCCESS,
        payload: dataCreate
    }
}

const createItemFailed = (error) => {
    return {
        type: CREATE_ITEM_FAILED,
        payload: error
    }
}


export const createData = (formData) => {
    return async (dispatch) => {
        dispatch(createItem());
        try {
            const response = await axiosInstance.post('/create-item', formData);
            const dataCreate = response.data;
            dispatch(createItemSuccess(dataCreate));
            alert(dataCreate?.description)
            await dispatch(getItemUserData());
        } catch (error) {
            dispatch(createItemFailed(error.message));
        }
    };
};