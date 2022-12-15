import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import type { DataPlaneHeaderProps } from "ui";
import { DataPlaneHeader, ReadyStatuses } from "ui";
import { useDrawer } from "../../control-plane";
import type { NavigationProps } from "../../control-plane/routesConsts";
import { useDataPlaneInstance } from "./useDataPlaneInstance";

export const DataPlaneHeaderConnected: VoidFunctionComponent<
  NavigationProps & Pick<DataPlaneHeaderProps, "activeSection">
> = ({ instancesHref, activeSection }) => {
  const history = useHistory();
  const { setActiveTab, toggleExpanded } = useDrawer();

  const {
    instance,
    match: { url },
  } = useDataPlaneInstance(instancesHref);

  const sectionsHref = {
    dashboard: `${url}/dashboard`,
    topics: `${url}/topics`,
    consumer: `${url}/consumer-groups`,
    permissions: `${url}/acls`,
    settings: `${url}/settings`,
  };

  const onDelete = useCallback(() => {
    // TODO: unhardcode this url
    history.push(`${instancesHref}/${instance.id}/delete`);
  }, [history, instance, instancesHref]);

  return (
    <DataPlaneHeader
      instancesHref={instancesHref}
      instanceName={instance?.name || ""}
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
      onDelete={onDelete}
    />
  );
};
