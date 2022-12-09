import {
  usePaginationSearchParams,
  useSortableSearchParams,
  useURLSearchParamsChips,
} from "@rhoas/app-services-ui-components";
import {
  KafkaTopicsSortableColumns,
  useKafkaInstance,
  useKafkaInstanceTopics,
} from "consoledot-api";
import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import { KafkaTopics } from "ui";
import type { DataPlaneRouteProps } from "../routes";
import { DataPlaneHeaderConnected } from "./DataPlaneHeaderConnected";
import { useDataPlaneRouteMatch } from "./UseDataPlaneRouteMatch";

export const TopicsRoute: VoidFunctionComponent<DataPlaneRouteProps> = ({
  instancesHref,
}) => {
  const { params } = useDataPlaneRouteMatch();
  const { data: instance } = useKafkaInstance(params.id);
  const { page, perPage, setPagination, setPaginationQuery } =
    usePaginationSearchParams();
  const resetPaginationQuery = useCallback(
    () => setPaginationQuery(1, perPage),
    [perPage, setPaginationQuery]
  );

  const topicsChips = useURLSearchParamsChips("topics", resetPaginationQuery);
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
  const { data } = useKafkaInstanceTopics({
    adminUrl: instance?.adminUrl,
    page,
    perPage,
    sort: sort!,
    direction: sortDirection,
    filter: topicsChips.chips[0],
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
        topicName={topicsChips.chips}
        getUrlFortopic={(row) => `/${row.topic_name}`}
        isColumnSortable={isColumnSortable}
        onDelete={() => {}}
        onEdit={() => {}}
        onSearchTopic={(value) => {
          topicsChips.clear();
          topicsChips.toggle(value);
        }}
        onClearAllFilters={topicsChips.clear}
        onCreateTopic={() => {}}
        onPageChange={() => {}}
        onRemoveTopicChip={topicsChips.clear}
        onRemoveTopicChips={topicsChips.clear}
        onTopicLinkClick={() => {}}
      />
    </>
  );
};
