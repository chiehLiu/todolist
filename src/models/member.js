import { createAction, handleActions } from 'redux-actions';
import { useRedux } from 'util/hook/redux';

import { wrapFetch } from 'util/api';

export const getMembers = createAction('GET_MEMBERS', async () => {
	try {
		const data = await wrapFetch('avatar/apo/25sproutMember.php');
		return data;
	} catch (error) {
		return { staffs: '' };
	}
});

export const cleanMembers = createAction('CLEAN_MEMBERS');

const reducer = {
	members: handleActions(
		{
			GET_MEMBERS_PENDING: state => ({
				...state,
				loading: true,
			}),

			GET_MEMBERS_FULFILLED: (state, action) => ({
				...state,
				staffs: action.payload.staffs,
				loading: false,
			}),

			CLEAN_MEMBERS: state => ({
				...state,
				staffs: {},
			}),
		},
		{
			loading: false,
			staffs: {},
		},
	),
};

const mapHooksToState = state => ({
	members: state.members.staffs,
});

export const useMember = () => useRedux(mapHooksToState, { getMembers, cleanMembers });

export default { reducer };
