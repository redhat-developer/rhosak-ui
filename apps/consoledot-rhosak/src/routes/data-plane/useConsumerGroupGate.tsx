import { useConsumerGroup } from "consoledot-api";
import { useRouteMatch } from "react-router-dom";
import { DataPlaneConsumerGroupRoutePath } from "./routesConsts";
import type { DataPlaneConsumerGroupRouteParams } from "./routesConsts";
import { useDataPlaneGate } from "./useDataPlaneGate";

export function useConsumerGroupGate() {
  const { instance } = useDataPlaneGate();
  const match = useRouteMatch<DataPlaneConsumerGroupRouteParams>(
    DataPlaneConsumerGroupRoutePath
  );
  if (!match) {
    throw Error("useConsumerGroupGate used outside the expected route");
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
  };
}
