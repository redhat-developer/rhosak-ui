import { Loading } from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";
import { DedicatedControlPlaneRoutes } from "./DedicatedControlPlaneRoutes";
import { LegacyControlPlaneRoutes } from "./LegacyControlPlaneRoutes";
import { useEntitlements } from "./useEntitlements";

export const ControlPlaneRoutes: VoidFunctionComponent = () => {
  const gate = useEntitlements();

  if (gate === "loading") {
    return <Loading />;
  }

  if (gate === "standard") {
    return <LegacyControlPlaneRoutes />;
  }

  return <DedicatedControlPlaneRoutes />;
};
