import { useCallback } from "react";
import type { VoidFunctionComponent } from "react";
import { ConsumerGroupResetOffset } from "ui";
import type { OffsetValue } from "ui";
import type { DataPlaneTopicConsumerGroupNavigationsProps } from "../routesConsts";
import { useHistory } from "react-router-dom";
import { useResetConsumerGroupMutation } from "consoledot-api";
import { useTopicConsumerGroupGate } from "../useTopicConsumerGroupGate";
import { useAlerts } from "../../../useAlerts";

export const TopicConsumerGroupResetOffsetRoute: VoidFunctionComponent<
  DataPlaneTopicConsumerGroupNavigationsProps
> = ({ instanceTopicConsumerGroupsHref }) => {
  const { instance, topic, consumerGroup } = useTopicConsumerGroupGate();

  const { addAlert } = useAlerts();

  const { mutateAsync } = useResetConsumerGroupMutation();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const history = useHistory();

  const onCancel = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push(instanceTopicConsumerGroupsHref(instance.id, topic.name));
  }, [history, instance.id, topic.name, instanceTopicConsumerGroupsHref]);

  const getTopics = () => {
    const topics = (consumerGroup.consumers || []).map(
      (consumer) => consumer.topic
    );
    const distinctTopics = Array.from(new Set(topics));
    return distinctTopics;
  };

  const onConfirmResetOffset = useCallback(
    (
      topicName: string,
      offset: OffsetValue,
      partitions: number[],
      customOffsetValue: string
    ) => {
      void mutateAsync({
        instanceId: instance.id,
        adminUrl: instance.adminUrl!,
        consumerGroupId: consumerGroup.name,
        topic: topicName,
        offset: offset,
        partitions: partitions,
        value: customOffsetValue,
        onError: (_, message) => {
          addAlert("danger", message, true, "reset-offset-error");
        },
        onSuccess: () => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
          history.replace(
            instanceTopicConsumerGroupsHref(instance.id, topic.name)
          );
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
      instanceTopicConsumerGroupsHref,
      topic.name,
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
