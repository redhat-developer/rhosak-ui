import { Loading } from "@rhoas/app-services-ui-components";
import type { FunctionComponent } from "react";
import type { NavigationProps } from "../control-plane/routesConsts";
import { useDataPlaneInstance } from "./routes/useDataPlaneInstance";

export const DataPlaneGate: FunctionComponent<NavigationProps> = ({
  instancesHref,
  children,
}) => {
  const { instance } = useDataPlaneInstance(instancesHref);

  return instance ? <>{children}</> : <Loading />;
};
