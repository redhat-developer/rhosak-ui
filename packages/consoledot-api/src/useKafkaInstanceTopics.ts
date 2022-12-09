import { useQuery } from "react-query";
import type { FetchKafkaTopicsParams } from "./fetchKafkaTopics";
import { fetchKafkaTopics } from "./fetchKafkaTopics";
import { useTopics } from "./useApi";

export function useKafkaInstanceTopics({
  adminUrl,
  ...props
}: Omit<FetchKafkaTopicsParams, "getTopics"> & { adminUrl?: string }) {
  const getTopics = useTopics();

  return useQuery({
    queryKey: [
      {
        scope: "kafka-instance",
        entity: "topics",
        adminUrl,
        ...props,
      },
    ],
    queryFn: () => {
      if (!adminUrl) {
        return Promise.reject("Invalid adminUrl");
      }
      const api = getTopics(adminUrl);

      return fetchKafkaTopics({
        getTopics: (...args) => api.getTopics(...args),
        ...props,
      });
    },
    enabled: Boolean(adminUrl),
    refetchInterval: 5000,
    cacheTime: 5000,
  });
}
