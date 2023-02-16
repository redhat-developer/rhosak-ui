import { Loading } from "@rhoas/app-services-ui-components";
import type { FunctionComponent } from "react";
import { Redirect } from "react-router-dom";
import { ControlPlaneRouteRoot } from "./control-plane/routesConsts";
import { useDedicatedGate } from "./useDedicatedGate";

export const DedicatedUsersGate: FunctionComponent = ({ children }) => {
  const gate = useDedicatedGate();

  if (gate === "loading") {
    return <Loading />;
  }
  if (gate === "standard-only") {
    return <Redirect to={ControlPlaneRouteRoot} />;
  }

  return <>{children}</>;
};
