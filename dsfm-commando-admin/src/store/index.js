import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import createRootReducer from './rootReducer';
import rootSaga from './rootSaga';


export default function configureStore(initialState = {}, history) {
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  let composeEnhancers = compose;

  if (process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }

  const sagaMiddleware = createSagaMiddleware();
  const logger = createLogger();

  // Create the store with three midldlewares
  // 1. thunk: Makes redux-thunk work
  // 2. sagaMiddleware: Makes redux-sagas work
  // 3. routerMiddleware: Syncs the location/URL path to the state
  // 4. logger: Makes redux-logger work
  const middlewares = [thunk, sagaMiddleware, routerMiddleware(history), logger];

  const enhancers = [applyMiddleware(...middlewares)]; // Spread in function

  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(...enhancers)
  );

  sagaMiddleware.run(rootSaga);

  return store;
}