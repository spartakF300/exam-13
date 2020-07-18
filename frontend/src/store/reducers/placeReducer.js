import {
    GET_PLACE_FAILURE,
    GET_PLACE_REQUEST,
    GET_PLACE_SUCCESS,
    GET_PLACES_SUCCESS,
    PLACE_FAILURE,
    PLACE_REQUEST,
    PLACE_SUCCESS,
    PUT_PLACE_FAILURE,
    PUT_PLACE_REQUEST,
    PUT_PLACE_SUCCESS
} from "../actions/placeAction";

const initialState = {
   places:[],
   place:{},
   error:null,
   loading:false
 };

const placeReducer =(state= initialState, action)=>{

    switch (action.type) {
        case PLACE_REQUEST:
            return{...state, loading: true};
        case PLACE_SUCCESS:
            return {...state,loading:false};
        case PLACE_FAILURE:
            return {...state, loading:false, error: action.error};
        case GET_PLACE_REQUEST:
            return {...state,loading: true};
        case GET_PLACE_SUCCESS:
            return {...state, loading: false,place: action.data};
        case GET_PLACE_FAILURE:
            return {...state, loading: false, error: action.error};
        case PUT_PLACE_REQUEST:
            return{...state, loading: true};
        case PUT_PLACE_SUCCESS:
            return {...state,loading:false};
        case PUT_PLACE_FAILURE:
            return {...state, loading:false, error: action.error};
        case GET_PLACES_SUCCESS:
            return {...state,places:action.data,loading: false};

        default: return  state

    }

};

export default placeReducer;