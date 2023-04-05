import type { VoidFunctionComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ControlPlaneRoutes, DrawerProvider } from "./control-plane";
import { DedicatedClustersRoute } from "./control-plane/routes/DedicatedClustersRoute";
import {
  ControlPlaneClustersPath,
  ControlPlaneRoutePath,
  ControlPlaneRouteRoot,
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
        <Redirect to={ControlPlaneRoutePath} />
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

      <Route path={ControlPlaneClustersPath}>
        <DedicatedClustersRoute
          instancesHref={ControlPlaneRoutePath}
          clustersHref={ControlPlaneClustersPath}
        />
      </Route>
    </Switch>
  );
};
