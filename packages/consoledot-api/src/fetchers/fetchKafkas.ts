import type { DefaultApi, KafkaRequest } from "@rhoas/kafka-management-sdk";
import type { SimplifiedStatus } from "ui-models/src/models/kafka";
import { SimplifiedStatuses } from "ui-models/src/models/kafka";
import type { KafkaInstanceEnhanced } from "../transformers/kafkaRequestToKafkaInstanceEnhanched";
import type { KafkaInstancesSortableColumn } from "../types";
import { valuesToQuery } from "./valuesToQuery";

const uiColumnMapping: {
  [key in KafkaInstancesSortableColumn]: keyof KafkaRequest;
} = {
  name: "name",
  owner: "owner",
  provider: "cloud_provider",
  region: "region",
  createdAt: "created_at",
};
export type FetchKafkasParams = {
  getKafkas: DefaultApi["getKafkas"];
  dataMapper: (data: KafkaRequest) => Promise<KafkaInstanceEnhanced>;
  page: number;
  perPage: number;
  name: string[];
  owner: string[];
  status: SimplifiedStatus[];
  sort: KafkaInstancesSortableColumn;
  direction: "asc" | "desc";
};

export async function fetchKafkas(params: FetchKafkasParams): Promise<{
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .map((q) => `(${q!})`)
    .join(" and ");
  return querystring;
}
