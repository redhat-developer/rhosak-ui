import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import type { DataPlaneTopicHeaderProps } from "ui";
import { DataPlaneTopicHeader } from "ui";
import { useUserControlGate } from "../../../hooks";
import { useDrawer } from "../../control-plane";
import type { DataPlaneNavigationProps } from "../routesConsts";
import { useTopicGate } from "../useTopicGate";

export const DataPlaneTopicHeaderConnected: VoidFunctionComponent<
  DataPlaneNavigationProps & Pick<DataPlaneTopicHeaderProps, "activeSection">
> = ({
  instanceDetailsHref,
  instanceTopicsHref,
  instancesHref,
  activeSection,
}) => {
  const history = useHistory();
  const { setActiveTab, toggleExpanded } = useDrawer();
  const { userData } = useUserControlGate();
  const {
    instance,
    topic,
    match: { url },
  } = useTopicGate();

  const tabsHref = {
    consumer: `${url}/consumer-groups`,
    messages: `${url}/messages`,
    properties: `${url}/properties`,
    schemas: `${url}/schemas`,
  };

  const onDelete = useCallback(() => {
    // TODO: unhardcode this url
    history.push(`${instancesHref}/${instance.id}/delete`);
  }, [history, instance, instancesHref]);

  const onChangeOwner = useCallback(() => {
    // TODO: unhardcode this url
    history.push(`${instancesHref}/${instance.id}/change-owner`);
  }, [history, instance, instancesHref]);

  return (
    <DataPlaneTopicHeader
      instancesHref={instancesHref}
      instanceName={instance.name}
      instanceDetailHref={instanceDetailsHref(instance.id)}
      instanceTopicsHref={instanceTopicsHref(instance.id)}
      activeSection={activeSection}
      topicName={topic.name}
      tabsHref={tabsHref}
      onDetails={() => {
        setActiveTab("details");
        toggleExpanded(true);
      }}
      onConnection={() => {
        setActiveTab("connections");
        toggleExpanded(true);
      }}
      canOpenConnection={userData.canOpenConnection(instance.status)}
      canChangeOwner={userData.canChangeOwner(instance.owner, instance.status)}
      canDelete={userData.isUserOwnerOrAdmin(instance.owner)}
      onChangeOwner={onChangeOwner}
      onDelete={onDelete}
    />
  );
};
