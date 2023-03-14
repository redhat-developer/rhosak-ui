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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
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
