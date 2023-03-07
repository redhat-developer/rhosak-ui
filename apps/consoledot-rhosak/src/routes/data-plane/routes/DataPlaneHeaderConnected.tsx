import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import type { DataPlaneHeaderProps } from "ui";
import { DataPlaneHeader } from "ui";
import { useDrawer } from "../../control-plane";
import type { ControlPlaneNavigationProps } from "../../control-plane/routesConsts";
import { useDataPlaneGate } from "../useDataPlaneGate";
import { useUserControlGate } from "../../../useUserControlGate";

export const DataPlaneHeaderConnected: VoidFunctionComponent<
  ControlPlaneNavigationProps & Pick<DataPlaneHeaderProps, "activeSection">
> = ({ instancesHref, activeSection }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const history = useHistory();
  const { setActiveTab, toggleExpanded } = useDrawer();

  const { userData } = useUserControlGate();

  const {
    instance,
    match: { url },
  } = useDataPlaneGate();

  const sectionsHref = {
    dashboard: `${url}/dashboard`,
    topics: `${url}/topics`,
    consumer: `${url}/consumer-groups`,
    permissions: `${url}/acls`,
    settings: `${url}/settings`,
  };

  const onDelete = useCallback(() => {
    // TODO: unhardcode this url
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push(`${instancesHref}/${instance.id}/delete`);
  }, [history, instance, instancesHref]);

  const onChangeOwner = useCallback(() => {
    // TODO: unhardcode this url
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push(`${instancesHref}/${instance.id}/change-owner`);
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
      canOpenConnection={userData.canOpenConnection(instance)}
      canChangeOwner={userData.canChangeOwner(instance.owner, instance.status)}
      canDelete={userData.isUserOwnerOrAdmin(instance.owner)}
      onChangeOwner={onChangeOwner}
      onDelete={onDelete}
    />
  );
};
