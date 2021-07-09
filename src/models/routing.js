import { createAction, handleActions } from 'redux-actions';
import { createContext, useContext } from 'react';

import history from 'store/history';

export const routeChange = createAction('ROUTE_LOCATION_CHANGE', location => location);

const reducer = {
	routing: handleActions(
		{
			ROUTE_LOCATION_CHANGE: (state, action) => ({
				...state,
				...action.payload,
			}),
		},
		{ ...history.location },
	),
};

export default { reducer };

export const HistoryContext = createContext({
	location: { pathname: '/' },
});

export const useHistory = () => useContext(HistoryContext);
