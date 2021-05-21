import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import App from '../containers/Dashboard/reducers';

import auth from '../features/login/reducers';

import mer from '../features/pgs/reducers';
import store from '../features/stores/reducers';
import plan from '../features/plans/reducers';
import planData from '../features/plans/planDataReducers';

export default function createRootReducer(history) {
  const rootReducer = combineReducers({
    App,
    auth,
    mer,
    store,
    plan,
    planData,
    router: connectRouter(history),
  });

  return rootReducer;
}