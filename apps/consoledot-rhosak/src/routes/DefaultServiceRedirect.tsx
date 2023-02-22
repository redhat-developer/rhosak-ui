import { Loading } from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";
import { Redirect } from "react-router-dom";
import {
  ControlPlaneRouteRoot,
  DedicatedControlPlaneRouteRoot,
} from "./control-plane/routesConsts";
import { useDedicatedGate } from "./useDedicatedGate";

export const DefaultServiceRedirect: VoidFunctionComponent = () => {
  const gate = useDedicatedGate();

  if (gate === "loading") {
    return <Loading />;
  }

  if (gate === "dedicated-only") {
    return <Redirect to={DedicatedControlPlaneRouteRoot} />;
  }

  return <Redirect to={ControlPlaneRouteRoot} />;
};
