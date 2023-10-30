import {
    REGISTER, REGISTER_SUCCESS, REGISTER_FAILED,
    LOGIN, LOGIN_SUCCESS, LOGIN_FAILED,
    GET_AUTH_INFO, GET_AUTH_INFO_SUCCESS, GET_AUTH_INFO_401,
    LOGOUT, LOGOUT_SUCCESS,
    GET_ITEM_USER, GET_ITEM_USER_SUCCESS, GET_ITEM_USER_FAILED,
    GET_ITEM, GET_ITEM_SUCCESS, GET_ITEM_FAILED,
    CREATE_ITEM, CREATE_ITEM_SUCCESS, CREATE_ITEM_FAILED,
    DELETE_ITEM, DELETE_ITEM_SUCCESS, DELETE_ITEM_FAILED,
    UPDATE_ITEM, UPDATE_ITEM_SUCCESS, UPDATE_ITEM_FAILED,
    GET_DETAIL_ITEM, GET_DETAIL_ITEM_SUCCESS, GET_DETAIL_ITEM_FAILED,
    ADD_ITEM, ADD_ITEM_SUCCESS, ADD_ITEM_FAILED, GET_CART, GET_CART_SUCCESS, GET_CART_FAILED
} from "./actionTypes";

const initialState = {
    loading: false,
    dataRegister: [],
    dataLogin: [],
    dataAuth: {
        isLogin: false,
    },
    dataItemUser: [],
    dataItem: [],
    dataCreate: [],
    dataDetail: [],
    dataDelete:[],
    dataAdd:[],
    dataCart:[],
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
            ...state,
            dataLogin: action.payload,
            dataAuth: {
                isLogin: true,
            },
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
            ...state,
            dataAuth: action.payload,
        };
    case GET_AUTH_INFO_401:
        return {
            ...state ,
            loading: false,
            error: action.payload,
            dataAuth: {
                isLogin: false,
            },
        };
    case LOGOUT:
        break
    case LOGOUT_SUCCESS:
        return{
            ...state,
            dataAuth: {
                isLogin: false,
            },
        }
    case GET_ITEM_USER:
        return {
            ...state,
        }
    case GET_ITEM_USER_SUCCESS:
        return {
            loading: false,
            dataItemUser: action.payload,
            dataAuth: {
                isLogin: true,
            },
        }
    case GET_ITEM_USER_FAILED:
        return {
            error: action.payload,
        }
    case GET_ITEM:
        return {
            ...state,
        }
    case GET_ITEM_SUCCESS:
        return {
            loading: false,
            dataItem: action.payload,
            dataAuth: {
                isLogin: true,
            },
        }
    case GET_ITEM_FAILED:
        return {
            error: action.payload,
        }
    case CREATE_ITEM:
        return {
            ...state,
        }
    case CREATE_ITEM_SUCCESS:
        return {
            dataCreate: action.payload,
            dataAuth: {
                isLogin: true,
            },
        }
    case CREATE_ITEM_FAILED:
        return {
            error: action.payload,
        }
    case DELETE_ITEM:
        return {
            ...state
        }
    case DELETE_ITEM_SUCCESS:
        return {
            ...state,
            dataDelete: action.payload
        }
    case DELETE_ITEM_FAILED:
        return {
            error: action.payload
        }
    case UPDATE_ITEM:
        return {
            ...state
        }
    case UPDATE_ITEM_SUCCESS:
        return {
            ...state
        }
    case UPDATE_ITEM_FAILED:
        return {
            error: action.payload
        }
    case GET_DETAIL_ITEM:
        return {
            ...state
        }
    case GET_DETAIL_ITEM_SUCCESS:
        return {
            ...state,
            dataDetail: action.payload
        }
    case GET_DETAIL_ITEM_FAILED:
        return {
            error: action.payload
        }
    case ADD_ITEM:
        return {
            ...state
        }
    case ADD_ITEM_SUCCESS:
        return {
            ...state,
            dataAdd: action.payload
        }
    case ADD_ITEM_FAILED:
        return {
            error: action.payload
        }
    case GET_CART:
        return {
            ...state
        }
    case GET_CART_SUCCESS:
        return {
            ...state,
            dataCart: action.payload
        }
    case GET_CART_FAILED:
        return {
            error: action.payload
        }
    default:
        return state;
    }
};

export default reducer;