import {
    COMMENT_FAILURE,
    COMMENT_REQUEST,
    COMMENT_SUCCESS, GET_COMMENT_FAILURE,
    GET_COMMENT_REQUEST,
    GET_COMMENT_SUCCESS
} from "../actions/actionComment";

const initialState = {
    comments: [],
    error: null,
    loading: false
};
const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case COMMENT_REQUEST:
            return {...state, loading: true};
        case COMMENT_SUCCESS:
            return {...state, loading: false};
        case COMMENT_FAILURE:
            return {...state, loading: false, error: action.error};
        case GET_COMMENT_REQUEST:
            return {...state, loading: true};
        case GET_COMMENT_SUCCESS:
            return {...state, loading: false, comments: action.data};
        case GET_COMMENT_FAILURE:
            return {...state, loading: false, error: action.error};
        default:
            return state
    }
};
export default commentReducer;