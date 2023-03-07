import { useQuery } from "@tanstack/react-query";
import { masQueries } from "../queryKeys";
import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import type { KafkaInstanceEnhanced } from "consoledot-api/src/transformers/kafkaRequestToKafkaInstanceEnhanched";
import { ReadyStatuses, SuspendedStatuses } from "ui-models/src/models/kafka";
import type { Status } from "ui-models/src/models/kafka";

export function useUser(suspense = false) {
  const { auth } = useChrome();

  return useQuery({
    queryKey: masQueries.user(),
    queryFn: async () => {
      const user = await auth.getUser();
      const username = user?.identity?.user?.username;
      const isOrgAdmin = user?.identity?.user?.is_org_admin;

      if (username === undefined) {
        return Promise.reject("Invalid username");
      }

      if (isOrgAdmin === undefined) {
        return Promise.reject("Invalid username");
      }

      const canOpenConnection = (instance: KafkaInstanceEnhanced): boolean => {
        return instance ? ReadyStatuses.includes(instance.status) : false;
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
