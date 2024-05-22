import { consumerGroupTransformer } from "./ConsumerGroupTransformer";
import type { ConsumerGroup as ConsumerGroupType } from "ui-models/src/models/consumer-group";

import type { ConsumerGroup } from "@rhoas/kafka-instance-sdk";

describe("consumerGroupTransformer", () => {
  it("should return the correct value for consumer group data", () => {
    const value: ConsumerGroup = {
      groupId: "console-test",
      state: "STABLE",
      consumers: [
        {
          groupId: "console-id",
          partition: 1,
          topic: "name-test",
          offset: 1,
          logEndOffset: 1,
          lag: 0,
          memberId: "console-1",
        },
      ],
      metrics: {
        laggingPartitions: 1,
        unassignedPartitions: 0,
        activeConsumers: 1,
      },
    };
    const result: ConsumerGroupType = consumerGroupTransformer(value);
    expect(result).toBe({
      name: "console-test",
      state: "STABLE",
      consumers: {
        groupId: "console-id",
        partition: 1,
        topic: "name-test",
        offset: 1,
        logEndOffset: 1,
        lag: 0,
        memberId: "console-1",
      },
      activeConsumers: 1,
      laggingPartitions: 1,
      unassignedPartitions: 0,
    });
  });
});
