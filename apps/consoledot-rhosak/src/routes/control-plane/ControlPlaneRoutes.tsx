import { Loading } from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";
import { DedicatedControlPlaneRoutes } from "./DedicatedControlPlaneRoutes";
import { LegacyControlPlaneRoutes } from "./LegacyControlPlaneRoutes";
import { useDedicatedGate } from "./useDedicatedGate";

export const ControlPlaneRoutes: VoidFunctionComponent = () => {
  const gate = useDedicatedGate();

  if (gate === "loading") {
    return <Loading />;
  }

  if (gate === "standard-only") {
    return <LegacyControlPlaneRoutes />;
  }

  return <DedicatedControlPlaneRoutes />;
};
