import { DELETE_ITEM, DELETE_ITEM_FAILED, DELETE_ITEM_SUCCESS } from "../actionTypes"
import axiosInstance from "../../helper/axios-helper"
import { getItemUserData } from "./getItem"

const deleteItem = () => {
    return {
        type: DELETE_ITEM,
    }
}

const deleteItemSuccess = (dataDelete) => {
    return {
        type: DELETE_ITEM_SUCCESS,
        payload: dataDelete,
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
            const data = await axiosInstance.delete(`/item-user/${itemId}/delete`);
            dispatch(deleteItemSuccess(data.data));
            alert(data?.data?.description)
            dispatch(getItemUserData());
        } catch (error) {
            dispatch(deleteItemFailed(error.message));
        }
    };
};