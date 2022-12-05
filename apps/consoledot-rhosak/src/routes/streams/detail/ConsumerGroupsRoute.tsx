import { PageSection } from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import type { DataPlaneRouteProps } from "../routes";
import { DataPlaneHeaderConnected } from "./DataPlaneHeaderConnected";

export const ConsumerGroupsRoute: VoidFunctionComponent<
  DataPlaneRouteProps
> = ({ instancesHref }) => {
  return (
    <>
      <DataPlaneHeaderConnected
        instancesHref={instancesHref}
        activeSection={"consumer"}
      />
      <PageSection>TODO</PageSection>
    </>
  );
};
