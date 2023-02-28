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

export const TopicCreateRoute: VoidFunctionComponent<
  DataPlaneNavigationProps
> = ({ instancesHref, instanceTopicsHref }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const history = useHistory();
  const { instance } = useDataPlaneGate();
  const createTopic = useCreateTopicMutation();
  const dispatch = useDispatch();

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

  const initialTopicValues: Topic = {
    name: "",
    partitions: [{ partition: 1, id: 1 }],
    "cleanup.policy": "compact",
    "delete.retention.ms": { type: "ms", value: BigInt("86400000") },
    "max.compaction.lag.ms": { type: "ms", value: BigInt("9223372036854775807") },
    "max.message.bytes": { type: "bytes", value: BigInt("1048588") },
    "message.downconversion.enable": true,
    "message.timestamp.difference.max.ms": {
      type: "ms",
      value: BigInt("9223372036854775807"),
    },
    "message.timestamp.type": "CreateTime",
    "min.compaction.lag.ms": { type: "ms", value: BigInt("0") },
    "retention.bytes": { type: "bytes", value: BigInt("36000") },
    "retention.ms": { type: "ms", value: BigInt("604800000") },
    "segment.bytes": { type: "bytes", value: BigInt("1073741824") },
    "segment.ms": { type: "ms", value: BigInt("604800000") },
    "compression.type": "producer",
    "file.delete.delay.ms": { type: "ms", value: BigInt("60000") },
    "flush.messages": { type: "ms", value: BigInt("9223372036854775807") },
    "flush.ms": { type: "ms", value: BigInt("9223372036854775807") },
    "index.interval.bytes": { type: "bytes", value: BigInt("4096") },
    "message.format.version": "3.0-IV1",
    "min.cleanable.dirty.ratio": 0.5,
    "min.insync.replicas": 1,
    "segment.index.bytes": { type: "bytes", value: BigInt("10485760") },
    "segment.jitter.ms": { type: "ms", value: BigInt("0") },
    "unclean.leader.election.enable": false,
    preallocate: false,
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
        availablePartitionLimit={1000}
      />
    </>
  );
};
