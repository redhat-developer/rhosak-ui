import type { VoidFunctionComponent } from "react";
import { CreateTopic, TopicProperties } from "ui";
import type { DataPlaneTopicNavigationProps } from "../routesConsts";
import { useTopicGate } from "../useTopicGate";
import { DataPlaneTopicHeaderConnected } from "./DataPlaneTopicHeaderConnected";
import { Topic } from 'ui-models/src/models/topic';
import { ControlPlaneNavigationProps } from '../../control-plane/routesConsts';

export const CreateTopicRoute: VoidFunctionComponent<
  ControlPlaneNavigationProps
> = ({
  instancesHref,
}) => {
    const { instance, topic } = useTopicGate();


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
    }


    const checkTopicName = async () => {
      return true
    }

    return (
      <>
        <CreateTopic
          kafkaName={instance.name}
          kafkaPageLink={''}
          kafkaInstanceLink={''}
          onSave={() => { }}
          initialTopicValues={initialTopicValues}
          onCloseCreateTopic={() => { }}
          checkTopicName={checkTopicName} availablePartitionLimit={0} />
      </>
    );
  };
