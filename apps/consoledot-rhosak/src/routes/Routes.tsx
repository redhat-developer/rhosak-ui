import type { VoidFunctionComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  ControlPlaneRoutes,
  DedicatedControlPlaneRoutes,
  DrawerProvider,
} from "./control-plane";
import { DataPlaneRoutes, DedicatedDataPlaneRoutes } from "./data-plane";
import { DedicatedUsersGate } from "./DedicatedUsersGate";
import { OverviewRoute } from "./overview";
import { StandardUsersGate } from "./StandardUsersGate";

export const Routes: VoidFunctionComponent = () => {
  return (
    <Switch>
      <Route path={"/overview"} exact>
        <OverviewRoute />
      </Route>
      <Redirect from={"/"} to={"/kafkas"} exact />
      <Route path={"/kafkas"}>
        <StandardUsersGate>
          <DrawerProvider>
            {/* don't move these routes around! the order is important */}
            <ControlPlaneRoutes />
            <DataPlaneRoutes />
          </DrawerProvider>
        </StandardUsersGate>
      </Route>
      <Route path={"/dedicated"}>
        <DedicatedUsersGate>
          <DrawerProvider>
            {/* don't move these routes around! the order is important */}
            <DedicatedControlPlaneRoutes />
            <DedicatedDataPlaneRoutes />
          </DrawerProvider>
        </DedicatedUsersGate>
      </Route>
      <Route path={""} exact></Route>
    </Switch>
  );
};
