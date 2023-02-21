import {
  useUserAccounts,
  useAcls,
  useServiceAccounts,
  useConsumerGroups,
  useTopics,
} from "consoledot-api";
import { useRouteMatch } from "react-router-dom";
import { DataPlanePermissionsRoutePath } from "./routesConsts";
import type { DataPlanePermissionsRouteParams } from "./routesConsts";
import { useDataPlaneGate } from "./useDataPlaneGate";

export function usePermissionsGate() {
  const { instance } = useDataPlaneGate();
  const match = useRouteMatch<DataPlanePermissionsRouteParams>(
    DataPlanePermissionsRoutePath
  );
  if (!match) {
    throw Error("useEditPermissionsGate used outside the expected route");
  }
  const { data: accounts } = useUserAccounts(
    {
      id: instance.id,
      adminUrl: instance.adminUrl,
    },
    true
  );

  const { data: serviceAccounts } = useServiceAccounts(
    {
      id: instance.id,
      adminUrl: instance.adminUrl,
    },
    true
  );

  const { data: acls } = useAcls(
    {
      id: instance.id,
      adminUrl: instance.adminUrl,
    },
    true
  );

  const { data: topics } = useTopics(
    {
      id: instance.id,
      adminUrl: instance.adminUrl,
      plan: instance.plan,
    },
    true
  );

  const { data: consumerGroups } = useConsumerGroups(
    {
      id: instance.id,
      adminUrl: instance.adminUrl,
    },
    true
  );

  return {
    instance,
    accounts: accounts as NonNullable<typeof accounts>,
    acls: acls as NonNullable<typeof acls>,
    topics: topics as NonNullable<typeof topics>,
    consumerGroups: consumerGroups as NonNullable<typeof consumerGroups>,
    serviceAccounts: serviceAccounts as NonNullable<typeof serviceAccounts>,
    match,
  };
}
