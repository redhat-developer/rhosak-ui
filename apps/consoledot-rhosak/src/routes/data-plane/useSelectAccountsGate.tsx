import { useUserAccounts, useServiceAccounts } from "consoledot-api";
import { useRouteMatch } from "react-router-dom";
import { DataPlaneSelectAccountsRoutePath } from "./routesConsts";
import { useDataPlaneGate } from "./useDataPlaneGate";

export function useSelectAccountsGate() {
  const { instance } = useDataPlaneGate();
  const match = useRouteMatch(DataPlaneSelectAccountsRoutePath);
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

  return {
    instance,
    accounts: accounts as NonNullable<typeof accounts>,
    serviceAccounts: serviceAccounts as NonNullable<typeof serviceAccounts>,
  };
}
