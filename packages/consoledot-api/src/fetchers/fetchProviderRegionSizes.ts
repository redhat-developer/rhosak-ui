import type { Size } from "@rhoas/app-services-ui-components";
import type {
  DefaultApi,
  SupportedKafkaSize,
} from "@rhoas/kafka-management-sdk";
import type { Plan } from "ui-models/src/models/kafka";
import type { CloudProviderInfoWithRegionsCapacity } from "./fetchProvidersWithRegions";

export type SizeWithLimits = Size & { trialDurationHours: number };

export async function fetchProviderRegionSizes(
  api: DefaultApi["getInstanceTypesByCloudProviderAndRegion"],
  providerInfo: CloudProviderInfoWithRegionsCapacity,
  region: string,
  instanceType: Plan
) {
  const regions = providerInfo.regions;
  const regionInfo = regions.find((r) => r.id === region);
  const availableSizes =
    regionInfo?.capacity.flatMap((c) =>
      c.available_sizes.map((s) => `${c.instance_type}.${s}`)
    ) || [];
  const sizes = await api(providerInfo.id, region);
  if (!sizes?.data?.instance_types) {
    throw new Error(`No instance_types from backend`);
  }

  const standardSizes =
    sizes?.data?.instance_types.find((i) => i.id === instanceType)?.sizes || [];

  return standardSizes.map(
    apiSizeToComponentSize.bind(
      undefined,
      (id) => !availableSizes.includes(`${instanceType}.${id}`)
    )
  );
}

//
// export async function fetchProviderRegionSizesForPlanStandard (
//   api: DefaultApi['getInstanceTypesByCloudProviderAndRegion'], providerInfo: CloudProviderInfoWithRegionsCapacity, region: string
// )  {
//   return fetchProviderRegionSizes(api, providerInfo, region, "standard");
// };
//
// export const fetchProviderRegionSizesForPlanDeveloper = (
//   api: DefaultApi['getInstanceTypesByCloudProviderAndRegion'], providerInfo: CloudProviderInfoWithRegionsCapacity, region: string
//
// ) => {
//   const { data: standardSizes, isError } = await fetchProviderRegionSizes(
//     provider,
//     region,
//     "standard"
//   );
//   const { data: developerSizes } = fetchProviderRegionSizes(
//     provider,
//     region,
//     "developer"
//   );
//   return useQuery({
//     queryKey: [],
//     queryFn: () => {
//       return {
//         standard:
//           standardSizes ||
//           ([
//             { id: "1", displayName: "1" },
//             { id: "2", displayName: "2" },
//           ] as StandardSizes),
//         trial: developerSizes![0],
//       };
//     },
//     enabled: (!!standardSizes || isError) && !!developerSizes,
//   });
// };

function apiSizeToComponentSize(
  isDisabled: (id: string) => boolean,
  apiSize: SupportedKafkaSize
): SizeWithLimits {
  const s = apiSize as Required<SupportedKafkaSize>;
  return {
    id: s.id,
    displayName: s.display_name,
    quota: s.quota_consumed,
    ingress: (s.ingress_throughput_per_sec.bytes || 0) / 1048576,
    egress: (s.egress_throughput_per_sec.bytes || 0) / 1048576,
    storage: Math.round((s.max_data_retention_size.bytes || 0) / 1073741824),
    connections: s.total_max_connections,
    connectionRate: s.max_connection_attempts_per_sec,
    maxPartitions: s.max_partitions,
    messageSize: (s.max_message_size.bytes || 0) / 1048576,
    status: s.maturity_status === "stable" ? "stable" : "preview",
    trialDurationHours: s.lifespan_seconds ? s.lifespan_seconds / 60 / 60 : 0,
    isDisabled: isDisabled(s.id),
  };
}
