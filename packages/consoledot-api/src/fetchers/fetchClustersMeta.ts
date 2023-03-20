import type { DedicatedClusterMeta } from "ui-models/src/models/dedicated-cluster";
import type { CloudProvider } from "ui-models/src/models/kafka";

export async function fetchClustersMeta(
  basePath: string,
  accessToken: string,
  clusterIds: string[]
): Promise<{
  [id: string]: DedicatedClusterMeta;
}> {
  const url = `${basePath}/api/clusters_mgmt/v1/clusters?size=${
    clusterIds.length
  }&search=(${clusterIds.map((id) => `id='${id}'`).join(" or ")})`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = (await response.json()) as {
    items: {
      id: string;
      name: string;
      display_name: string;
      cloud_provider: { id: string; display_name: string };
      region: {
        id: string;
        display_name: string;
      };
    }[];
  };
  const clusters = data.items;
  return Object.fromEntries(
    clusters.map((c) => [
      c.id,
      {
        name: c.display_name || c.name,
        cloudProvider: {
          id: c.cloud_provider.id as CloudProvider,
          displayName: c.cloud_provider.display_name || c.cloud_provider.id,
        },
        cloudRegion: {
          id: c.region.id,
          displayName: c.region.display_name || c.region.id,
        },
      },
    ])
  ) as {
    [id: string]: DedicatedClusterMeta;
  };
}
