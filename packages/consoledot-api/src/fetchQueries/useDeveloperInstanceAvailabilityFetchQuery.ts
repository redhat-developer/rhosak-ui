import { useQueryClient } from "@tanstack/react-query";
import { fetchKafkas } from "../fetchers";
import { useKafkaInstanceTransformer } from "../queries";
import { kafkaQueries, masQueries } from "../queryKeys";
import { useApi } from "../useApi";

export const useDeveloperInstanceAvailabilityFetchQuery = () => {
  const queryClient = useQueryClient();
  const { kafkasFleet } = useApi();
  const dataMapper = useKafkaInstanceTransformer();

  return (getUsername: () => Promise<string>) => {
    const fleetApi = kafkasFleet();
    return queryClient.fetchQuery({
      queryKey: masQueries.quota.developerAvailability(),
      queryFn: async () => {
        const username = await getUsername();
        if (!username) {
          return Promise.reject(new Error("Invalid username"));
        }

        const { count } = await queryClient.fetchQuery({
          queryKey: kafkaQueries.list({
            direction: "desc",
            sort: "createdAt",
            name: [],
            status: [],
            owner: [username],
            perPage: 10,
            page: 1,
            instanceType: "developer",
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
              perPage: 10,
              page: 1,
              instanceType: "developer",
            }),
          staleTime: Infinity,
        });

        return count === 0;
      },
    });
  };
};
