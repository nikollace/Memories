
const initialState = {
    posts: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return {...state, posts: state.posts.concat(action.payload)};
        default:
            break;
    }
    return state;
};