import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';
import {toast} from 'react-toastify';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';

export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

export const PUT_USER_SUCCESS = 'PUT_USER_SUCCESS';

export const ONE_USER_GET_SUCCESS ='ONE_USER_GET_SUCCESS';

export const oneGetUserSuccess = data =>({type: ONE_USER_GET_SUCCESS,data});

export const putUserSuccess = () =>({type:PUT_USER_SUCCESS});

export const registerUserRequest = () => ({type: REGISTER_USER_REQUEST});
export const registerUserSuccess = () => ({type: REGISTER_USER_SUCCESS});
export const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, error});

export const getUsersRequest = () => ({type: GET_USERS_REQUEST});
export const getUsersSuccess = (data) => ({type: GET_USERS_SUCCESS,data});
export const getUsersFailure = error => ({type: GET_USERS_FAILURE, error});

export const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});

export const registerUser = userData => {
    return async dispatch => {
        try {
            dispatch(registerUserRequest());
            await axiosApi.post('/users', userData);
            dispatch(registerUserSuccess());
            toast.success('Вы успешно зарегистрировались');
            dispatch(push('/'));
        } catch (error) {
            if (error.response) {
                dispatch(registerUserFailure(error.response.data));
            } else {
                dispatch(registerUserFailure({global: 'Network error or no internet'}));
            }
        }
    }
};

export const loginUser = userData => {
    return async dispatch => {
        try {
            dispatch(loginUserRequest());
            const response = await axiosApi.post('/users/sessions', userData);
            dispatch(loginUserSuccess(response.data));
            dispatch(push('/'));
        } catch (error) {
            dispatch(loginUserFailure(error.response.data));
        }
    }
};


export const logoutUser = () => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const headers = {'Authorization': 'Token ' + token};

        await axiosApi.delete('/users/sessions', {headers});

        dispatch(logoutUserSuccess());
        dispatch(push('/'));
    };
};

 export const getUsers = () => {
    return async dispatch => {
        try{
            dispatch(getUsersRequest());
            const response = await axiosApi.get('/users');
            dispatch(getUsersSuccess(response.data))
        }catch (e) {
            dispatch(getUsersFailure(e))
        }
    };
};
 export const getOneUser =id=>{
     return async dispatch=>{
        try{
            dispatch(getUsersRequest());
            const response = await axiosApi.get('/users/'+id);
            dispatch(oneGetUserSuccess(response.data))
        }catch (e) {
            dispatch(getUsersFailure(e))
        }
     }
 };

export const userEdit =(id,data)=>{
    return async dispatch=>{
        try{
            dispatch(getUsersRequest());
            await axiosApi.put('/users/'+id,data);
            dispatch(putUserSuccess())
            toast.success('Отредактировано');
            dispatch(push('/userList'));
        }catch (e) {
            dispatch(getUsersFailure(e))
        }

    }
};
export const removeUser =(id)=>{
    return async dispatch =>{
        try{
            dispatch(getUsersRequest());
            await axiosApi.delete('/users/'+id);
            dispatch(putUserSuccess());
            toast.success('Удалено');
            dispatch(push('/userList'));
        }catch (e) {

            dispatch(getUsersFailure(e))
        }

    }
};