import { PageSection } from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { DataPlaneHeaderConnected } from "./containers";
import type { DataPlaneRouteProps } from "./routes";

export const TopicsRoute: VoidFunctionComponent<DataPlaneRouteProps> = ({
  instancesHref,
}) => {
  return (
    <>
      <DataPlaneHeaderConnected
        instancesHref={instancesHref}
        activeSection={"topics"}
      />
      <PageSection>TODO</PageSection>
    </>
  );
};
