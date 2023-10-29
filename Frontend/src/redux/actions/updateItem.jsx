import axiosInstance from "../../helper/axios-helper"
import { UPDATE_ITEM, UPDATE_ITEM_FAILED, UPDATE_ITEM_SUCCESS } from "../actionTypes"
import { getItemUserData } from "./getItem"

const updateItem = () => {
    return {
        type: UPDATE_ITEM,
    }
}

const updateItemSuccess = () => {
    return {
        type: UPDATE_ITEM_SUCCESS,
    }
}

const updateItemFailed = (error) => {
    return {
        type: UPDATE_ITEM_FAILED,
        payload: error,
    }
}


export const updateData = (itemId, updateItemData) => {
    return async (dispatch) => {
        dispatch(updateItem());
        try {
            await axiosInstance.put(`/item-user/${itemId}/update`, updateItemData);
            dispatch(updateItemSuccess());
            dispatch(getItemUserData());
        } catch (error) {
            dispatch(updateItemFailed(error.message));
        }
    };
};