import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import { useCreateTopicMutation, useTopics } from "consoledot-api/src";
import {
  developerDefaults,
  standardDefaults,
} from "consoledot-api/src/transformers/topicTransformer";
import type { VoidFunctionComponent } from "react";
import { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import type { CreateTopicPageProps, TopicForm } from "ui";
import { CreateTopic } from "ui";
import { useAlerts } from "../../../useAlerts";
import type { DataPlaneNavigationProps } from "../routesConsts";
import { useDataPlaneGate } from "../useDataPlaneGate";

export const TopicCreateRoute: VoidFunctionComponent<
  DataPlaneNavigationProps
> = ({ instancesHref, instanceTopicsHref }) => {
  const { analytics } = useChrome();
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

  void analytics.track("RHOSAK Create Topic", {
    entityId: instance.id,
    status: "prompt",
  });

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
    history.push(instanceTopicsHref(instance.id));
  }, [history, instance.id, instanceTopicsHref]);

  const onSave = useCallback(
    (topicData: TopicForm) => {
      void createTopic.mutateAsync({
        instanceId: instance.id,
        adminUrl: instance?.adminUrl || "",
        topic: topicData,

        onSuccess: () => {
          void analytics.track("RHOSAK Create Topic", {
            entityId: instance.id,
            topic: topicData.name,
            status: "success",
          });

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
          void analytics.track("RHOSAK Create Topic", {
            entityId: instance.id,
            topic: topicData.name,
            status: "failure",
          });
          addAlert("danger", message, true, "create-topic-fail");
        },
      });
    },
    [
      addAlert,
      analytics,
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
  );
};
