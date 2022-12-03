import { PageSection } from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { DataPlaneHeaderConnected } from "./containers/DataPlaneHeaderConnected";
import type { DataPlaneRouteProps } from "./routes";

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
