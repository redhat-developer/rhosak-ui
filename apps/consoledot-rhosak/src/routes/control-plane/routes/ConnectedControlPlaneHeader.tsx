import type { VoidFunctionComponent } from "react";
import type { ControlPlaneHeaderProps } from "ui";
import { ControlPlaneHeader } from "ui";
import type { DedicatedControlPlaneNavigationProps } from "../routesConsts";

export type ConnectedControlPlaneHeaderProps = {
  activeSection: ControlPlaneHeaderProps["activeSection"];
} & DedicatedControlPlaneNavigationProps;

export const ConnectedControlPlaneHeader: VoidFunctionComponent<
  ConnectedControlPlaneHeaderProps
> = ({ activeSection, instancesHref, clustersHref }) => {
  return (
    <ControlPlaneHeader
      activeSection={activeSection}
      sectionsHref={{
        instances: instancesHref,
        clusters: clustersHref,
      }}
    />
  );
};
