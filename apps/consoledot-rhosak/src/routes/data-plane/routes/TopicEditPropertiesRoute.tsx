import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import type { DataPlaneNavigationProps } from "../routesConsts";
import { useTopicGate } from "../useTopicGate";
import { useUpdateTopicMutation } from "consoledot-api";
import { useHistory } from "react-router-dom";
import { DataPlaneTopicHeaderConnected } from "./DataPlaneTopicHeaderConnected";
import type { TopicForm } from "ui";
import { EditTopicProperties } from "ui";
import { useAlerts } from "../../../useAlerts";

export const TopicEditPropertiesRoute: VoidFunctionComponent<
  DataPlaneNavigationProps
> = ({ instanceDetailsHref, instanceTopicsHref, instancesHref, instanceConsumerGroupsHref }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
          //eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push(instanceTopicsHref(instance.id));
  }, [history, instance.id, instanceTopicsHref]);

  return (
    <>
      <DataPlaneTopicHeaderConnected
        instancesHref={instancesHref}
        instanceDetailsHref={instanceDetailsHref}
        instanceTopicsHref={instanceTopicsHref}
        instanceConsumerGroupsHref={instanceConsumerGroupsHref}
        activeSection={"properties"}
      />
      <EditTopicProperties
        topic={topic}
        onCancel={onCancel}
        onSave={onSave}
        availablePartitionLimit={instance.maxPartitions}
      />
    </>
  );
};
