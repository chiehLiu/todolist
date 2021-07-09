import {
	createAction,
	handleActions
} from 'redux-actions';
import {
	useRedux
} from 'util/hook/redux';

export const getBlogs = createAction('GET_BLOGS');

export const cleanBlogs = createAction('CLEAN_BLOGS');

const reducer = {
	blogs: handleActions({
		GET_BLOGS_PENDING: state => ({
			...state,
			loading: true,
		}),

		GET_BLOGS_FULFILLED: (state, action) => ({
			...state,
			posts: action.payload.list,
			loading: false,
		}),

		CLEAN_BLOGS: state => ({
			...state,
			posts: [],
		}),
	}, {
		loading: false,
		posts: [],
	}, ),
};

const mapHooksToState = state => ({
	posts: state.blogs.posts,
});

export const useTodo = () => useRedux(mapHooksToState, {
	getBlogs,
	cleanBlogs
});

export default {
	reducer
};
