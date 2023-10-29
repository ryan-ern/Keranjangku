import { REGISTER, REGISTER_FAILED, REGISTER_SUCCESS } from "../actionTypes"
import axiosInstance from "../../helper/axios-helper"

const register = (formData) => {
    return {
        type: REGISTER,
        payload: formData
    }
}

const registerSuccess = (dataRegister) => {
    return {
        type: REGISTER_SUCCESS,
        payload: dataRegister
    }
}

const registerFailed = (error) => {
    return {
        type: REGISTER_FAILED,
        payload: error
    }
}


export const registerData = (formData) => {
    return async (dispatch) => {
        dispatch(register());
        try {
            const response = await axiosInstance.post('/register', formData);
            const dataRegister = response.data;
            dispatch(registerSuccess(dataRegister));
        } catch (error) {
            dispatch(registerFailed(error.message));
        }
    };
};