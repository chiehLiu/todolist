import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import mockStore from '../../src/models/__mocks__/store';

const createSnapshot = (name, story, redux) => {
	it(name, () => {
		if (redux) {
			const store = mockStore(redux.data);

			const { asFragment } = render(<Provider store={store}>{story}</Provider>);

			expect(asFragment()).toMatchSnapshot();
		} else {
			const { asFragment } = render(story);

			expect(asFragment()).toMatchSnapshot();
		}
	});
};

export const storiesOf = function storiesOf() {
	const api = {};
	let story;

	api.add = (name, func, { ignoreTest, redux } = { ignoreTest: false }) => {
		if (!ignoreTest) {
			story = func();
			createSnapshot(name, story, redux);
		} else {
			it(name, () => {});
		}
		return api;
	};

	api.addWithInfo = (name, func) => {
		story = func();
		createSnapshot(name, story);
		return api;
	};

	api.addDecorator = () => {};

	return api;
};
