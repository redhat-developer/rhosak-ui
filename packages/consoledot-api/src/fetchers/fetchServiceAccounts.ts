import type { SecurityApi } from "@rhoas/kafka-management-sdk";
import type { Account } from "ui";
import { PrincipalType } from "ui";

export type FetchServiceAccountsParams = {
  getServiceAccounts: SecurityApi["getServiceAccounts"];
};

export async function fetchServiceAccounts({
  getServiceAccounts,
}: FetchServiceAccountsParams): Promise<{
  serviceAccounts: Account[];
}> {
  const response = await getServiceAccounts();
  const data = response.data.items;
  const serviceAccounts: Account[] = data.map((t) => {
    return {
      principalType: PrincipalType.ServiceAccount,
      id: t.id || "",
      displayName: t.name || "",
    };
  });
  return { serviceAccounts };
}
