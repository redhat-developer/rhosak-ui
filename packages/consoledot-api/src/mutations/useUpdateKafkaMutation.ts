import type {
  KafkaRequest,
  KafkaUpdateRequest,
} from "@rhoas/kafka-management-sdk";
import { getErrorCode, isServiceApiError } from "@rhoas/kafka-management-sdk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { AxiosError } from "axios";
import { kafkaQueries } from "../queryKeys";
import { useApi } from "../useApi";

type Errors = "invalid-user" | "other" | "unknown";

export function useUpdateKafkaMutation() {
  const { kafkasFleet } = useApi();
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<KafkaRequest>,
    { type: Errors; message?: string },
    { id: string; updates: KafkaUpdateRequest },
    unknown
  >(
    async function kafkaCreateInstance({ id, updates }) {
      const api = kafkasFleet();
      try {
        return await api.updateKafkaById(id, updates);
      } catch (error) {
        if (isServiceApiError(error)) {
          const code = getErrorCode(error);

          switch (code) {
            case "KAFKAS-MGMT-21": {
              return Promise.reject({
                type: "invalid-user",
                message: error.response?.data.reason,
              });
            }
            default: {
              return Promise.reject({
                type: "other",
                message: error.response?.data.reason,
              });
            }
          }
        } else if (error instanceof AxiosError) {
          return Promise.reject({ type: "unknown", message: error.message });
        } else {
          return Promise.reject({ type: "unknown", message: "unknown" });
        }
      }
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries([kafkaQueries._root()]);
      },
    }
  );
}
