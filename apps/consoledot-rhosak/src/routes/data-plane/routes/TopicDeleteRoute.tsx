import { useDeleteTopicMutation } from "consoledot-api";
import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { DeleteKafkaTopic } from "ui/src/components/DeleteKafkaTopic";
import type { DataPlaneTopicNavigationProps } from "../routesConsts";
import { useTopicGate } from "../useTopicGate";

export const TopicDeleteRoute: VoidFunctionComponent<
  DataPlaneTopicNavigationProps
> = ({ topicHref, instanceTopicsHref }) => {
  const history = useHistory();

  const { instance, topic } = useTopicGate();
  const { mutateAsync, isLoading: isDeleting } = useDeleteTopicMutation();

  const onCancel = useCallback(() => {
    history.push(topicHref(instance.id, topic.name));
  }, [history, instance.id, topic.name, topicHref]);

  const onDelete = useCallback(() => {
    if (!instance.adminUrl) {
      throw Error("Invalid instance adminUrl");
    }
    void mutateAsync({
      instanceId: instance.id,
      adminUrl: instance.adminUrl,
      name: topic.name,
      onError: () => {
        // TODO: alert
      },
      onSuccess: () => {
        history.replace(instanceTopicsHref(instance.id));
      },
    });
  }, [
    instance.adminUrl,
    instance.id,
    mutateAsync,
    topic.name,
    history,
    instanceTopicsHref,
  ]);

  return (
    <DeleteKafkaTopic
      topicName={topic.name}
      isModalOpen={true}
      isDeleting={isDeleting}
      appendTo={() =>
        (document.getElementById("chrome-app-render-root") as HTMLElement) ||
        document.body
      }
      onDelete={onDelete}
      onCancel={onCancel}
    />
  );
};
