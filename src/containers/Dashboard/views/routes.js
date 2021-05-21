import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Loader } from '../../../components';


const ROUTES = {
  ADMIN: [
    // {
    //   path: '/',
    //   exact: true,
    //   component: lazy(() => import('../../BlankPage'))
    // },
    {
      path: '/mers',
      exact: true,
      component: lazy(() => import('../../../features/pgs/views/PGList'))
    },
    {
      path: '/mers/create',
      exact: true,
      component: lazy(() => import('../../../features/pgs/views/PGCreate'))
    },
    {
      path: '/mers/:id',
      component: lazy(() => import('../../../features/pgs/views/PGEdit'))
    },
    {
      path: '/stores',
      exact: true,
      component: lazy(() => import('../../../features/stores/views/StoreList'))
    },
    {
      path: '/stores/create',
      exact: true,
      component: lazy(() => import('../../../features/stores/views/StoreCreate'))
    },
    {
      path: '/stores/:id',
      component: lazy(() => import('../../../features/stores/views/StoreEdit'))
    },
    {
      path: '/plans',
      exact: true,
      component: lazy(() => import('../../../features/plans/views/PlanList'))
    },
    {
      path: '/plans/create',
      exact: true,
      component: lazy(() => import('../../../features/plans/views/PlanCreate'))
    },
    {
      path: '/plans/:id',
      component: lazy(() => import('../../../features/plans/views/PlanEdit'))
    },
    // {
    //   path: '/regions',
    //   exact: true,
    //   component: lazy(() => import('../../../features/regions/views/RegionList'))
    // },
    // {
    //   path: '/regions/create',
    //   exact: true,
    //   component: lazy(() => import('../../../features/regions/views/RegionCreate'))
    // },
    // {
    //   path: '/regions/:id',
    //   component: lazy(() => import('../../../features/regions/views/RegionEdit'))
    // },
    // {
    //   path: '/store-types',
    //   exact: true,
    //   component: lazy(() => import('../../../features/storeTypes/views/StoreTypeList'))
    // },
    // {
    //   path: '/store-types/create',
    //   exact: true,
    //   component: lazy(() => import('../../../features/storeTypes/views/StoreTypeCreate'))
    // },
    // {
    //   path: '/store-types/:id',
    //   component: lazy(() => import('../../../features/storeTypes/views/StoreTypeEdit'))
    // },
    // {
    //   path: '/zones',
    //   exact: true,
    //   component: lazy(() => import('../../../features/zones/views/ZoneList'))
    // },
    // {
    //   path: '/zones/create',
    //   exact: true,
    //   component: lazy(() => import('../../../features/zones/views/ZoneCreate'))
    // },
    // {
    //   path: '/zones/:id',
    //   component: lazy(() => import('../../../features/zones/views/ZoneEdit'))
    // },
    // {
    //   path: '/cities',
    //   exact: true,
    //   component: lazy(() => import('../../../features/cities/views/CityList'))
    // },
    // {
    //   path: '/cities/create',
    //   exact: true,
    //   component: lazy(() => import('../../../features/cities/views/CityCreate'))
    // },
    // {
    //   path: '/cities/:id',
    //   component: lazy(() => import('../../../features/cities/views/CityEdit'))
    // },
    // {
    //   path: '/charts',
    //   component: lazy(() => import('../../../features/dashboard/views/Chart'))
    // },
    // {
    //   path: '/kpi',
    //   exact: true,
    //   component: lazy(() => import('../../../features/kpi/views/KpiList'))
    // },
  ],
  GUEST: [
    //========== STORE
    {
      path: '/stores',
      exact: true,
      component: lazy(() => import('../../../features/stores/views/StoreList'))
    },
    {
      path: '/stores/:id',
      component: lazy(() => import('../../../features/stores/views/StoreEdit'))
    },
    //========== PLAN
    {
      path: '/plans',
      exact: true,
      component: lazy(() => import('../../../features/plans/views/PlanList'))
    },
    {
      path: '/plans/:id',
      component: lazy(() => import('../../../features/plans/views/PlanEdit'))
    },
  ],
  AUDITOR: [
    //========== PLAN
    {
      path: '/plans',
      exact: true,
      component: lazy(() => import('../../../features/plans/views/PlanList'))
    },
    {
      path: '/plans/:id',
      component: lazy(() => import('../../../features/plans/views/PlanEdit'))
    },
  ]
};

export default function AppRouter() {
  // const { url } = useRouteMatch();
  const { role } = useSelector((state) => state.auth.userInfo);
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {ROUTES[role].map((route, idx) => (
          <Route exact={route.exact} key={idx} path={route.path}>
            <route.component />
          </Route>
        ))}

        {/* Nếu sử dụng useRouteMatch ==> không cần / đầu */}
        {/* {routes.map((route, idx) => (
          <Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
            <route.component />
          </Route>
        ))} */}
      </Switch>
    </Suspense>
  );
}
