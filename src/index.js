import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import App from './app/views/App';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from './store';
import history from './utils/history';
import { handleCheckAuth } from './features/login/actions';
import { httpService } from './utils/axios';

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);

httpService.setupInterceptors(store);
store.dispatch(handleCheckAuth());

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
