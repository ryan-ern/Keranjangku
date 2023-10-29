import { GET_ITEM, GET_ITEM_FAILED, GET_ITEM_SUCCESS, GET_ITEM_USER, GET_ITEM_USER_FAILED, GET_ITEM_USER_SUCCESS } from "../actionTypes"
import axiosInstance from "../../helper/axios-helper"

/**
 * GET ITEM BERDASARAKN USER
*/
export const getItemUser = () => ({
    type: GET_ITEM_USER,
    payload: {},

})
export const getItemUserSuccess = (dataItemUser) => ({
    type: GET_ITEM_USER_SUCCESS,
    payload: {dataItemUser}
})

export const getItemUserFailed = () => ({
    type: GET_ITEM_USER_FAILED,
})

export const getItemUserData = () => {
    return (dispatch) => {
        dispatch(getItemUser());
        axiosInstance
            .get('/item-user')
            .then((response) => {
                const dataItemUser = response.data.data;
                dispatch(getItemUserSuccess(dataItemUser));
            })
            .catch((error) => {
                dispatch(getItemUserFailed(error.message))
            })
    }
}

/**
 * GET ALL ITEM
*/

export const getItem = () => ({
    type: GET_ITEM,
    payload: {},

})

export const getItemSuccess = (dataItem) => ({
    type: GET_ITEM_SUCCESS,
    payload: {dataItem}
})

export const getItemFailed = () => ({
    type: GET_ITEM_FAILED,
})


export const getItemData = () => {
    return async (dispatch) => {
        dispatch(getItem());
        try {
            const response = await axiosInstance.get('/items');
            const dataItem = response.data.data;
            dispatch(getItemSuccess(dataItem));
        } catch (error) {
            dispatch(getItemFailed(error.message));
        }
    };
};