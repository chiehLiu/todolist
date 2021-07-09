import React, { Suspense } from 'react';

import App from 'layouts/App';

import { HistoryContext } from 'models/routing';

import useRouter from 'util/hook/useRouter';

const Loading = () => <div>Loading...</div>;

const Router = ({ routes, history, store }) => {
	const { loading, component } = useRouter(routes, history, store);

	return (
		<HistoryContext.Provider value={history}>
			<App>{loading ? <Loading /> : <Suspense fallback={<Loading />}>{component}</Suspense>}</App>
		</HistoryContext.Provider>
	);
};

export default Router;
