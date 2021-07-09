import { combineReducers } from 'redux';

import routing from './routing';
import members from './member';
import blogs from './blog';

const reducers = combineReducers({
	...routing.reducer,
	...members.reducer,
	...blogs.reducer,
});

export default reducers;
