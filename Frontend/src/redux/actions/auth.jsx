import { GET_AUTH_INFO, GET_AUTH_INFO_401, GET_AUTH_INFO_SUCCESS } from "../actionTypes";
import axiosInstance from "../../helper/axios-helper"

export const getAuthInfo = () => ({
    type: GET_AUTH_INFO,
    payload: { },
});

export const getAuthInfoSuccess = (dataAuth) => ({
    type: GET_AUTH_INFO_SUCCESS,
    payload: dataAuth,
});

export const getAuthInfo401 = () => ({
    type: GET_AUTH_INFO_401,
});

export const getAuth = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                dispatch(getAuthInfo401());
                return { isLogin: false };
            } else {
                const response = await axiosInstance.get('/auth-info');
                const dataAuth = response.data;
                dispatch(getAuthInfoSuccess(dataAuth));
                return { isLogin: true, data: dataAuth };
            }
        } catch (error) {
            dispatch(getAuthInfo401(error.message));
            localStorage.clear();
            return { isLogin: false, error: error.message };
        }
    };
};
