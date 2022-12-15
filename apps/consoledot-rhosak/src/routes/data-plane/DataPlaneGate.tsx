import { Loading } from "@rhoas/app-services-ui-components";
import type { FunctionComponent } from "react";
import type { ControlPlaneNavigationProps } from "../control-plane/routesConsts";
import { useDataPlaneGate } from "./useDataPlaneGate";

export const DataPlaneGate: FunctionComponent<ControlPlaneNavigationProps> = ({
  instancesHref,
  children,
}) => {
  const { instance } = useDataPlaneGate(instancesHref);

  return instance ? <>{children}</> : <Loading />;
};
