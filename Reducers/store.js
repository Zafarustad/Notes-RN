import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import dataReducer from './dataReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  data: dataReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleware)),
);

export default store;
