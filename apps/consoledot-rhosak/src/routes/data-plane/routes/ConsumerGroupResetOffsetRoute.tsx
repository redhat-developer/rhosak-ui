import { useCallback } from "react";
import type { VoidFunctionComponent } from "react";
import { ConsumerGroupResetOffset } from "ui";
import type { OffsetValue } from "ui";
import type { DataPlaneConsumerGroupNavigationsProps } from "../routesConsts";
import { useHistory } from "react-router-dom";
import { useResetConsumerGroupMutation } from "consoledot-api";
import { useConsumerGroupGate } from "../useConsumerGroupGate";

export const ConsumerGroupResetOffsetRoute: VoidFunctionComponent<
  DataPlaneConsumerGroupNavigationsProps
> = ({ instanceConsumerGroupsHref }) => {
  const { instance, consumerGroup } = useConsumerGroupGate();

  const { mutateAsync } = useResetConsumerGroupMutation();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const history = useHistory();

  const onCancel = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push(instanceConsumerGroupsHref(instance.id));
  }, [history, instance.id, instanceConsumerGroupsHref]);

  const getTopics = () => {
    const topics = (consumerGroup.consumers || []).map(
      (consumer) => consumer.topic
    );
    const distinctTopics = Array.from(new Set(topics));
    return distinctTopics;
  };

  const onConfirmResetOffset = useCallback(
    (
      topic: string,
      offset: OffsetValue,
      partitions: number[],
      customOffsetValue: string
    ) => {
      void mutateAsync({
        instanceId: instance.id,
        adminUrl: instance.adminUrl!,
        consumerGroupId: consumerGroup.groupId,
        topic: topic,
        offset: offset,
        partitions: partitions,
        value: customOffsetValue,
        onError: () => {
          // TODO: alert
        },
        onSuccess: () => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
          history.replace(instanceConsumerGroupsHref(instance.id));
        },
      });
    },
    [
      mutateAsync,
      history,
      instance?.id,
      instanceConsumerGroupsHref,
      instance.adminUrl,
      consumerGroup.groupId,
    ]
  );

  return (
    <ConsumerGroupResetOffset
      isModalOpen={true}
      state={consumerGroup.state}
      groupId={consumerGroup.groupId}
      topics={getTopics()}
      consumers={consumerGroup.consumers}
      onClickClose={onCancel}
      onClickResetOffset={onConfirmResetOffset}
    />
  );
};
