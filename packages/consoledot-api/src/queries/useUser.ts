import { useQuery } from "@tanstack/react-query";
import { masQueries } from "../queryKeys";
import type { KafkaInstanceEnhanced } from "consoledot-api/src/transformers/kafkaRequestToKafkaInstanceEnhanched";
import {
  DeletingStatuses,
  SuspendedStatuses,
} from "ui-models/src/models/kafka";
import type { Status } from "ui-models/src/models/kafka";

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

      const canOpenConnection = (instance: KafkaInstanceEnhanced): boolean => {
        return instance
          ? !SuspendedStatuses.includes(instance.status) ||
              !DeletingStatuses.includes(instance.status)
          : false;
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
