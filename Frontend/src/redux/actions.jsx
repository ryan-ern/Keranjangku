import {
    REGISTER, REGISTER_SUCCESS, REGISTER_FAILED,
    LOGIN, LOGIN_SUCCESS, LOGIN_FAILED,
    GET_AUTH_INFO, GET_AUTH_INFO_SUCCESS, GET_AUTH_INFO_401,
    // LOGOUT, LOGOUT_SUCCESS
} from "./actionTypes";
import axios from "axios";

const baseURL = "http://localhost:6543";
const headers = {
    "Content-Type": "application/x-www-form-urlencoded"
};

const register = (formData) => {
    return {
        type: REGISTER,
        payload: formData
    }
}

const registerSuccess = (data) => {
    return {
        type: REGISTER_SUCCESS,
        payload: data
    }
}

const registerFailed = (error) => {
    return {
        type: REGISTER_FAILED,
        payload: error
    }
}

const login = (formData, navigate) => {
    return {
        type: LOGIN,
        payload: {formData, navigate}
    }
}

const loginSuccess = (data) => {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
}

const loginFailed = (error) => {
    return {
        type: LOGIN_FAILED,
        payload: error
    }
}

export const getAuthInfo = () => ({
    type: GET_AUTH_INFO,
    payload: { },
});

export const getAuthInfoSuccess = (data) => ({
    type: GET_AUTH_INFO_SUCCESS,
    payload: data,
});

export const getAuthInfo401 = () => ({
    type: GET_AUTH_INFO_401,
});


export const registerData = (formData) => {
    return (dispatch) => {
        dispatch(register());
        axios
            .post(`${baseURL}/register`, formData,
                { headers: headers})
            .then((response) => {
                const data = response.data;
                dispatch(registerSuccess(data))
            })
            .catch((error) => {
                dispatch(registerFailed(error.message))
            })
    }
}

export const loginData = ({ formData, navigate }) => {
    return (dispatch) => {
        dispatch(login());
        axios
            .post(`${baseURL}/login`, formData,
                { headers: headers})
            .then((response) => {
                const data = response.data;
                localStorage.setItem('token', data.token);
                dispatch(loginSuccess(data))
                axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
                dispatch(getAuthInfo())
                navigate('/panel');
            })
            .catch((error) => {
                dispatch(loginFailed(error.message))
            })
    }
}

export const getAuth = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                dispatch(getAuthInfo401());
                return { isLogin: false };
            } else {
                const response = await axios.get(`${baseURL}/auth-info`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = response.data;
                dispatch(getAuthInfoSuccess(data));
                return { isLogin: true, data: data };
            }
        } catch (error) {
            dispatch(getAuthInfo401(error.message));
            localStorage.clear();
            return { isLogin: false, error: error.message };
        }
    };
};
