import React from 'react';
import { getMembers, cleanMembers } from 'models/member';

export const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

export default {
	path: '/members',
	components: () => [import(/* webpackChunkName: 'members' */ './component')],
	render: ([Members]) => <Members />,
	onEnter: async ({ store }) => {
		console.log('on Enter member');
		await store.dispatch(cleanMembers());
		await store.dispatch(getMembers());
		console.log('on Enter member / end');
		await sleep(5000);
	},
};
