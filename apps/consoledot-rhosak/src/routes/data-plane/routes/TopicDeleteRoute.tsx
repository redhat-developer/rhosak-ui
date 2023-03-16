import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import { useDeleteTopicMutation } from "consoledot-api/src";
import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { DeleteKafkaTopic } from "ui/src/components/DeleteKafkaTopic";
import type { DataPlaneTopicNavigationProps } from "../routesConsts";
import { useTopicGate } from "../useTopicGate";

export const TopicDeleteRoute: VoidFunctionComponent<
  DataPlaneTopicNavigationProps
> = ({ instanceTopicsHref }) => {
  const { analytics } = useChrome();
  const history = useHistory();

  const { instance, topic } = useTopicGate();
  const { mutateAsync, isLoading: isDeleting } = useDeleteTopicMutation();

  void analytics.track("RHOSAK Delete Topic", {
    entityId: instance.id,
    topic: topic.name,
    status: "prompt",
  });

  const onCancel = useCallback(() => {
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
      onError: () => {
        void analytics.track("RHOSAK Delete Topic", {
          entityId: instance.id,
          topic: topic.name,
          status: "failure",
        });
        // TODO: alert
      },
      onSuccess: () => {
        void analytics.track("RHOSAK Delete Topic", {
          entityId: instance.id,
          topic: topic.name,
          status: "success",
        });
        history.replace(instanceTopicsHref(instance.id));
      },
    });
  }, [
    instance.adminUrl,
    instance.id,
    mutateAsync,
    topic.name,
    analytics,
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
