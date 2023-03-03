import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import type { DataPlaneNavigationProps } from "../routesConsts";
import { useTopicGate } from "../useTopicGate";
import { useUpdateTopicMutation } from "consoledot-api";
import type { Topic } from "ui-models/src/models/topic";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DataPlaneTopicHeaderConnected } from "./DataPlaneTopicHeaderConnected";
import { EditTopicProperties } from "ui";
import { addNotification } from "@redhat-cloud-services/frontend-components-notifications";

export const TopicEditPropertiesRoute: VoidFunctionComponent<
  DataPlaneNavigationProps
> = ({ instanceDetailsHref, instanceTopicsHref, instancesHref }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const history = useHistory();
  const { instance, topic } = useTopicGate();

  if (instance.maxPartitions === undefined) {
    throw new Error(
      `CreateTopicRoute, unexpected maxPartition undefined for instance ${instance.name}`
    );
  }

  const dispatch = useDispatch();

  const updateTopic = useUpdateTopicMutation();

  const onSave = useCallback(
    (topicData: Topic) => {
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
        },
        onError: (_, message) => {
          dispatch(
            addNotification({
              variant: "danger",
              title: message,
              dismissable: true,
              id: "save-error",
            })
          );
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
      dispatch,
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
