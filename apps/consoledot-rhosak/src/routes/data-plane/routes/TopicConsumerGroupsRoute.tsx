import {
  usePaginationSearchParams,
  useSortableSearchParams,
  useURLSearchParamsChips,
} from "@rhoas/app-services-ui-components";
import {
  KafkaConsumerGroupSortableColumns,
  useKafkaInstanceConsumerGroups,
} from "consoledot-api";
import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import { ConsumerGroups } from "ui";
import type { DataPlaneNavigationProps } from "../routesConsts";
import { useTopicGate } from "../useTopicGate";
import { DataPlaneTopicHeaderConnected } from "./DataPlaneTopicHeaderConnected";

export const TopicConsumerGroupsRoute: VoidFunctionComponent<
  DataPlaneNavigationProps
> = ({ instanceDetailsHref, instancesHref }) => {
  const { instance, topic } = useTopicGate(instancesHref, instanceDetailsHref);

  const { page, perPage, setPagination, setPaginationQuery } =
    usePaginationSearchParams();

  const resetPaginationQuery = useCallback(
    () => setPaginationQuery(1, perPage),
    [perPage, setPaginationQuery]
  );

  const consumerName = useURLSearchParamsChips(
    "consumer",
    resetPaginationQuery
  );
  const [isColumnSortable, sort, sortDirection] = useSortableSearchParams(
    KafkaConsumerGroupSortableColumns,
    {
      name: "TODO name",
    },
    "name",
    "desc"
  );

  const { data } = useKafkaInstanceConsumerGroups({
    id: instance?.id,
    adminUrl: instance?.adminUrl,
    page,
    perPage,
    sort: sort!,
    direction: sortDirection,
    groupId: consumerName.chips[0],
    topic: topic.name,
  });

  return (
    <>
      <DataPlaneTopicHeaderConnected
        instancesHref={instancesHref}
        instanceDetailsHref={instanceDetailsHref}
        activeSection={"consumer"}
      />
      <ConsumerGroups
        consumers={data?.groups}
        itemCount={data?.count}
        page={page}
        perPage={perPage}
        consumerName={consumerName.chips}
        isRowSelected={() => false}
        isColumnSortable={isColumnSortable}
        onDelete={() => {}}
        onSearchConsumer={(value) => {
          consumerName.clear();
          consumerName.toggle(value);
        }}
        onClearAllFilters={consumerName.clear}
        onPageChange={setPagination}
        onRemoveConsumerChip={consumerName.clear}
        onRemoveConsumerChips={consumerName.clear}
        onViewPartition={() => {}}
        onViewResetOffset={() => {}}
      />
    </>
  );
};
