import { useQueryClient } from "@tanstack/react-query";
import { fetchDedicatedClusters, fetchKafkas } from "../fetchers";
import { useKafkaInstanceTransformer } from "../queries";
import { dedicatedQueries, kafkaQueries, masQueries } from "../queryKeys";
import { useApi } from "../useApi";
import { useClustersMetaFetchQuery } from "./useClustersMetaFetchQuery";

export const useDeveloperInstanceAvailabilityFetchQuery = () => {
  const queryClient = useQueryClient();
  const { kafkasFleet, dedicatedClusters } = useApi();
  const dataMapper = useKafkaInstanceTransformer();
  const fetchClustersMeta = useClustersMetaFetchQuery();

  return (getUsername: () => Promise<string>) => {
    const fleetApi = kafkasFleet();
    const clustersApi = dedicatedClusters();
    return queryClient.fetchQuery({
      queryKey: masQueries.quota.developerAvailability(),
      queryFn: async () => {
        const username = await getUsername();
        if (!username) {
          return Promise.reject(new Error("Invalid username"));
        }
        let clusterIds: string[] = [];

        try {
          const clusterResponse = await queryClient.fetchQuery({
            queryKey: dedicatedQueries.clusters(),
            queryFn: () =>
              fetchDedicatedClusters({
                getEnterpriseOsdClusters: (...args) =>
                  clustersApi.getEnterpriseOsdClusters(...args),
                fetchClustersMeta,
              }),
          });
          clusterIds = clusterResponse.clusters.map((c) => c.id);
        } catch {
          // noop
        }

        const { instances } = await queryClient.fetchQuery({
          queryKey: kafkaQueries.list({
            direction: "desc",
            sort: "createdAt",
            name: [],
            status: [],
            owner: [username],
            perPage: 1000,
            page: 1,
            clusterIds,
            deployment: "standard",
          }),
          queryFn: () =>
            fetchKafkas({
              getKafkas: (...args) => fleetApi.getKafkas(...args),
              dataMapper,
              direction: "desc",
              sort: "createdAt",
              name: [],
              status: [],
              owner: [username],
              perPage: 1000,
              page: 1,
              clusterIds,
              deployment: "standard",
            }),
          staleTime: Infinity,
        });

        return instances.some((k) => k?.plan !== "standard") !== true;
      },
    });
  };
};
