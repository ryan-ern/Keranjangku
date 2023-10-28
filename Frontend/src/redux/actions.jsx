import {
    REGISTER, REGISTER_SUCCESS, REGISTER_FAILED,
    LOGIN, LOGIN_SUCCESS, LOGIN_FAILED,
    GET_AUTH_INFO, GET_AUTH_INFO_SUCCESS, GET_AUTH_INFO_401, LOGOUT, LOGOUT_SUCCESS,
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

export const logout = (navigate) => ({
    type: LOGOUT,
    payload: { navigate },
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
    payload: {},
});


export const registerData = (formData) => {
    return (dispatch) => {
        dispatch(register());
        axios
            .post(`${baseURL}/register`, formData,
                { headers: headers})
            .then((response) => {
                const dataRegister = response.data;
                dispatch(registerSuccess(dataRegister))
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
                const dataLogin = response.data;
                console.log(dataLogin)
                if(dataLogin.message=="ok"){
                    localStorage.setItem('token', dataLogin.token);
                    dispatch(loginSuccess(dataLogin))
                    axios.defaults.headers.common.Authorization = `Bearer ${dataLogin.token}`;
                    dispatch(getAuthInfo())
                    navigate('/panel');
                }
                else {
                    dispatch(loginSuccess(dataLogin))
                }
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
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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

export const logoutData = ( navigate ) => {
    return (dispatch) => {
        dispatch(logout());
        axios
            .delete(`${baseURL}/logout`,
                { headers: headers})
            .then((response) => {
                console.log(response)
                const clearToken = response.headers['clear-token'];
                if (clearToken === 'true') {
                    localStorage.clear();
                }
                dispatch(logoutSuccess())
                navigate('/login');
            })
    }
}
