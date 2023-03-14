import type { VoidFunctionComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  ControlPlaneRoutes,
  DedicatedControlPlaneRoutes,
  DrawerProvider,
} from "./control-plane";
import { DedicatedClustersRoute } from "./control-plane/routes/DedicatedClustersRoute";
import {
  ControlPlaneRouteRoot,
  DedicatedControlPlaneClustersPath,
  DedicatedControlPlaneRoutePath,
  DedicatedControlPlaneRouteRoot,
} from "./control-plane/routesConsts";
import { DataPlaneRoutes } from "./data-plane";
import { DataPlaneRoutePath } from "./data-plane/routesConsts";
import { OverviewRoute } from "./overview";

export const Routes: VoidFunctionComponent = () => {
  return (
    <Switch>
      <Route path={"/overview"} exact>
        <OverviewRoute />
      </Route>
      <Route path={"/"} exact>
        <Redirect to={DedicatedControlPlaneRoutePath} />
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
                instancesHref={ControlPlaneRouteRoot}
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
            path={DataPlaneRoutePath(DedicatedControlPlaneRoutePath)}
            render={({ match }) => (
              <DataPlaneRoutes
                root={DataPlaneRoutePath(DedicatedControlPlaneRoutePath)}
                instancesHref={DedicatedControlPlaneRouteRoot}
                instanceId={match.params.id}
              />
            )}
          />
        </DrawerProvider>
      </Route>
      <Route path={DedicatedControlPlaneClustersPath}>
        <DedicatedClustersRoute
          instancesHref={DedicatedControlPlaneRoutePath}
          clustersHref={DedicatedControlPlaneClustersPath}
        />
      </Route>
    </Switch>
  );
};
