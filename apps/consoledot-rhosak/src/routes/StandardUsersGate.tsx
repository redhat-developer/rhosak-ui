import { Loading } from "@rhoas/app-services-ui-components";
import type { FunctionComponent } from "react";
import { Redirect } from "react-router-dom";
import { DedicatedControlPlaneRouteRoot } from "./control-plane/routesConsts";
import { useDedicatedGate } from "./useDedicatedGate";

let redirected = false;

export const StandardUsersGate: FunctionComponent = ({ children }) => {
  const gate = useDedicatedGate();

  if (gate === "loading") {
    return <Loading />;
  }

  if (gate === "dedicated-only" && redirected === false) {
    redirected = true;
    return <Redirect to={DedicatedControlPlaneRouteRoot} />;
  }

  return <>{children}</>;
};
