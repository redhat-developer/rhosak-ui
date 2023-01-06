import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import type { DataPlaneTopicHeaderProps } from "ui";
import { DataPlaneTopicHeader } from "ui";
import { ReadyStatuses } from "ui-models/src/models/kafka";
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
  const {
    instance,
    topic,
    match: { url },
  } = useTopicGate(instancesHref, instanceDetailsHref);

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
