import { LOGIN, LOGIN_FAILED, LOGIN_SUCCESS } from "../actionTypes"
import axiosInstance from "../../helper/axios-helper"
import { getAuthInfo } from "./Auth"


const login = (formData, navigate) => {
    return {
        type: LOGIN,
        payload: {formData, navigate}
    }
}

const loginSuccess = (dataLogin) => {
    return {
        type: LOGIN_SUCCESS,
        payload: dataLogin
    }
}

const loginFailed = (error) => {
    return {
        type: LOGIN_FAILED,
        payload: error
    }
}

export const loginData = ({ formData, navigate }) => {
    return async (dispatch) => {
        dispatch(login());
        try {
            const response = await axiosInstance.post('/login', formData);
            const dataLogin = response.data;
            if (dataLogin.message === "ok") {
                localStorage.setItem('token', dataLogin.token);
                dispatch(loginSuccess(dataLogin));
                dispatch(getAuthInfo());
                navigate('/panel');
            } else {
                dispatch(loginSuccess(dataLogin));
            }
        } catch (error) {
            dispatch(loginFailed(error.message));
        }
    };
};
