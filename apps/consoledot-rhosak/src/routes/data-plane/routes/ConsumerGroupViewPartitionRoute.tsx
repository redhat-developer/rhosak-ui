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
  instanceDetailsHref,
  instanceTopicsHref,
}) => {
  const { instance, consumerGroup } = useConsumerGroupGate();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const history = useHistory();

  const onCancel = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push(instanceConsumerGroupsHref(instance.id));
  }, [history, instance.id, instanceConsumerGroupsHref]);

  const onDelete = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
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
      <ConsumerGroupsRoute
        instancesHref={instancesHref}
        instanceTopicsHref={instanceTopicsHref}
        instanceDetailsHref={instanceDetailsHref}
        instanceConsumerGroupsHref={instanceConsumerGroupsHref}
      />
    </ConsumerGroupDrawer>
  );
};
