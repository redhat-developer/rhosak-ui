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

  const onKafkaPageLink = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push(instancesHref);
  };

  const onKafkaInstanceLink = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push(instancesHref);
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
    "cleanup.policy": "delete",
    "delete.retention.ms": { type: "ms", value: BigInt("1") },
    "max.compaction.lag.ms": { type: "ms", value: BigInt("1") },
    "max.message.bytes": { type: "bytes", value: BigInt("9") },
    "message.downconversion.enable": false,
    "message.timestamp.difference.max.ms": {
      type: "ms",
      value: BigInt("1"),
    },
    "message.timestamp.type": "CreateTime",
    "min.compaction.lag.ms": { type: "ms", value: BigInt("1") },
    "retention.bytes": { type: "bytes", value: BigInt("9") },
    "retention.ms": { type: "ms", value: BigInt("1") },
    "segment.bytes": { type: "bytes", value: BigInt("9") },
    "segment.ms": { type: "ms", value: BigInt("1") },
    "compression.type": "producer",
    "file.delete.delay.ms": { type: "ms", value: BigInt("1") },
    "flush.messages": { type: "ms", value: BigInt("1") },
    "flush.ms": { type: "ms", value: BigInt("1") },
    "follower.replication.throttled.replicas": "optional",
    "index.interval.bytes": { type: "bytes", value: BigInt("9") },
    "leader.replication.throttled.replicas": "optional",
    "message.format.version": "abc",
    "min.cleanable.dirty.ratio": 678,
    "min.insync.replicas": 345,
    "segment.index.bytes": { type: "bytes", value: BigInt("9") },
    "segment.jitter.ms": { type: "ms", value: BigInt("1") },
    "unclean.leader.election.enable": false,
    preallocate: false,
  };

  return (
    <>
      <CreateTopic
        kafkaName={instance.name}
        onKafkaPageLink={onKafkaPageLink}
        onKafkaInstanceLink={onKafkaInstanceLink}
        onSave={onSave}
        initialTopicValues={initialTopicValues}
        onCloseCreateTopic={onCloseCreateTopic}
        checkTopicName={checkTopicName}
        availablePartitionLimit={1000}
      />
    </>
  );
};
