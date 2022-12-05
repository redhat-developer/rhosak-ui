import type { VoidFunctionComponent } from "react";
import { useRouteMatch } from "react-router-dom";
import type { DataPlaneHeaderProps } from "ui";
import { DataPlaneHeader } from "ui";
import { useDrawer } from "../../../DrawerProvider";
import type { DataPlaneRouteParams, DataPlaneRouteProps } from "../routes";
import { DataPlaneRoutePath } from "../routes";

export const DataPlaneHeaderConnected: VoidFunctionComponent<
  DataPlaneRouteProps & Pick<DataPlaneHeaderProps, "activeSection">
> = ({ instancesHref, activeSection }) => {
  const match = useRouteMatch<DataPlaneRouteParams>(DataPlaneRoutePath);
  const { setActiveTab, toggleExpanded } = useDrawer();

  if (!match) {
    throw Error("ConnectedHeader used outside the expected route");
  }

  const {
    url,
    params: { name },
  } = match;

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
      activeSection={activeSection}
      sectionsHref={sectionsHref}
      onDetails={() => {
        setActiveTab("details");
        toggleExpanded(true);
      }}
      onConnection={() => {
        setActiveTab("connections");
        toggleExpanded(true);
      }}
      canChangeOwner={true /* TODO */}
      onChangeOwner={() => false /* TODO */}
      canDelete={true /* TODO */}
      onDelete={() => false /* TODO */}
    />
  );
};
