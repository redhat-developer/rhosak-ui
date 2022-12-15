import type {
  CloudProvider,
  CloudProviderInfo,
} from "@rhoas/app-services-ui-components";
import type { DefaultApi } from "@rhoas/kafka-management-sdk";
import type { Plan } from "ui";

export type CloudProviderInfoWithRegionsCapacity = Omit<
  CloudProviderInfo,
  "regions"
> & {
  regions: Awaited<ReturnType<typeof fetchProviderRegions>>;
};

export async function fetchProvidersWithRegions(
  getCloudProviders: DefaultApi["getCloudProviders"],
  getCloudProviderRegions: DefaultApi["getCloudProviderRegions"],
  plan: Plan
) {
  const res = await getCloudProviders();
  const allProviders = res?.data?.items || [];

  const providers = (
    await Promise.all(
      allProviders
        .filter((p) => p.enabled)
        .map(async (provider) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const regions = await fetchProviderRegions(
            getCloudProviderRegions,
            provider.id!,
            plan
          );
          const providerInfo: CloudProviderInfoWithRegionsCapacity = {
            id: provider.id as CloudProvider,
            displayName: provider.display_name!,
            regions,
          };
          return regions.length > 0 ? providerInfo : null;
        })
    )
  ).filter((p) => Boolean(p)) as CloudProviderInfoWithRegionsCapacity[];
  if (providers.length === 0) {
    throw new Error("No cloud providers with capacity found");
  }
  const firstProvider = providers[0];
  return { providers, defaultProvider: firstProvider?.id };
}

export async function fetchProviderRegions(
  getCloudProviderRegions: DefaultApi["getCloudProviderRegions"],
  provider: string,
  instanceType: Plan
) {
  const res = await getCloudProviderRegions(provider);

  if (!res?.data?.items) {
    return Promise.reject("Invalid provider");
  }

  const regionsForInstance = res.data.items.filter(
    (region) =>
      region.enabled &&
      region.capacity.some((c) => c.instance_type === instanceType)
  );

  return regionsForInstance.map((r) => {
    const max_capacity_reached = r.capacity?.some(
      (c) => c.instance_type === instanceType && c.available_sizes?.length === 0
    );

    return {
      id: r.id as CloudProvider,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      displayName: r.display_name!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      isDisabled: max_capacity_reached,
      capacity: r.capacity,
    };
  });
}
