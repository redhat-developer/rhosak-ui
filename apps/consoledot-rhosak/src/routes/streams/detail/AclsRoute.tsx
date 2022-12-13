import { PageSection } from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import type { NavigationProps } from "../routes";
import { DataPlaneHeaderConnected } from "./DataPlaneHeaderConnected";

export const AclsRoute: VoidFunctionComponent<NavigationProps> = ({
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
