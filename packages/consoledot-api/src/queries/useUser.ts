import { useQuery } from "@tanstack/react-query";
import type { Status } from "ui-models/src/models/kafka";
import {
  DeletingStatuses,
  SuspendedStatuses,
} from "ui-models/src/models/kafka";
import { masQueries } from "../queryKeys";

export function useUser({
  getUser,
  suspense,
}: {
  getUser: () => Promise<{
    username: string | undefined;
    isOrgAdmin: boolean | undefined;
  }>;
  suspense: boolean;
}) {
  return useQuery({
    queryKey: masQueries.user(),
    queryFn: async () => {
      const { username, isOrgAdmin } = await getUser();

      if (username === undefined) {
        return Promise.reject("Invalid username");
      }

      if (isOrgAdmin === undefined) {
        return Promise.reject("Invalid username");
      }

      const canOpenConnection = (status: Status): boolean => {
        return ![...SuspendedStatuses, ...DeletingStatuses].includes(status);
      };

      const isUserOwnerOrAdmin = (owner: string) => {
        return owner === username || isOrgAdmin;
      };

      const canChangeOwner = (owner: string, status: Status) => {
        return (
          owner === username ||
          (isOrgAdmin && !SuspendedStatuses.includes(status))
        );
      };

      return {
        username,
        isOrgAdmin,
        canOpenConnection,
        isUserOwnerOrAdmin,
        canChangeOwner,
      };
    },
    suspense,
  });
}
