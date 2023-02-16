import { useConsumerGroup } from "consoledot-api";
import { useRouteMatch } from "react-router-dom";
import type { DataPlaneTopicConsumerRouteParams } from "./routesConsts";
import {
  DataPlaneTopicConsumerGroupRoutePath,
  DedicatedDataPlaneTopicConsumerGroupRoutePath,
} from "./routesConsts";
import { useTopicGate } from "./useTopicGate";

export function useTopicConsumerGroupGate() {
  const { instance, topic } = useTopicGate();
  const standardMatch = useRouteMatch<DataPlaneTopicConsumerRouteParams>(
    DataPlaneTopicConsumerGroupRoutePath
  );
  const dedicatedMatch = useRouteMatch<DataPlaneTopicConsumerRouteParams>(
    DedicatedDataPlaneTopicConsumerGroupRoutePath
  );
  const match = standardMatch || dedicatedMatch;
  if (!match) {
    throw Error("useTopicConsumerGroupGate used outside the expected route");
  }
  const { data: consumerGroup } = useConsumerGroup(
    {
      id: instance.id,
      adminUrl: instance.adminUrl,
      consumerGroupId: match.params.consumerGroupId,
    },
    true
  );

  return {
    instance,
    consumerGroup: consumerGroup as NonNullable<typeof consumerGroup>,
    match,
    topic,
  };
}
