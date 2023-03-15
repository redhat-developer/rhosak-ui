import { useDeleteTopicMutation } from "consoledot-api";
import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { DeleteKafkaTopic } from "ui/src/components/DeleteKafkaTopic";
import type { DataPlaneTopicNavigationProps } from "../routesConsts";
import { useTopicGate } from "../useTopicGate";
import { useAlerts } from "../../../useAlerts";

export const TopicDeleteRoute: VoidFunctionComponent<
  DataPlaneTopicNavigationProps
> = ({ instanceTopicsHref }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const history = useHistory();

  const { instance, topic } = useTopicGate();

  const { addAlert } = useAlerts();
  const { mutateAsync, isLoading: isDeleting } = useDeleteTopicMutation();

  const onCancel = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push(instanceTopicsHref(instance.id));
  }, [history, instance.id, instanceTopicsHref]);

  const onDelete = useCallback(() => {
    if (!instance.adminUrl) {
      throw Error("Invalid instance adminUrl");
    }
    void mutateAsync({
      instanceId: instance.id,
      adminUrl: instance.adminUrl,
      name: topic.name,
      onError: (_, message) => {
        addAlert("danger", message, true, "delete-topic-error");
      },
      onSuccess: () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        history.replace(instanceTopicsHref(instance.id));
        addAlert(
          "success",
          `Successfully deleted topic ${topic.name}`,
          true,
          "delete-topic-success"
        );
      },
    });
  }, [
    instance.adminUrl,
    instance.id,
    mutateAsync,
    topic.name,
    addAlert,
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
