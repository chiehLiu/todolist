import React from 'react';
import { getBlogs } from 'models/blog';

export default {
	path: '/blogs',
	components: () => [import(/* webpackChunkName: 'blogs' */ './component')],
	render: ([Blogs]) => <Blogs />,
	onEnter: async ({ store }) => {
		console.log('on Enter blog');
		await store.dispatch(getBlogs());
		console.log('on Enter blog / end');
	},
};
