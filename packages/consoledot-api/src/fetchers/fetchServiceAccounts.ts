import type { ServiceAccountsApi } from "@rhoas/service-accounts-sdk";
import type { Account } from "ui";
import { PrincipalType } from "ui";

export type FetchServiceAccountsParams = {
  getServiceAccounts: ServiceAccountsApi["getServiceAccounts"];
};

export async function fetchServiceAccounts({
  getServiceAccounts,
}: FetchServiceAccountsParams): Promise<{
  serviceAccounts: Account[];
}> {
  const response = await getServiceAccounts(-1);
  const data = response.data;
  const serviceAccounts: Account[] = data.map((t) => {
    return {
      principalType: PrincipalType.ServiceAccount,
      id: t.id || "",
      displayName: t.name || "",
    };
  });
  return { serviceAccounts };
}
