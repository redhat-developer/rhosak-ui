import type { KafkaRequestPayload } from "@rhoas/kafka-management-sdk";
import { APIErrorCodes, isServiceApiError } from "@rhoas/kafka-management-sdk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateKafkaFormData, CreateKafkaInstanceError } from "ui";
import { kafkaQueries, masQueries } from "../queryKeys";
import { useApi } from "../useApi";

export function useKafkaCreateInstanceMutation() {
  const { kafkasFleet } = useApi();
  const queryClient = useQueryClient();

  return useMutation(
    async function kafkaCreateInstance(props: {
      instance: CreateKafkaFormData;
      onSuccess: () => void;
      onError: (error: CreateKafkaInstanceError) => void;
    }) {
      const { instance, onSuccess, onError } = props;
      const api = kafkasFleet();
      const kafkaRequest: KafkaRequestPayload = {
        name: instance.name,
        cloud_provider: instance.provider,
        region: instance.region,
      };
      kafkaRequest.plan = instance.plan + "." + instance.sizeId;
      kafkaRequest.billing_model =
        instance.billing === "prepaid"
          ? "standard"
          : instance.billing !== undefined
          ? "marketplace"
          : null;
      kafkaRequest.billing_cloud_account_id =
        instance.billing && instance.billing !== "prepaid"
          ? instance.billing.subscription
          : null;
      try {
        await api.createKafka(true, kafkaRequest);
        onSuccess();
      } catch (error) {
        if (isServiceApiError(error)) {
          const { code } = error?.response?.data || {};

          switch (instance.plan) {
            case "developer":
              switch (code) {
                case ErrorCodes.DUPLICATE_INSTANCE_NAME:
                  onError("name-taken");
                  break;

                // regardless of the error, let's not give too many details to trial users
                default:
                  onError("developer-unavailable");
                  break;
              }
              break;

            case "standard":
              switch (code) {
                case ErrorCodes.DUPLICATE_INSTANCE_NAME:
                  onError("name-taken");
                  break;

                case ErrorCodes.INTERNAL_CAPACITY_ERROR:
                  onError("region-unavailable");
                  break;

                case ErrorCodes.INSUFFICIENT_QUOTA:
                  onError("insufficient-quota");
                  break;

                default:
                  console.error(
                    "useAvailableProvidersAndDefault",
                    "createKafka unknown error",
                    error
                  );
                  onError("unknown");
              }
              break;
          }
        } else {
          console.error(
            "useAvailableProvidersAndDefault",
            "createKafka unexpected error",
            error
          );
        }
      }
    },
    {
      onSuccess: () => {
        void queryClient.invalidateQueries([kafkaQueries._root()]);
        void queryClient.invalidateQueries([masQueries.quota._root()]);
      },
    }
  );
}

const ErrorCodes = {
  /** Forbidden to perform this action*/
  UNAUTHORIZED_USER: APIErrorCodes.ERROR_4,
  /** Kafka cluster name is already used*/
  DUPLICATE_INSTANCE_NAME: APIErrorCodes.ERROR_36,
  /** The maximum number of allowed kafka instances has been reached*/
  INTERNAL_CAPACITY_ERROR: APIErrorCodes.ERROR_24,
  /** Insufficient quota*/
  INSUFFICIENT_QUOTA: APIErrorCodes.ERROR_120,
  /** Forbidden to create more instances than the maximum allowed*/
  TRIAL_USED: APIErrorCodes.ERROR_5,
  /** Failed to check quota*/
  FAILED_TO_CHECK_QUOTA: APIErrorCodes.ERROR_121,
  /** Bad request*/
  OWNER_DOES_NOT_EXIST: APIErrorCodes.ERROR_21,
} as const;
