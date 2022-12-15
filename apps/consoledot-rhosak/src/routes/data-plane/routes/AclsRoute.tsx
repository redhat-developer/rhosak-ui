import { PageSection } from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import type { ControlPlaneNavigationProps } from "../../control-plane/routesConsts";
import { DataPlaneHeaderConnected } from "./DataPlaneHeaderConnected";

export const AclsRoute: VoidFunctionComponent<ControlPlaneNavigationProps> = ({
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
