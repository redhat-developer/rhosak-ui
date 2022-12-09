import { useKafkaInstance } from "consoledot-api";
import type { VoidFunctionComponent } from "react";
import type { DataPlaneHeaderProps } from "ui";
import { DataPlaneHeader, ReadyStatuses } from "ui";
import { useDrawer } from "../../../DrawerProvider";
import type { DataPlaneRouteProps } from "../routes";
import { useDataPlaneRouteMatch } from "./UseDataPlaneRouteMatch";

export const DataPlaneHeaderConnected: VoidFunctionComponent<
  DataPlaneRouteProps & Pick<DataPlaneHeaderProps, "activeSection">
> = ({ instancesHref, activeSection }) => {
  const { setActiveTab, toggleExpanded } = useDrawer();

  const { url, params } = useDataPlaneRouteMatch();
  const { data: instance } = useKafkaInstance(params.id);

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
      instanceName={params.name}
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
      canOpenConnection={
        instance ? ReadyStatuses.includes(instance?.status) : false
      }
      canChangeOwner={true /* TODO */}
      onChangeOwner={() => false /* TODO */}
      canDelete={true /* TODO */}
      onDelete={() => false /* TODO */}
    />
  );
};
