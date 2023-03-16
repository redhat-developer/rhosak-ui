import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { ConsumerGroupDrawer } from "ui";
import type { DataPlaneConsumerGroupNavigationsProps } from "../routesConsts";
import { useConsumerGroupGate } from "../useConsumerGroupGate";
import { ConsumerGroupsRoute } from "./ConsumerGroupsRoute";

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
        consumerGroup.name
      )}/delete`
    );
  }, [
    history,
    instance.id,
    consumerGroup.name,
    viewPartitionConsumerGroupHref,
  ]);

  const onClickResetOffset = useCallback(() => {
    history.push(
      `${viewPartitionConsumerGroupHref(
        instance.id,
        consumerGroup.name
      )}/reset-offset`
    );
  }, [
    history,
    instance.id,
    consumerGroup.name,
    viewPartitionConsumerGroupHref,
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
      <ConsumerGroupsRoute instancesHref={instancesHref} />
    </ConsumerGroupDrawer>
  );
};
