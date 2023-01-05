import type { VoidFunctionComponent } from "react";
import { TopicDetailView } from "ui/src/components/KafkaTopicDetails";
import type { DataPlaneNavigationProps } from "../routesConsts";
import { useTopicGate } from "../useTopicGate";
import { DataPlaneTopicHeaderConnected } from "./DataPlaneTopicHeaderConnected";

export const TopicPropertiesRoute: VoidFunctionComponent<
  DataPlaneNavigationProps
> = ({ instanceDetailsHref, instancesHref }) => {
  const { topic } = useTopicGate(instancesHref, instanceDetailsHref);

  return (
    <>
      <DataPlaneTopicHeaderConnected
        instancesHref={instancesHref}
        instanceDetailsHref={instanceDetailsHref}
        activeSection={"properties"}
      />
      <TopicDetailView
        topic={topic}
        deleteTopic={() => {}}
        updateTopic={() => {}}
      />
    </>
  );
};
