import type { VoidFunctionComponent } from "react";
import { useRouteMatch } from "react-router-dom";
import type { DataPlaneHeaderProps } from "ui";
import { DataPlaneHeader } from "ui";
import type { DataPlaneRouteParams, DataPlaneRouteProps } from "../routes";
import { DataPlaneRoutePath } from "../routes";

export const DataPlaneHeaderConnected: VoidFunctionComponent<
  DataPlaneRouteProps & Pick<DataPlaneHeaderProps, "activeSection">
> = ({ instancesHref, activeSection }) => {
  const match = useRouteMatch<DataPlaneRouteParams>(DataPlaneRoutePath);

  if (!match) {
    throw Error("ConnectedHeader used outside the expected route");
  }

  const {
    url,
    params: { name },
  } = match;

  const crumbs = [{ href: url, label: name }];
  const sectionsHref = {
    dashboard: `${url}/dashboard`,
    topics: `${url}/topics`,
    consumer: `${url}/consumer-groups`,
    permissions: `${url}/acls`,
    settings: `${url}/settings`,
  };

  return (
    <DataPlaneHeader
      instancesHref={instancesHref}
      instanceName={name}
      crumbs={crumbs}
      activeSection={activeSection}
      sectionsHref={sectionsHref}
    />
  );
};
