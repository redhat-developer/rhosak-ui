import {
  usePaginationSearchParams,
  useSortableSearchParams,
  useURLSearchParamsChips,
} from "@rhoas/app-services-ui-components";
import {
  KafkaConsumerGroupSortableColumns,
  useConsumerGroups,
} from "consoledot-api/src";
import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { ConsumerGroups, useConsumerGroupLabels } from "ui";
import type { DataPlaneNavigationProps } from "../routesConsts";
import { useDataPlaneGate } from "../useDataPlaneGate";
import { DataPlaneHeaderConnected } from "./DataPlaneHeaderConnected";

export const ConsumerGroupsRoute: VoidFunctionComponent<
  DataPlaneNavigationProps
> = ({ instancesHref, instanceConsumerGroupsHref }) => {
  const { instance } = useDataPlaneGate();

  const history = useHistory();

  const labels = useConsumerGroupLabels();

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
    labels.fields
  );
  const { data } = useConsumerGroups({
    id: instance?.id,
    adminUrl: instance?.adminUrl,
    page,
    perPage,
    sort: sort || undefined,
    direction: sortDirection,
    groupId: consumerName.chips[0],
  });

  const onDeletConsumerGroup = useCallback(
    (groupId: string) => {
      //TODO: remove hardcode value
      history.push(
        `${instanceConsumerGroupsHref(instance.id)}/${groupId}/delete`
      );
    },
    [history, instance.id, instanceConsumerGroupsHref]
  );

  const onViewPartition = useCallback(
    (groupId: string) => {
      //TODO: remove hardcode value
      history.push(
        `${instanceConsumerGroupsHref(instance.id)}/${groupId}/view-partition`
      );
    },
    [history, instance.id, instanceConsumerGroupsHref]
  );

  const onClickResetOffset = useCallback(
    (groupId: string) => {
      //TODO: remove hardcode value
      history.push(
        `${instanceConsumerGroupsHref(instance.id)}/${groupId}/reset-offset`
      );
    },
    [history, instance.id, instanceConsumerGroupsHref]
  );
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
        onDelete={(row) => onDeletConsumerGroup(row.name)}
        onSearchConsumer={(value) => {
          consumerName.clear();
          consumerName.toggle(value);
        }}
        onClearAllFilters={consumerName.clear}
        onPageChange={setPagination}
        onRemoveConsumerChip={consumerName.clear}
        onRemoveConsumerChips={consumerName.clear}
        onViewPartition={(row) => onViewPartition(row.name)}
        onViewResetOffset={(row) => onClickResetOffset(row.name)}
      />
    </>
  );
};
