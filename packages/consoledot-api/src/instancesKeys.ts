import type { DefaultApi, KafkaRequest } from "@rhoas/kafka-management-sdk";
import type { QueryFunctionContext } from "react-query";
import { useQuery } from "react-query";
import type { EnsuredQueryKey } from "react-query/types/core/types";
import type { SimplifiedStatus } from "ui";
import { SimplifiedStatuses } from "ui";
import { fetchOrganization } from "./fetchOrganization";
import { fetchStandardQuota } from "./fetchStandardQuota";
import { useKms } from "./useApi";

export const SortableColumns = [
  "name",
  "owner",
  "createdAt",
  "provider",
  "region",
] as const;
export type SortableColumn = typeof SortableColumns[number];

export const keys = {
  list: (
    page: number,
    perPage: number,
    name: string[],
    owner: string[],
    status: SimplifiedStatus[],
    sort: SortableColumn,
    direction: "asc" | "desc"
  ) =>
    [
      {
        scope: "kafka-instances",
        page,
        perPage,
        name,
        owner,
        status,
        sort,
        direction,
      },
    ] as const,
  instance: (id: string) => [{ scope: "kafka-instance", id }],
};

export const useKafkaInstances = ([
  { page, perPage, name, owner, status, sort, direction },
]: EnsuredQueryKey<ReturnType<typeof keys["list"]>>) => {
  const { getKafkas } = useKms()();
  const organization = fetchOrganization();
  const quota = fetchStandardQuota(organization.data);

  const instancesQuery = useQuery(
    keys.list(page, perPage, name, owner, status, sort, direction),
    (...args) => fetchKafkaInstances(getKafkas, ...args)
  );
};

const uiColumnMapping: { [key in SortableColumn]: keyof KafkaRequest } = {
  name: "name",
  owner: "owner",
  provider: "cloud_provider",
  region: "region",
  createdAt: "created_at",
};
export const fetchKafkaInstances = async (
  api: DefaultApi["getKafkas"],
  {
    queryKey: [{ page, perPage, name, owner, status, sort, direction }],
    signal,
  }: QueryFunctionContext<ReturnType<typeof keys["list"]>>
) => {
  const search = filtersToSearch(name, owner, status);

  const res = await api(
    page.toString(10),
    perPage.toString(10),
    sort ? `${uiColumnMapping[sort]} ${direction}` : undefined,
    search,
    { signal }
  );
  const instances = res.data.items;
  const count = res.data.total;
  return {
    instances,
    count,
  };
};

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
    .map((q) => `(${q})`)
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
