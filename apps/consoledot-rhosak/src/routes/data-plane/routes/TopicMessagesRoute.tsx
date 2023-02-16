import { useMessagesFetchQuery } from "consoledot-api";
import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import type { KafkaMessageBrowserProps } from "ui";
import { KafkaMessageBrowser } from "ui";
import type { DataPlaneNavigationProps } from "../routesConsts";
import { useTopicGate } from "../useTopicGate";
import { DataPlaneTopicHeaderConnected } from "./DataPlaneTopicHeaderConnected";

export const TopicMessagesGroupsRoute: VoidFunctionComponent<
  DataPlaneNavigationProps
> = ({
  instanceDetailsHref,
  instanceTopicsHref,
  instancesHref,
  instanceConsumerGroupsHref,
}) => {
  const { instance, topic } = useTopicGate();
  const kafkaTopicMessagesFetchQuery = useMessagesFetchQuery();

  const getMessages = useCallback<KafkaMessageBrowserProps["getMessages"]>(
    async (params) => {
      if (!instance.adminUrl) {
        throw Error("Invalid instance adminUrl");
      }
      const messages = await kafkaTopicMessagesFetchQuery({
        ...params,
        id: instance.id,
        adminUrl: instance.adminUrl,
        topicName: topic.name,
      });
      return {
        messages,
        partitions: topic.partitions.length,
      };
    },
    [
      instance.adminUrl,
      instance.id,
      kafkaTopicMessagesFetchQuery,
      topic.name,
      topic.partitions.length,
    ]
  );

  return (
    <>
      <DataPlaneTopicHeaderConnected
        instancesHref={instancesHref}
        instanceDetailsHref={instanceDetailsHref}
        instanceTopicsHref={instanceTopicsHref}
        instanceConsumerGroupsHref={instanceConsumerGroupsHref}
        activeSection={"messages"}
      />
      <KafkaMessageBrowser getMessages={getMessages} />
    </>
  );
};
