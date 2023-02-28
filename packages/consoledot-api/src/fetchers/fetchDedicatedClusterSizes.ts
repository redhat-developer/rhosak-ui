import type {
  EnterpriseDataplaneClustersApi,
  SupportedKafkaSize,
} from "@rhoas/kafka-management-sdk";
import type { DedicatedSizes } from "ui";
import { apiSizeToComponentSize } from "../transformers/apiSizeToComponentSize";

export type FetchDedicatedClusterSizesParams = {
  getEnterpriseClusterById: EnterpriseDataplaneClustersApi["getEnterpriseClusterById"];
  clusterId: string;
};

export async function fetchDedicatedClusterSizes({
  getEnterpriseClusterById,
  clusterId,
}: FetchDedicatedClusterSizesParams): Promise<DedicatedSizes> {
  const response = await getEnterpriseClusterById(clusterId);
  const data = response.data as typeof response.data & { [key: string]: any }; // TODO: fix this with the latest SDK version
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
  const supportedInstanceTypes = data.supported_instance_types.instance_types;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  const sizes: DedicatedSizes = supportedInstanceTypes
    .flatMap((i: { sizes: SupportedKafkaSize[] }) => i.sizes)
    .map((s: SupportedKafkaSize) => apiSizeToComponentSize(() => false, s));
  return sizes;
}
