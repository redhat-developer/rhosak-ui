import type { KafkaRequestPayload } from "@rhoas/kafka-management-sdk";
import { APIErrorCodes, isServiceApiError } from "@rhoas/kafka-management-sdk";
import type { CreateKafkaInstanceServices } from "ui";
import { useApi } from "../useApi";

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
};

/**
 * Create Kafka instance hook that creates kafka instance
 */
export const useCreateInstance =
  (): CreateKafkaInstanceServices["onCreate"] => {
    const { kafkasFleet } = useApi();

    return (data, onSuccess, onError) => {
      const runner = async () => {
        const apisService = kafkasFleet();

        try {
          const kafkaRequest = {} as KafkaRequestPayload;
          kafkaRequest.name = data.name;
          kafkaRequest.cloud_provider = data.provider;
          kafkaRequest.region = data.region;
          kafkaRequest.plan = data.plan + "." + data.sizeId;
          kafkaRequest.billing_model =
            data.billing === "prepaid"
              ? "standard"
              : data.billing !== undefined
              ? "marketplace"
              : null;
          kafkaRequest.billing_cloud_account_id =
            data.billing && data.billing !== "prepaid"
              ? data.billing.subscription
              : null;
          await apisService.createKafka(true, kafkaRequest);
          onSuccess();
        } catch (error) {
          if (isServiceApiError(error)) {
            const { code } = error?.response?.data || {};

            switch (data.plan) {
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
      };
      void runner();
    };
  };
