import axiosApi from "../../axiosApi";


export const COMMENT_REQUEST = 'COMMENT_REQUEST';
export const COMMENT_SUCCESS = 'COMMENT_SUCCESS';
export const COMMENT_FAILURE = 'COMMENT_FAILURE';

export const GET_COMMENT_REQUEST = 'GET_COMMENT_REQUEST';
export const GET_COMMENT_SUCCESS = 'GET_COMMENT_SUCCESS';
export const GET_COMMENT_FAILURE = 'GET_COMMENT_FAILURE';

export const fetchCommentRequest = () => ({type: COMMENT_REQUEST});
export const fetchCommentSuccess = () => ({type: COMMENT_SUCCESS});
export const fetchCommentFailure = error => ({type: COMMENT_FAILURE, error});

export const getCommentRequest = () => ({type: GET_COMMENT_REQUEST});
export const getCommentSuccess = data => ({type: GET_COMMENT_SUCCESS, data});
export const getCommentFailure = error => ({type: GET_COMMENT_FAILURE, error});


export const postComment = (data) => {

    return async dispatch => {
        try {

            dispatch(fetchCommentRequest());
            await axiosApi.post('/comment', data);
            dispatch(fetchCommentSuccess());
            dispatch(getComment(data.recipe));
        } catch (e) {
            dispatch(fetchCommentFailure(e))
        }

    }
};

export const getComment = (id) => {
    return async dispatch => {
        try {
            dispatch(getCommentRequest());
            const response = await axiosApi.get('/comment/'+id);
            dispatch(getCommentSuccess(response.data))
        } catch (e) {
            dispatch(getCommentFailure(e))
        }
    }
};
export const deleteComment = (id,placeId) => {
    return async dispatch => {
        try {
            dispatch(fetchCommentRequest());
            await axiosApi.delete('/comment/'+id);
            dispatch(fetchCommentSuccess());
            dispatch(getComment(placeId))
        } catch (e) {
            dispatch(fetchCommentFailure(e))
        }
    }
};

