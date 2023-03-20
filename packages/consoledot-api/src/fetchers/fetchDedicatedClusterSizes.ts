import type {
  EnterpriseDataplaneClustersApi,
  SupportedKafkaSize,
} from "@rhoas/kafka-management-sdk";
import { apiSizeToComponentSize } from "../transformers/apiSizeToComponentSize";
import type { SizeWithLimits } from "./fetchProviderRegionSizes";

export type FetchDedicatedClusterSizesParams = {
  getEnterpriseClusterById: EnterpriseDataplaneClustersApi["getEnterpriseClusterById"];
  clusterId: string;
};

export async function fetchDedicatedClusterSizes({
  getEnterpriseClusterById,
  clusterId,
}: FetchDedicatedClusterSizesParams): Promise<SizeWithLimits[]> {
  const response = await getEnterpriseClusterById(clusterId);
  const data = response.data;
  if (!data) {
    throw new Error(`Invalid response for cluster ${clusterId}`);
  }
  const supportedInstanceTypes = data.supported_instance_types?.instance_types;
  if (!supportedInstanceTypes) {
    throw new Error(
      `Invalid response for cluster ${clusterId}, missing supported instance types`
    );
  }
  const availableSizes = supportedInstanceTypes.flatMap((i) => i.sizes);
  const sizes = availableSizes.map((s: SupportedKafkaSize) =>
    apiSizeToComponentSize(
      (id) =>
        availableSizes.find((s) => s.id === id)!.capacity_consumed! >
        (data.capacity_information?.remaining_kafka_streaming_units ===
        undefined
          ? Infinity
          : data.capacity_information?.remaining_kafka_streaming_units),
      s
    )
  );
  return sizes;
}
