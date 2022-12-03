import { useCallback } from "react";
import { useQuery } from "react-query";
import { fetchOrganization } from "./fetchOrganization";
import { fetchStandardQuota } from "./fetchStandardQuota";
import { kafkaRequestToKafkaInstanceEnhanched } from "./kafkaRequestToKafkaInstanceEnhanched";
import { useKms } from "./useApi";
import { fetchKafkaInstances } from "./useKafkaInstances";

export const useDeveloperInstanceAvailability = (
  username: string | undefined
) => {
  const getKms = useKms();
  const organization = fetchOrganization();
  const quota = fetchStandardQuota(organization.data);

  return useQuery({
    queryKey: ["developer-availability", username],
    enabled: Boolean(username),
    queryFn: async () => {
      if (!username) {
        return Promise.reject(new Error("Invalid username"));
      }
      if (!quota.data) {
        return Promise.reject(new Error("Invalid quota"));
      }
      const { instances } = await fetchKafkaInstances({
        apisService: getKms(),
        direction: "desc",
        sort: "createdAt",
        name: [],
        status: [],
        owner: [username],
        perPage: 1000,
        page: 1,
      });

      return instances.some((k) => k?.plan !== "standard");
    },
    select: useCallback(
      ({ instances, count }) => ({
        instances: instances.map((instance) =>
          kafkaRequestToKafkaInstanceEnhanched(
            instance,
            quota.data.marketplaceSubscriptions,
            [],
            []
          )
        ),
      }),
      [quota.data.marketplaceSubscriptions]
    ),
    refetchInterval: 5000,
  });
};
