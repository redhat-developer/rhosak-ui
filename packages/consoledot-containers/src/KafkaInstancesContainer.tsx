import {
  usePaginationSearchParams,
  useSortableSearchParams,
  useURLSearchParamsChips,
} from "@rhoas/app-services-ui-components";
import type { FunctionComponent } from "react";
import { useCallback } from "react";
import { useQuery } from "react-query";
import type { KafkaInstance, KafkaInstancesProps, SimplifiedStatus } from "ui";
import { KafkaInstances, useKafkaLabels } from "ui";
import type { PageRoute } from "./types";
import { useKafkaInstances } from "./useKafkaInstances";

const SortableColumns = [
  "name",
  "owner",
  "createdAt",
  "provider",
  "region",
] as const;

export type KafkaInstancesContainerProps = PageRoute &
  Pick<KafkaInstancesProps<KafkaInstance>, "getUrlForInstance" | "onDetails">;

export const KafkaInstancesContainer: FunctionComponent<
  KafkaInstancesContainerProps
> = ({ getUrlForInstance, onDetails }) => {
  const fetchInstances = useKafkaInstances();

  const labels = useKafkaLabels();

  const { page, perPage, setPagination, setPaginationQuery } =
    usePaginationSearchParams();
  const resetPaginationQuery = useCallback(
    () => setPaginationQuery(1, perPage),
    [perPage, setPaginationQuery]
  );

  const namesChips = useURLSearchParamsChips("names", resetPaginationQuery);
  const ownersChips = useURLSearchParamsChips("owners", resetPaginationQuery);
  const statusesChips = useURLSearchParamsChips<SimplifiedStatus>(
    "statuses",
    resetPaginationQuery
  );

  const [isColumnSortable, sort, sortDirection] = useSortableSearchParams(
    SortableColumns,
    labels.fields,
    "createdAt",
    "desc"
  );

  const { data } = useQuery(
    [
      "instances",
      page,
      perPage,
      namesChips.chips,
      ownersChips.chips,
      statusesChips.chips,
      sort,
      sortDirection,
    ],
    () =>
      fetchInstances(
        page,
        perPage,
        {
          name: namesChips.chips,
          owner: ownersChips.chips,
          status: statusesChips.chips,
        },
        sort,
        sortDirection
      ),
    {
      refetchInterval: 5000,
    }
  );

  const onClearAllFilters = useCallback(() => {
    namesChips.clearChained(
      ownersChips.clearChained(
        statusesChips.clearChained(setPaginationQuery(1, perPage))
      ),
      true
    );
  }, [namesChips, ownersChips, perPage, setPaginationQuery, statusesChips]);

  return (
    <KafkaInstances
      instances={data?.instances}
      itemCount={data?.count}
      page={page}
      perPage={perPage}
      names={namesChips.chips}
      owners={ownersChips.chips}
      statuses={statusesChips.chips}
      isColumnSortable={isColumnSortable}
      onPageChange={setPagination}
      onSearchName={namesChips.add}
      onRemoveNameChip={namesChips.remove}
      onRemoveNameChips={namesChips.clear}
      onSearchOwner={ownersChips.add}
      onRemoveOwnerChip={ownersChips.remove}
      onRemoveOwnerChips={ownersChips.clear}
      onSearchStatus={statusesChips.toggle}
      onRemoveStatusChip={statusesChips.remove}
      onRemoveStatusChips={statusesChips.clear}
      onClearAllFilters={onClearAllFilters}
      onChangeOwner={(row) => {}}
      onDelete={(row) => {}}
      onCreate={() => {}}
      isRowSelected={() => false}
      getUrlForInstance={getUrlForInstance}
      onDetails={onDetails}
      onConnection={() => {}}
      onClickConnectionTabLink={() => {}}
      onClickSupportLink={() => {}}
      onInstanceLinkClick={() => {}}
      onQuickstartGuide={() => {}}
      canChangeOwner={() => true}
      canDelete={() => true}
    />
  );
};
