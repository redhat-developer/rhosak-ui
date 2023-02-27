import type { VoidFunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";
import {
  ControlPlaneRoutes,
  DedicatedControlPlaneRoutes,
  DrawerProvider,
} from "./control-plane";
import {
  ControlPlaneRouteRoot,
  DedicatedControlPlaneRouteRoot,
} from "./control-plane/routesConsts";
import { DataPlaneRoutes } from "./data-plane";
import { DataPlaneRoutePath } from "./data-plane/routesConsts";
import { DefaultServiceRedirect } from "./DefaultServiceRedirect";
import { OverviewRoute } from "./overview";

export const Routes: VoidFunctionComponent = () => {
  return (
    <Switch>
      <Route path={"/overview"} exact>
        <OverviewRoute />
      </Route>
      <Route path={"/"} exact>
        <DefaultServiceRedirect />
      </Route>
      <Route path={ControlPlaneRouteRoot}>
        <DrawerProvider>
          {/* don't move these routes around! the order is important */}
          <ControlPlaneRoutes />
          <Route
            path={DataPlaneRoutePath(ControlPlaneRouteRoot)}
            render={({ match }) => (
              <DataPlaneRoutes
                root={DataPlaneRoutePath(ControlPlaneRouteRoot)}
                instanceId={match.params.id}
              />
            )}
          />
        </DrawerProvider>
      </Route>
      <Route path={DedicatedControlPlaneRouteRoot}>
        <DrawerProvider>
          {/* don't move these routes around! the order is important */}
          <DedicatedControlPlaneRoutes />
          <Route
            path={DataPlaneRoutePath(DedicatedControlPlaneRouteRoot)}
            render={({ match }) => (
              <DataPlaneRoutes
                root={DataPlaneRoutePath(DedicatedControlPlaneRouteRoot)}
                instanceId={match.params.id}
              />
            )}
          />
        </DrawerProvider>
      </Route>
      <Route path={""} exact></Route>
    </Switch>
  );
};
