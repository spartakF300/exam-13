import axiosApi from "../../axiosApi";
import {push} from "connected-react-router";
import {toast} from "react-toastify";

export const PLACE_REQUEST = 'PLACE_REQUEST';
export const PLACE_SUCCESS = 'PLACE_SUCCESS';
export const PLACE_FAILURE = 'PLACE_FAILURE';

export const GET_PLACE_REQUEST = 'GET_PLACE_REQUEST';
export const GET_PLACE_SUCCESS = 'GET_PLACE_SUCCESS';
export const GET_PLACE_FAILURE = 'GET_PLACE_FAILURE';


export const GET_PLACES_SUCCESS = 'GET_PLACES_SUCCESS';



export const PUT_PLACE_REQUEST = 'PUT_PLACE_REQUEST';
export const PUT_PLACE_SUCCESS = 'PUT_PLACE_SUCCESS';
export const PUT_PLACE_FAILURE = 'PUT_PLACE_FAILURE';

export const fetchPostPlace = () => ({type: PLACE_REQUEST});
export const fetchPostSuccess = () => ({type: PLACE_SUCCESS});
export const fetchPostFailure = error => ({type: PLACE_FAILURE, error});

export const getPlacesSuccess = (data) => ({type: GET_PLACES_SUCCESS,data});


export const getRequest = () => ({type: GET_PLACE_REQUEST});
export const getSuccess = data => ({type: GET_PLACE_SUCCESS, data});
export const getFailure = error => ({type: GET_PLACE_FAILURE, error});

export const putRequest = () => ({type: PUT_PLACE_REQUEST});
export const putSuccess = () => ({type: PUT_PLACE_SUCCESS});
export const putFailure = error => ({type: PUT_PLACE_FAILURE, error});


export const postPlace = (data) => {
    return async dispatch => {
        try {
            dispatch(fetchPostPlace());
            const response = await axiosApi.post('/place', data);
            dispatch(fetchPostSuccess());
            dispatch(push('/place/' + response.data._id))
            toast.success('Вы успешно добавили заведения');
        } catch (e) {
            dispatch(fetchPostFailure(e))
        }


    }
};

export const putPlace = (id, data) => {
    return async dispatch => {
        try {

            dispatch(putRequest());
            await axiosApi.put('/place/' + id, data);
            dispatch(putSuccess());
            dispatch(getPlace(id))
        } catch (e) {
            dispatch(putFailure(e))
        }
    }
};

export const getPlace = (id) => {
    return async dispatch => {
        try {
            dispatch(getRequest());
            const response = await axiosApi.get('/place/' + id);
            dispatch(getSuccess(response.data));

        } catch (e) {
            dispatch(getFailure(e))
        }


    }
};

export const getPlaces = () => {
    return async dispatch => {
        try {
            dispatch(getRequest());
            const response = await axiosApi.get('/place');
            dispatch(getPlacesSuccess(response.data));

        } catch (e) {
            dispatch(getFailure(e?.response ?? e))
        }


    }
};

export const deletePlaces = (id) => {
    return async dispatch => {
        try {
            dispatch(putRequest());
            await axiosApi.delete('/place/'+id);
            dispatch(putSuccess());
           dispatch(getPlaces())
        } catch (e) {
            dispatch(putFailure(e))
        }
    }
};