import {
  usePaginationSearchParams,
  useSortableSearchParams,
  useURLSearchParamsChips,
} from "@rhoas/app-services-ui-components";
import { KafkaTopicsSortableColumns, useTopics } from "consoledot-api";
import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import { KafkaTopics } from "ui";
import type { ControlPlaneNavigationProps } from "../../control-plane/routesConsts";
import { useDataPlaneGate } from "../useDataPlaneGate";
import { DataPlaneHeaderConnected } from "./DataPlaneHeaderConnected";

export const TopicsRoute: VoidFunctionComponent<
  ControlPlaneNavigationProps
> = ({ instancesHref }) => {
  const { instance } = useDataPlaneGate(instancesHref);
  const { page, perPage, setPagination, setPaginationQuery } =
    usePaginationSearchParams();
  const resetPaginationQuery = useCallback(
    () => setPaginationQuery(1, perPage),
    [perPage, setPaginationQuery]
  );

  const topicChips = useURLSearchParamsChips("topic", resetPaginationQuery);
  const [isColumnSortable, sort, sortDirection] = useSortableSearchParams(
    KafkaTopicsSortableColumns,
    {
      name: "TODO name",
      partitions: "TODO partitions",
      "retention.bytes": "TODO retention bytes",
      "retention.ms": "TODO retention ms",
    },
    "name",
    "desc"
  );
  const { data } = useTopics({
    id: instance?.id,
    adminUrl: instance?.adminUrl,
    page,
    perPage,
    sort: sort!,
    direction: sortDirection,
    filter: topicChips.chips[0],
    plan: instance.plan,
  });
  return (
    <>
      <DataPlaneHeaderConnected
        instancesHref={instancesHref}
        activeSection={"topics"}
      />
      <KafkaTopics
        topics={data?.topics}
        itemCount={data?.count}
        page={page}
        perPage={perPage}
        topicName={topicChips.chips}
        getUrlFortopic={(row) => `./topics/${row.name}`}
        isColumnSortable={isColumnSortable}
        onDelete={() => {}}
        onEdit={() => {}}
        onSearchTopic={(value) => {
          topicChips.clear();
          topicChips.toggle(value);
        }}
        onClearAllFilters={topicChips.clear}
        onCreateTopic={() => {}}
        onPageChange={setPagination}
        onRemoveTopicChip={topicChips.clear}
        onRemoveTopicChips={topicChips.clear}
        onTopicLinkClick={() => {}}
      />
    </>
  );
};
