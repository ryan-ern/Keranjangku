import {
    REGISTER, REGISTER_SUCCESS, REGISTER_FAILED,
    LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, GET_AUTH_INFO, GET_AUTH_INFO_SUCCESS, GET_AUTH_INFO_401, LOGOUT, LOGOUT_SUCCESS
} from "./actionTypes";

const initialState = {
    loading: false,
    dataRegister: [],
    dataLogin: [],
    dataAuth:[],
    isLogin: false,
    error: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case REGISTER:
        return {
            ...state,
            loading: true
        };
    case REGISTER_SUCCESS:
        return {
            loading: false,
            dataRegister: action.payload,
        };
    case REGISTER_FAILED:
        return {
            loading: false,
            error: action.payload
        };
    case LOGIN:
        return {
            ...state,
            loading: true
        };
    case LOGIN_SUCCESS:
        return {
            dataLogin: action.payload,
            isLogin: true,
        };
    case LOGIN_FAILED:
        return {
            loading: false,
            error: action.payload,
            isLogin: false,
        };
    case GET_AUTH_INFO:
        return {
            ...state,
        };
    case GET_AUTH_INFO_SUCCESS:
        return {
            loading: false,
            dataAuth: action.payload,
            isLogin: true,
        };
    case GET_AUTH_INFO_401:
        return {
            ...initialState ,
            loading: false,
            error: action.payload,
            isLogin: false,
        };
    case LOGOUT:
        break
    case LOGOUT_SUCCESS:
        return{
            ...initialState,
            isLogin: false,
        }
    default:
        return state;
    }
};

export default reducer;