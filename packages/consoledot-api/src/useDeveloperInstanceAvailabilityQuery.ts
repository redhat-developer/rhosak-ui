import { useQueryClient } from "@tanstack/react-query";
import { fetchKafkaInstances } from "./fetchKafkaInstances";
import { kafkaQueries, masQueries } from "./queryKeys";
import { useKms } from "./useApi";
import { useKafkaInstanceTransformer } from "./useKafkaInstanceTransformer";

export const useDeveloperInstanceAvailabilityQuery = () => {
  const queryClient = useQueryClient();
  const getKms = useKms();
  const dataMapper = useKafkaInstanceTransformer();

  return (getUsername: () => Promise<string>) => {
    const api = getKms();
    return queryClient.fetchQuery({
      queryKey: masQueries.developerAvailability(),
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
