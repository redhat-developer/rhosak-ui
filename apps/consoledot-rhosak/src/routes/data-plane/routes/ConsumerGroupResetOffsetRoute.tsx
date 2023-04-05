import { useResetConsumerGroupMutation } from "consoledot-api/src";
import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import type { OffsetValue } from "ui";
import { ConsumerGroupResetOffset } from "ui";
import { useAlerts } from "../../../hooks";
import type { DataPlaneConsumerGroupNavigationsProps } from "../routesConsts";
import { useConsumerGroupGate } from "../useConsumerGroupGate";

export const ConsumerGroupResetOffsetRoute: VoidFunctionComponent<
  DataPlaneConsumerGroupNavigationsProps
> = ({ instanceConsumerGroupsHref }) => {
  const { instance, consumerGroup } = useConsumerGroupGate();

  const { addAlert } = useAlerts();

  const { mutateAsync } = useResetConsumerGroupMutation();

  const history = useHistory();

  const onCancel = useCallback(() => {
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
        consumerGroupId: consumerGroup.name,
        topic: topic,
        offset: offset,
        partitions: partitions,
        value: customOffsetValue,
        onError: (_, message) => {
          addAlert("danger", message, true, "reset-offset-error");
        },
        onSuccess: () => {
          history.replace(instanceConsumerGroupsHref(instance.id));
          addAlert(
            "success",
            "offsets for the consumer group have been successfully reset",
            true,
            "reset-offset-success"
          );
        },
      });
    },
    [
      mutateAsync,
      instance.id,
      instance.adminUrl,
      consumerGroup.name,
      addAlert,
      history,
      instanceConsumerGroupsHref,
    ]
  );

  return (
    <ConsumerGroupResetOffset
      isModalOpen={true}
      state={consumerGroup.state}
      groupId={consumerGroup.name}
      topics={getTopics()}
      consumers={consumerGroup.consumers}
      onClickClose={onCancel}
      onClickResetOffset={onConfirmResetOffset}
    />
  );
};
