import type { VoidFunctionComponent } from "react";
import { useCallback, useMemo } from "react";
import type { CreateTopicPageProps, TopicForm } from "ui";
import { CreateTopic } from "ui";
import { useHistory } from "react-router-dom";
import { useAlerts } from "../../../useAlerts";
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
  const { addAlert } = useAlerts();
  const { instance } = useDataPlaneGate();
  const createTopic = useCreateTopicMutation();
  const availabilityZone = instance.az;
  const { data: topics } = useTopics(
    {
      id: instance.id,
      adminUrl: instance.adminUrl,
      plan: instance.plan,
    },
    false
  );

  if (instance.maxPartitions === undefined) {
    throw new Error(
      `CreateTopicRoute, unexpected maxPartition undefined for instance ${instance.name}`
    );
  }

  const checkTopicName: CreateTopicPageProps["checkTopicName"] = useCallback(
    (topicName) => {
      const selectedTopic = topics?.topics.filter(
        (topic) => topic.name === topicName
      );
      if (selectedTopic && selectedTopic?.length > 0) {
        return false;
      } else {
        return true;
      }
    },
    [topics?.topics]
  );

  const onCloseCreateTopic = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push(instanceTopicsHref(instance.id));
  }, [history, instance.id, instanceTopicsHref]);

  const onSave = useCallback(
    (topicData: TopicForm) => {
      void createTopic.mutateAsync({
        instanceId: instance.id,
        adminUrl: instance?.adminUrl || "",
        topic: topicData,

        onSuccess: () => {
          //eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
          history.push(instanceTopicsHref(instance.id));
          addAlert(
            "success",
            "The topic was successfully created in the Kafka instance",
            true,
            "create-topic-success"
          );
        },
        onError: (_, message) => {
          addAlert("danger", message, true, "create-topic-fail");
        },
      });
    },
    [
      addAlert,
      createTopic,
      history,
      instance?.adminUrl,
      instance.id,
      instanceTopicsHref,
    ]
  );

  const initialTopicValues = useMemo(() => {
    return instance.plan === "developer"
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
  }, [instance.plan]);

  return (
    <>
      <CreateTopic
        kafkaName={instance.name}
        kafkaPageLink={instanceTopicsHref(instance.id)}
        kafkaInstanceLink={instancesHref}
        onSave={onSave}
        initialTopicValues={initialTopicValues}
        onCloseCreateTopic={onCloseCreateTopic}
        checkTopicName={checkTopicName}
        availablePartitionLimit={instance.maxPartitions}
        availabilityZone={availabilityZone}
      />
    </>
  );
};
