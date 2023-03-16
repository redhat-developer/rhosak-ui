import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { ConsumerGroupDrawer } from "ui";
import type { DataPlaneTopicConsumerGroupNavigationsProps } from "../routesConsts";
import { useTopicConsumerGroupGate } from "../useTopicConsumerGroupGate";
import { TopicConsumerGroupsRoute } from "./TopicConsumerGroupsRoute";

export const TopicConsumerGroupViewPartitionRoute: VoidFunctionComponent<
  DataPlaneTopicConsumerGroupNavigationsProps
> = ({
  instanceTopicConsumerGroupsHref,
  instancesHref,
  viewTopicPartitionConsumerGroupHref,
  instanceDetailsHref,
  instanceTopicsHref,
}) => {
  const { instance, topic, consumerGroup } = useTopicConsumerGroupGate();

  const history = useHistory();

  const onCancel = useCallback(() => {
    history.push(instanceTopicConsumerGroupsHref(instance.id, topic.name));
  }, [history, instance.id, topic.name, instanceTopicConsumerGroupsHref]);

  const onDelete = useCallback(() => {
    history.push(
      `${viewTopicPartitionConsumerGroupHref(
        instance.id,
        topic.name,
        consumerGroup.name
      )}/delete`
    );
  }, [
    history,
    instance.id,
    consumerGroup.name,
    topic.name,
    viewTopicPartitionConsumerGroupHref,
  ]);

  const onClickResetOffset = useCallback(() => {
    history.push(
      `${viewTopicPartitionConsumerGroupHref(
        instance.id,
        topic.name,
        consumerGroup.name
      )}/reset-offset`
    );
  }, [
    history,
    instance.id,
    topic.name,
    consumerGroup.name,
    viewTopicPartitionConsumerGroupHref,
  ]);

  return (
    <ConsumerGroupDrawer
      consumerGroupByTopic={false}
      state={consumerGroup.state}
      activeMembers={consumerGroup.activeConsumers!}
      partitionsWithLag={consumerGroup.laggingPartitions!}
      consumers={consumerGroup.consumers}
      groupId={consumerGroup.name}
      onSelectDeleteConsumerGroup={onDelete}
      onSelectResetOffsetConsumerGroup={onClickResetOffset}
      isExpanded={true}
      onClickClose={onCancel}
    >
      <TopicConsumerGroupsRoute
        instancesHref={instancesHref}
        instanceDetailsHref={instanceDetailsHref}
        instanceTopicsHref={instanceTopicsHref}
      />
    </ConsumerGroupDrawer>
  );
};
