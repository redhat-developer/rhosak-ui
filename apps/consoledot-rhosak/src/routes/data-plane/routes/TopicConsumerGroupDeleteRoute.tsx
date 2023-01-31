import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { DeleteConsumerGroup } from "ui";
import { useDeleteConsumerGroupMutation } from "consoledot-api";
import type { DataPlaneTopicConsumerGroupNavigationsProps } from "../routesConsts";
import { useTopicConsumerGroupGate } from "../useTopicConsumerGroupGate";

export const TopicConsumerGroupDeleteRoute: VoidFunctionComponent<
  DataPlaneTopicConsumerGroupNavigationsProps
> = ({ instanceTopicConsumerGroupsHref }) => {
  const history = useHistory();

  const { instance, consumerGroup, topic } = useTopicConsumerGroupGate();

  const { mutateAsync } = useDeleteConsumerGroupMutation();

  const onCancel = useCallback(() => {
    history.push(instanceTopicConsumerGroupsHref(instance.id, topic.name));
  }, [history, instance.id, topic.name, instanceTopicConsumerGroupsHref]);

  const onDelete = useCallback(() => {
    void mutateAsync({
      instanceId: instance.id,
      adminUrl: instance.adminUrl!,
      consumerGroupId: consumerGroup.groupId,
      onError: () => {
        // TODO: alert
      },
      onSuccess: () => {
        history.replace(
          instanceTopicConsumerGroupsHref(instance.id, topic.name)
        );
      },
    });
  }, [
    mutateAsync,
    history,
    instance?.id,
    instanceTopicConsumerGroupsHref,
    topic.name,
  ]);

  return (
    <DeleteConsumerGroup
      isModalOpen={true}
      onClose={onCancel}
      onDeleteConsumer={onDelete}
      state={consumerGroup.state}
      consumerName={consumerGroup.groupId}
      appendTo={() =>
        (document.getElementById("chrome-app-render-root") as HTMLElement) ||
        document.body
      }
    />
  );
};
