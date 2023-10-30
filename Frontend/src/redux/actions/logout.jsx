import { LOGOUT, LOGOUT_SUCCESS } from "../actionTypes";
import axiosInstance from "../../helper/axios-helper"

export const logout = (navigate) => ({
    type: LOGOUT,
    payload: { navigate },
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
    payload: {},
});

export const logoutData = (navigate) => {
    return async (dispatch) => {
        dispatch(logout());
        try {
            const response = await axiosInstance.delete('/logout');
            const clearToken = response.headers['clear-token'];
            if (clearToken === 'true') {
                localStorage.clear();
            }
            dispatch(logoutSuccess());
            navigate('/login');
        } catch (error) {
            alert(error);
        }
    };
};