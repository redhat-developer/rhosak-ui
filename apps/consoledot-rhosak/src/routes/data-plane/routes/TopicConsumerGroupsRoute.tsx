import {
  usePaginationSearchParams,
  useSortableSearchParams,
  useURLSearchParamsChips,
} from "@rhoas/app-services-ui-components";
import {
  KafkaConsumerGroupSortableColumns,
  useConsumerGroups,
} from "consoledot-api";
import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import { ConsumerGroups, useConsumerGroupLabels } from "ui";
import type { DataPlaneNavigationProps } from "../routesConsts";
import { useTopicGate } from "../useTopicGate";
import { DataPlaneTopicHeaderConnected } from "./DataPlaneTopicHeaderConnected";
import { ControlPlaneRouteRoot } from "../../control-plane/routesConsts";
import { useHistory } from "react-router-dom";

export const TopicConsumerGroupsRoute: VoidFunctionComponent<
  DataPlaneNavigationProps
> = ({ instanceDetailsHref, instanceTopicsHref, instancesHref }) => {
  const { instance, topic } = useTopicGate();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
    topic: topic.name,
  });

  const onDeletConsumerGroup = useCallback(
    (groupId: string) => {
      //TODO: remove hardcode value
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      history.push(
        `${ControlPlaneRouteRoot}/${instance.id}/details/topics/${topic.name}/consumer-groups/${groupId}/delete`
      );
    },
    [history, instance.id, topic.name]
  );

  const onViewPartition = useCallback(
    (groupId: string) => {
      //TODO: remove hardcode value
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      history.push(
        `${ControlPlaneRouteRoot}/${instance.id}/details/topics/${topic.name}/consumer-groups/${groupId}/view-partition`
      );
    },
    [history, instance.id, topic.name]
  );

  const onClickResetOffset = useCallback(
    (groupId: string) => {
      //TODO: remove hardcode value
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      history.push(
        `${ControlPlaneRouteRoot}/${instance.id}/details/topics/${topic.name}/consumer-groups/${groupId}/reset-offset`
      );
    },
    [history, instance.id, topic.name]
  );

  return (
    <>
      <DataPlaneTopicHeaderConnected
        instancesHref={instancesHref}
        instanceDetailsHref={instanceDetailsHref}
        instanceTopicsHref={instanceTopicsHref}
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
