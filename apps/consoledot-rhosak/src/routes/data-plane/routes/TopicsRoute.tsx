import {
  usePaginationSearchParams,
  useSortableSearchParams,
  useURLSearchParamsChips,
} from "@rhoas/app-services-ui-components";
import { KafkaTopicsSortableColumns, useTopics } from "consoledot-api/src";
import type { VoidFunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { KafkaTopics, useTopicLabels } from "ui";
import type { ControlPlaneNavigationProps } from "../../control-plane/routesConsts";
import { ControlPlaneRouteRoot } from "../../control-plane/routesConsts";
import { useDataPlaneGate } from "../useDataPlaneGate";
import { DataPlaneHeaderConnected } from "./DataPlaneHeaderConnected";

export const TopicsRoute: VoidFunctionComponent<
  ControlPlaneNavigationProps
> = ({ instancesHref }) => {
  const labels = useTopicLabels();

  const history = useHistory();

  const { instance } = useDataPlaneGate();
  const { page, perPage, setPagination, setPaginationQuery } =
    usePaginationSearchParams();
  const resetPaginationQuery = useCallback(
    () => setPaginationQuery(1, perPage),
    [perPage, setPaginationQuery]
  );

  const onCreate = useCallback(() => {
    history.push(
      `${ControlPlaneRouteRoot}/${instance.id}/details/topics/create-topic`
    );
  }, [history, instance.id]);

  const topicChips = useURLSearchParamsChips("topic", resetPaginationQuery);
  const [isColumnSortable, sort, sortDirection] = useSortableSearchParams(
    KafkaTopicsSortableColumns,
    labels.fields
  );
  const { data } = useTopics({
    id: instance?.id,
    adminUrl: instance?.adminUrl,
    page,
    perPage,
    sort: sort || undefined,
    direction: sortDirection,
    filter: topicChips.chips[0],
    plan: instance.plan,
  });

  const onDeleteTopic = useCallback(
    (topicName: string) => {
      //TODO: remove hardcode value
      history.push(
        `${ControlPlaneRouteRoot}/${instance.id}/details/topics/${topicName}/delete`
      );
    },
    [history, instance.id]
  );

  const onEditTopic = useCallback(
    (topicName: string) => {
      //TODO: remove hardcode value
      history.push(
        `${ControlPlaneRouteRoot}/${instance.id}/details/topics/${topicName}/edit`
      );
    },
    [history, instance.id]
  );
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
        onDelete={(row) => onDeleteTopic(row.name)}
        onEdit={(row) => onEditTopic(row.name)}
        onSearchTopic={(value) => {
          topicChips.clear();
          topicChips.toggle(value);
        }}
        onClearAllFilters={topicChips.clear}
        onCreateTopic={onCreate}
        onPageChange={setPagination}
        onRemoveTopicChip={topicChips.clear}
        onRemoveTopicChips={topicChips.clear}
      />
    </>
  );
};
