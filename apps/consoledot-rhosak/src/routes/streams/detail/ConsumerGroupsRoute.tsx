import {
  usePaginationSearchParams,
  useSortableSearchParams,
  useURLSearchParamsChips
} from "@rhoas/app-services-ui-components";
import { KafkaConsumerGroupSortableColumns, useKafkaInstance, useKafkaInstanceConsumerGroups } from "consoledot-api";
import { useCallback } from "react";
import type { VoidFunctionComponent } from "react";
import { ConsumerGroups } from "ui";
import type { DataPlaneRouteProps } from "../routes";
import { DataPlaneHeaderConnected } from "./DataPlaneHeaderConnected";
import { useDataPlaneRouteMatch } from "./UseDataPlaneRouteMatch";

export const ConsumerGroupsRoute: VoidFunctionComponent<
  DataPlaneRouteProps
> = ({ instancesHref }) => {
  const { params } = useDataPlaneRouteMatch();
  const { data: instance } = useKafkaInstance(params.id);
  const { page, perPage, setPagination, setPaginationQuery } =
    usePaginationSearchParams();
  const resetPaginationQuery = useCallback(
    () => setPaginationQuery(1, perPage),
    [perPage, setPaginationQuery]
  );

  const consumerName = useURLSearchParamsChips("consumer", resetPaginationQuery);
  const [isColumnSortable, sort, sortDirection] = useSortableSearchParams(
    KafkaConsumerGroupSortableColumns,
    {
      name: "TODO name"
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
  });
  return (
    <>
      <DataPlaneHeaderConnected
        instancesHref={instancesHref}
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
        onViewResetOffset={()=>{}}
      />
    </>
  )
};
