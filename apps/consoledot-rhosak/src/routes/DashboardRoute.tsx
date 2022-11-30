import type { VoidFunctionComponent } from "react";
import { DataPlaneHeaderConnected } from "./DataPlaneHeaderConnected";
import type { DataPlaneRouteProps } from "./DataPlaneRoute";
import { MetricsRoute } from "./MetricsRoute";

export const DashboardRoute: VoidFunctionComponent<DataPlaneRouteProps> = ({
  instancesHref,
}) => {
  return (
    <>
      <DataPlaneHeaderConnected
        instancesHref={instancesHref}
        activeSection={"dashboard"}
      />
      <MetricsRoute />
    </>
  );
};
