import { DELETE_ITEM, DELETE_ITEM_FAILED, DELETE_ITEM_SUCCESS } from "../actionTypes"
import axiosInstance from "../../helper/axios-helper"
import { getItemUserData } from "./getItem"

const deleteItem = () => {
    return {
        type: DELETE_ITEM,
    }
}

const deleteItemSuccess = () => {
    return {
        type: DELETE_ITEM_SUCCESS,
    }
}

const deleteItemFailed = (error) => {
    return {
        type: DELETE_ITEM_FAILED,
        payload: error,
    }
}


export const deleteData = (itemId) => {
    return async (dispatch) => {
        dispatch(deleteItem());
        try {
            await axiosInstance.delete(`/item-user/${itemId}/delete`);
            dispatch(deleteItemSuccess());
            dispatch(getItemUserData());
        } catch (error) {
            dispatch(deleteItemFailed(error.message));
        }
    };
};