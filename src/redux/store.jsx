//store.jsx
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer'; // You need to create your reducers
import thunk from 'redux-thunk'
import logger from 'redux-logger'

// Create a middleware array with thunk and logger
const middlewares = [thunk, logger];
// const middlewares = [thunk];

// Apply the middlewares to the store
const store = createStore(rootReducer, applyMiddleware(...middlewares));
//const store = createStore(rootReducer);

export default store;