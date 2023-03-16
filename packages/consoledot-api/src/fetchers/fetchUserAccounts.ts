import type {
  Principal,
  PrincipalApi,
} from "@redhat-cloud-services/rbac-client";
import type { UserAccount } from "ui-models/src/models/user-account";

export type FetchUserAccountsParams = {
  getUserAccounts: PrincipalApi["listPrincipals"];
};

export async function fetchUserAccounts({
  getUserAccounts,
}: FetchUserAccountsParams): Promise<{
  accounts: UserAccount[];
  count: number;
}> {
  try {
    const response = await getUserAccounts(-1);
    const accounts = response.data.data.map<UserAccount>((p) => {
      const fullObject = p as Principal;
      return {
        username: fullObject.username,
        displayName: `${fullObject.first_name || ""} ${
          fullObject.last_name || ""
        }`.trim(),
        email: fullObject.email,
        isOrgAdmin: fullObject.is_org_admin || false,
      };
    });
    const count = accounts.length;
    return { count, accounts };
  } catch {
    return { accounts: [], count: 0 };
  }
}
