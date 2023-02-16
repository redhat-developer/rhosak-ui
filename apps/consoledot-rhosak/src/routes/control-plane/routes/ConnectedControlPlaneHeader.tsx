import type { VoidFunctionComponent } from "react";
import type { ControlPlaneHeaderProps } from "ui";
import { ControlPlaneHeader } from "ui";

export type ConnectedControlPlaneHeaderProps = {
  activeSection: ControlPlaneHeaderProps["activeSection"];
};

export const ConnectedControlPlaneHeader: VoidFunctionComponent<
  ConnectedControlPlaneHeaderProps
> = ({ activeSection }) => {
  return (
    <ControlPlaneHeader
      activeSection={activeSection}
      sectionsHref={{
        standard: "/kafkas",
        dedicated: "/dedicated",
        clusters: "/dedicated/clusters",
      }}
    />
  );
};
