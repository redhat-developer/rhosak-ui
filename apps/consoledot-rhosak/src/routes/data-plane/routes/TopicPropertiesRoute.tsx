import type { VoidFunctionComponent } from "react";
import { TopicDetailView } from "ui/src/components/KafkaTopicDetails";
import type { DataPlaneTopicNavigationProps } from "../routesConsts";
import { useTopicGate } from "../useTopicGate";
import { DataPlaneTopicHeaderConnected } from "./DataPlaneTopicHeaderConnected";

export const TopicPropertiesRoute: VoidFunctionComponent<
  DataPlaneTopicNavigationProps
> = ({
  instanceDetailsHref,
  instanceTopicsHref,
  instancesHref,
  deleteTopicHref,
  updateTopicHref,
}) => {
  const { instance, topic } = useTopicGate(instancesHref, instanceDetailsHref);

  return (
    <>
      <DataPlaneTopicHeaderConnected
        instancesHref={instancesHref}
        instanceDetailsHref={instanceDetailsHref}
        instanceTopicsHref={instanceTopicsHref}
        activeSection={"properties"}
      />
      <TopicDetailView
        topic={topic}
        deleteTopicHref={deleteTopicHref(instance.id, topic.name)}
        updateTopicHref={updateTopicHref(instance.id, topic.name)}
      />
    </>
  );
};
