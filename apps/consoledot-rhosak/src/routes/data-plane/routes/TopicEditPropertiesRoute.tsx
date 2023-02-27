import { VoidFunctionComponent, useCallback } from "react";
import type { DataPlaneNavigationProps } from "../routesConsts";
import { useTopicGate } from "../useTopicGate";
import { useUpdateTopicMutation } from "consoledot-api";
import { Topic } from "ui-models/src/models/topic";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DataPlaneTopicHeaderConnected } from "./DataPlaneTopicHeaderConnected";
import { EditTopicProperties } from "ui";
import { addNotification } from "@redhat-cloud-services/frontend-components-notifications";

export const TopicEditPropertiesRoute: VoidFunctionComponent<
  DataPlaneNavigationProps
> = ({ instanceDetailsHref, instanceTopicsHref, instancesHref }) => {
  const history = useHistory();
  const { instance, topic } = useTopicGate();

  const dispatch = useDispatch();

  const updateTopic = useUpdateTopicMutation();

  const onSave = useCallback(
    (topicData: Topic) => {
      void updateTopic.mutateAsync({
        instanceId: instance.id,
        adminUrl: instance?.adminUrl || "",
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
      updateTopic,
      dispatch,
      history,
      instance?.adminUrl,
      instance.id,
      instancesHref,
    ]
  );

  const onCancel = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push(instanceTopicsHref(instance.id));
  }, [history, instance.id, topic.name]);

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
        availablePartitionLimit={10}
      />
    </>
  );
};
