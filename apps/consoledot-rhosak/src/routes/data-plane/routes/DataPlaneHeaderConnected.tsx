import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import type { DataPlaneHeaderProps } from "ui";
import { DataPlaneHeader } from "ui";
import { ReadyStatuses } from "ui-models/src/models/kafka";
import { useDrawer } from "../../control-plane";
import type { ControlPlaneNavigationProps } from "../../control-plane/routesConsts";
import { useDataPlaneGate } from "../useDataPlaneGate";

export const DataPlaneHeaderConnected: VoidFunctionComponent<
  ControlPlaneNavigationProps & Pick<DataPlaneHeaderProps, "activeSection">
> = ({ instancesHref, activeSection }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const history = useHistory();
  const { setActiveTab, toggleExpanded } = useDrawer();

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
