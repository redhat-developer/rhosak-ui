import type { DefaultApi, KafkaRequest } from "@rhoas/kafka-management-sdk";
import { useQuery, useQueryClient } from "react-query";
import type { SimplifiedStatus } from "ui";
import { SimplifiedStatuses } from "ui";
import type { KafkaInstanceEnhanced } from "./kafkaRequestToKafkaInstanceEnhanched";
import { useKms } from "./useApi";
import { useKafkaInstanceTransformer } from "./useKafkaInstance";

export function useKafkaInstances(
  params: Omit<FetchKafkaInstancesParams, "dataMapper" | "getKafkas">
) {
  const queryClient = useQueryClient();
  const dataMapper = useKafkaInstanceTransformer();
  const getKms = useKms();
  const api = getKms();

  return useQuery({
    queryKey: [{ scope: "instances", entity: "list", ...params }],
    queryFn: async () => {
      const res = await fetchKafkaInstances({
        getKafkas: (...args) => api.getKafkas(...args),
        dataMapper,
        ...params,
      });
      res.instances.forEach((i) =>
        queryClient.setQueryData(
          [
            {
              scope: "kafka-instances",
              entity: "details",
              id: i.id,
            },
          ],
          i
        )
      );
      return res;
    },
    refetchInterval: 5000,
  });
}

export const SortableColumns = [
  "name",
  "owner",
  "createdAt",
  "provider",
  "region",
] as const;
export type SortableColumn = typeof SortableColumns[number];

const uiColumnMapping: { [key in SortableColumn]: keyof KafkaRequest } = {
  name: "name",
  owner: "owner",
  provider: "cloud_provider",
  region: "region",
  createdAt: "created_at",
};

type FetchKafkaInstancesParams = {
  getKafkas: DefaultApi["getKafkas"];
  dataMapper: (data: KafkaRequest) => Promise<KafkaInstanceEnhanced>;
  page: number;
  perPage: number;
  name: string[];
  owner: string[];
  status: SimplifiedStatus[];
  sort: SortableColumn;
  direction: "asc" | "desc";
};

export async function fetchKafkaInstances(
  params: FetchKafkaInstancesParams
): Promise<{
  instances: KafkaInstanceEnhanced[];
  count: number;
}> {
  const {
    name,
    status,
    owner,
    sort,
    direction,
    page,
    perPage,
    dataMapper,
    getKafkas,
  } = params;
  const search = filtersToSearch(name, owner, status);

  const res = await getKafkas(
    page.toString(10),
    perPage.toString(10),
    sort ? `${uiColumnMapping[sort]} ${direction}` : undefined,
    search
  );
  const rawInstances = res.data.items;
  const count = res.data.total;
  const instances = await Promise.all(rawInstances.map(dataMapper));
  return {
    instances,
    count,
  };
}

export function filtersToSearch(
  name: string[],
  owner: string[],
  status: SimplifiedStatus[]
): string {
  const querystring = [
    valuesToQuery("name", name, "%"),
    valuesToQuery("owner", owner, "%"),
    valuesToQuery(
      "status",
      status.flatMap((s) => SimplifiedStatuses[s]),
      "="
    ),
  ]
    .filter(Boolean)
    .map((q) => `(${q!})`)
    .join(" and ");
  return querystring;
}

function valuesToQuery(
  field: string,
  values: string[],
  comparison: "%" | "="
): string | undefined {
  return values
    .map((v) =>
      comparison === "%"
        ? `${field} like %${v.trim()}%`
        : `${field} = ${v.trim()}`
    )
    .join(" or ");
}
