// Externals - Others
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

// Internals - Others
import reducer from './reducer';
import middleware from './middleware';

const createStoreWithMiddleware = applyMiddleware(thunk, middleware)(createStore);

const store = createStoreWithMiddleware(reducer);

export default store;
