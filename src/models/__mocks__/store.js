import configureMockStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk-fsa';

export default configureMockStore([thunkMiddleware, promiseMiddleware]);
