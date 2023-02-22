import type { VoidFunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";
import {
  ControlPlaneRoutes,
  DedicatedControlPlaneRoutes,
  DrawerProvider,
} from "./control-plane";
import { DataPlaneRoutes, DedicatedDataPlaneRoutes } from "./data-plane";
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
      <Route path={"/kafkas"}>
        <DrawerProvider>
          {/* don't move these routes around! the order is important */}
          <ControlPlaneRoutes />
          <DataPlaneRoutes />
        </DrawerProvider>
      </Route>
      <Route path={"/dedicated"}>
        <DrawerProvider>
          {/* don't move these routes around! the order is important */}
          <DedicatedControlPlaneRoutes />
          <DedicatedDataPlaneRoutes />
        </DrawerProvider>
      </Route>
      <Route path={""} exact></Route>
    </Switch>
  );
};
