import { useCallback } from "react";
import type { VoidFunctionComponent } from "react";
import { ConsumerGroupDrawer } from "ui";
import type { DataPlaneConsumerGroupNavigationsProps } from "../routesConsts";
import { useHistory } from "react-router-dom";
import { ConsumerGroupsRoute } from "./ConsumerGroupsRoute";
import { useConsumerGroupGate } from "../useConsumerGroupGate";

export const ConsumerGroupViewPartitionRoute: VoidFunctionComponent<
  DataPlaneConsumerGroupNavigationsProps
> = ({
  instanceConsumerGroupsHref,
  viewPartitionConsumerGroupHref,
  instancesHref,
}) => {
  const { instance, consumerGroup } = useConsumerGroupGate();

  const history = useHistory();

  const onCancel = useCallback(() => {
    history.push(instanceConsumerGroupsHref(instance.id));
  }, [history, instance.id, instanceConsumerGroupsHref]);

  const onDelete = useCallback(() => {
    history.push(
      `${viewPartitionConsumerGroupHref(
        instance.id,
        consumerGroup.groupId
      )}/delete`
    );
  }, [
    history,
    instance.id,
    consumerGroup.groupId,
    viewPartitionConsumerGroupHref,
  ]);

  const onClickResetOffset = useCallback(() => {
    history.push(
      `${viewPartitionConsumerGroupHref(
        instance.id,
        consumerGroup.groupId
      )}/reset-offset`
    );
  }, [
    history,
    instance.id,
    consumerGroup.groupId,
    viewPartitionConsumerGroupHref,
  ]);

  return (
    <ConsumerGroupDrawer
      consumerGroupByTopic={false}
      state={consumerGroup.state}
      activeMembers={consumerGroup.activeConsumers!}
      partitionsWithLag={consumerGroup.laggingPartitions!}
      consumers={consumerGroup.consumers}
      groupId={consumerGroup.groupId}
      onSelectDeleteConsumerGroup={onDelete}
      onSelectResetOffsetConsumerGroup={onClickResetOffset}
      isExpanded={true}
      onClickClose={onCancel}
    >
      <ConsumerGroupsRoute instancesHref={instancesHref} />
    </ConsumerGroupDrawer>
  );
};
