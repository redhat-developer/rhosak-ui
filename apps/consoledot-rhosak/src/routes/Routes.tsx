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

export const Routes: VoidFunctionComponent = () => {
  return (
    <Switch>
      <Redirect from={"/"} to={"/kafkas"} exact />
      <Route path={"/kafkas"}>
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
