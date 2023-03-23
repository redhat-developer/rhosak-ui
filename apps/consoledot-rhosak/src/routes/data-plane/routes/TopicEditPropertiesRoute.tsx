import { useUpdateTopicMutation } from "consoledot-api/src";
import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import type { TopicForm } from "ui";
import { EditTopicProperties } from "ui";
import { useAlerts } from "../../../useAlerts";
import type { DataPlaneNavigationProps } from "../routesConsts";
import { useTopicGate } from "../useTopicGate";
import { DataPlaneTopicHeaderConnected } from "./DataPlaneTopicHeaderConnected";

export const TopicEditPropertiesRoute: VoidFunctionComponent<
  DataPlaneNavigationProps
> = ({ instanceDetailsHref, instanceTopicsHref, instancesHref }) => {
  const history = useHistory();
  const { instance, topic } = useTopicGate();
  const { addAlert } = useAlerts();
  if (instance.maxPartitions === undefined) {
    throw new Error(
      `CreateTopicRoute, unexpected maxPartition undefined for instance ${instance.name}`
    );
  }
  const updateTopic = useUpdateTopicMutation();

  const onSave = useCallback(
    (topicData: TopicForm) => {
      if (instance.adminUrl === undefined) {
        throw new Error(
          `EditTopicRoute, adminUrl undefined for instance ${instance.name}`
        );
      }
      void updateTopic.mutateAsync({
        instanceId: instance.id,
        adminUrl: instance.adminUrl,
        topic: topicData,

        onSuccess: () => {
          history.push(instanceTopicsHref(instance.id));
          addAlert(
            "success",
            `The topic was successfully updated in the Kafka instance.`,
            true,
            "edit-topic-success"
          );
        },
        onError: (_, message) => {
          addAlert("danger", message, true, "edit-topic-fail");
        },
      });
    },
    [
      instance.adminUrl,
      instance.id,
      instance.name,
      updateTopic,
      history,
      instanceTopicsHref,
      addAlert,
    ]
  );

  const onCancel = useCallback(() => {
    history.push(instanceTopicsHref(instance.id));
  }, [history, instance.id, instanceTopicsHref]);

  const isSaving = updateTopic.isLoading;

  return (
    <>
      <DataPlaneTopicHeaderConnected
        instancesHref={instancesHref}
        instanceDetailsHref={instanceDetailsHref}
        instanceTopicsHref={instanceTopicsHref}
        activeSection={"properties"}
      />
      <EditTopicProperties
        topic={topic}
        onCancel={onCancel}
        onSave={onSave}
        availablePartitionLimit={instance.maxPartitions}
        isSaving={isSaving}
      />
    </>
  );
};
