import { useQueryClient } from "@tanstack/react-query";
import { fetchKafkaInstances } from "../fetchers";
import { useKafkaInstanceTransformer } from "../queries";
import { kafkaQueries, masQueries } from "../queryKeys";
import { useApi } from "../useApi";

export const useDeveloperInstanceAvailabilityFetchQuery = () => {
  const queryClient = useQueryClient();
  const { kafkasFleet } = useApi();
  const dataMapper = useKafkaInstanceTransformer();

  return (getUsername: () => Promise<string>) => {
    const api = kafkasFleet();
    return queryClient.fetchQuery({
      queryKey: masQueries.quota.developerAvailability(),
      queryFn: async () => {
        const username = await getUsername();
        if (!username) {
          return Promise.reject(new Error("Invalid username"));
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
          }),
          queryFn: () =>
            fetchKafkaInstances({
              getKafkas: (...args) => api.getKafkas(...args),
              dataMapper,
              direction: "desc",
              sort: "createdAt",
              name: [],
              status: [],
              owner: [username],
              perPage: 1000,
              page: 1,
            }),
          staleTime: Infinity,
        });

        return instances.some((k) => k?.plan !== "standard") !== true;
      },
    });
  };
};
