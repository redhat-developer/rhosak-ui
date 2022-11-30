import { PageSection } from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { DataPlaneHeaderConnected } from "./DataPlaneHeaderConnected";
import type { DataPlaneRouteProps } from "./DataPlaneRoute";

export const Acls: VoidFunctionComponent<DataPlaneRouteProps> = ({
  instancesHref,
}) => {
  return (
    <>
      <DataPlaneHeaderConnected
        instancesHref={instancesHref}
        activeSection={"permissions"}
      />
      <PageSection>TODO</PageSection>
    </>
  );
};
