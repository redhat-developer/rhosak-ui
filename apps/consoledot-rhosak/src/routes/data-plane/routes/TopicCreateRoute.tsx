import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import { CreateTopic } from "ui";
import type { Topic } from "ui-models/src/models/topic";
import { useHistory } from "react-router-dom";
import { addNotification } from "@redhat-cloud-services/frontend-components-notifications";
import { useDispatch } from "react-redux";
import { useCreateTopicMutation, useTopics } from "consoledot-api";
import { useDataPlaneGate } from "../useDataPlaneGate";
import type { DataPlaneNavigationProps } from "../routesConsts";
import {
  developerDefaults,
  standardDefaults,
} from "consoledot-api/src/transformers/topicTransformer";

export const TopicCreateRoute: VoidFunctionComponent<
  DataPlaneNavigationProps
> = ({ instancesHref, instanceTopicsHref }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const history = useHistory();
  const { instance } = useDataPlaneGate();
  const createTopic = useCreateTopicMutation();
  const dispatch = useDispatch();
  const availabiltyZone = instance.az;
  const { data: topics } = useTopics({
    id: instance.id,
    adminUrl: instance.adminUrl,
    plan: instance.plan,
  });

  const checkTopicName = (topicName: string) => {
    const selectedTopic = topics?.topics.filter(
      (topic) => topic.name === topicName
    );
    if (selectedTopic && selectedTopic?.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const onCloseCreateTopic = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push(instanceTopicsHref(instance.id));
  }, [history, instance.id, instanceTopicsHref]);

  const onSave = useCallback(
    (topicData: Topic) => {
      void createTopic.mutateAsync({
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
      createTopic,
      dispatch,
      history,
      instance?.adminUrl,
      instance.id,
      instanceTopicsHref,
    ]
  );

  const initialTopicValues: Topic =
    instance.plan === "developer"
      ? {
          name: "",
          partitions: [{ partition: 1, id: 1 }],
          ...developerDefaults,
        }
      : {
          name: "",
          partitions: [{ partition: 1, id: 1 }],
          ...standardDefaults,
        };

  return (
    <>
      <CreateTopic
        kafkaName={instance.name}
        onKafkaPageLink={instanceTopicsHref(instance.id)}
        onKafkaInstanceLink={instancesHref}
        onSave={onSave}
        initialTopicValues={initialTopicValues}
        onCloseCreateTopic={onCloseCreateTopic}
        checkTopicName={checkTopicName}
        availablePartitionLimit={
          instance.maxPartitions || instance.plan == "developer" ? 100 : 1000
        }
        availabiltyZone={availabiltyZone}
      />
    </>
  );
};
