import {
	useState,
	useEffect,
	useMemo,
	lazy,
	useRef,
	useCallback
} from 'react';
import UniversalRouter from 'universal-router';

import {
	routeChange
} from 'models/routing';

import useLocation from './useLocation';

const options = {
	baseUrl: './todolist',
	async resolveRoute(ctx) {
		const {
			route,
			next
		} = ctx;

		let children;

		if (typeof route.onEnter === 'function') {
			children = await route.onEnter(ctx);
		}

		// Do not Enter children
		if (children === false) {
			return null;
		}

		if (typeof children === 'undefined') {
			children = await next();
		}

		// Skip routes without render() function
		if (!route.render) {
			return null;
		}

		// Start downloading missing JavaScript chunks
		const components = route.components ?
			route.components().map(component => lazy(() => component)) :
			[];

		const result = await route.render(components, children);

		return result;
	},
	errorHandler(error, context) {
		console.info('errorHandler: ', error, context);
		return error.status === 404 ? '<h1>Page Not Found</h1>' : '<h1>Oops! Something went wrong</h1>';
	},
};

const useRouter = (routes, history, store) => {
	const location = useLocation(history);
	const router = useMemo(() => new UniversalRouter(routes, options), [routes]);
	const [Component, setComponent] = useState({
		loading: false,
		component: null
	});

	// Referrence the route index
	const lastIndex = useRef(0);

	const asyncLocationChange = useCallback(async () => {
		setComponent(prevComponent => ({
			...prevComponent,
			loading: true
		}));
		lastIndex.current += 1;

		// Use function scope to index current change route
		const index = lastIndex.current;

		const LazyComponent = await router.resolve({
			pathname: location.pathname,
			history,
			store,
		});

		// Detect the latest change index for prevent updating the wrong route view
		if (index === lastIndex.current) {
			setComponent({
				loading: false,
				component: LazyComponent
			});
		}
	}, [history, location.pathname, router, store]);

	useEffect(() => {
		asyncLocationChange();
	}, [asyncLocationChange]);

	useEffect(() => {
		store.dispatch(routeChange(location));
	}, [location]);

	return Component;
};

export default useRouter;
