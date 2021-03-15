import * as api from '../api'

//Action Creators
//because we working with async data we need to dispatch action using redux thunk
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        console.log(data);
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error.message);
    }

    // const action = { type: 'FETCH_ALL', payload: data }

    // dispatch(action);
}

//async(dispatch) --this comes from redux thunk
export const createPost = (post) => async(dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}