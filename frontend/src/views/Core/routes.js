import React, { Fragment, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import DashboardLayout from "src/layouts/DashboardLayout";
import LoadingScreen from "src/components/LoadingScreen";
import AuthGuard from "src/components/AuthGuard";
import GuestGuard from "src/components/GuestGuard";
import { ROUTE_PATH } from "src/constants";

const routeViews = [
  {
    exact     : true,
    path      : ROUTE_PATH.UNKNOWN,
    component : lazy(() => import("src/views/NotFoundView"))
  },
  {
    exact     : true,
    path      : ROUTE_PATH.ROOT,
    component : () => <Redirect to={ROUTE_PATH.SIGN_IN} />
  },
  {
    exact     : true,
    path      : ROUTE_PATH.SIGN_IN,
    guard     : GuestGuard,
    component : lazy(() => import("src/views/SignInView"))
  },
  {
    exact     : true,
    path      : ROUTE_PATH.PASSWORD_FORGOT,
    guard     : GuestGuard,
    component : lazy(() => import("src/views/Password/ForgotView"))
  },
  {
    exact     : true,
    path      : `${ROUTE_PATH.PASSWORD_RESET}/:token`,
    component : lazy(() => import("src/views/Password/ResetView"))
  },
  {
    exact     : true,
    path      : ROUTE_PATH.PROFILE,
    guard     : AuthGuard,
    layout    : DashboardLayout,
    component : lazy(() => import("src/views/ProfileView"))
  },
  {
    exact     : true,
    path      : ROUTE_PATH.USERS_LIST,
    guard     : AuthGuard,
    layout    : DashboardLayout,
    component : lazy(() => import("src/views/User/ListView"))
  },
  {
    exact     : true,
    path      : `${ROUTE_PATH.USERS_EDIT}/:userId`,
    guard     : AuthGuard,
    layout    : DashboardLayout,
    component : lazy(() => import("src/views/User/EditView"))
  },
  {
    exact     : true,
    path      : ROUTE_PATH.USERS_CREATE,
    guard     : AuthGuard,
    layout    : DashboardLayout,
    component : lazy(() => import("src/views/User/CreateView"))
  },
];

const routes = (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routeViews.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={props => (
              <Guard>
                <Layout>
                  <Component {...props} />
                </Layout>
              </Guard>
            )}
          />
        );
      })}

      <Redirect path="*" to={ROUTE_PATH.UNKNOWN} />
    </Switch>
  </Suspense>

);

export default routes;
