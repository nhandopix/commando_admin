import React, { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Loader, ErrorBoundary } from './components';

const Dashboard = lazy(() => import('./containers/Dashboard/views/Dashboard'));

const publicRoutes = [
  {
    path: '/login',
    exact: true,
    component: lazy(() => import('./features/login/views/LoginPage'))
  }
];


function PrivateRoute({ children, ...rest }) {
  const { isOAuth } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(routeProps) => isOAuth ? (
        children
      ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: routeProps.location }
            }}
          />
        )}
    />
  );
}

export default function Routes() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Switch>
          {/* Public routes */}
          {
            publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact}>
                <route.component />
              </Route>
            ))
          }

          {/* Private route */}
          <PrivateRoute path="/">
            <Dashboard />
          </PrivateRoute>
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
}