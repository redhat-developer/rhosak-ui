import { Loading } from "@rhoas/app-services-ui-components";
import type { FunctionComponent } from "react";
import type { NavigationProps } from "../routes";
import { useDataPlaneInstance } from "./useDataPlaneInstance";

export const DataPlaneGate: FunctionComponent<NavigationProps> = ({
  instancesHref,
  children,
}) => {
  const { instance } = useDataPlaneInstance(instancesHref);

  return instance ? <>{children}</> : <Loading />;
};
