import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import {
  usePaginationSearchParams,
  useSortableSearchParams,
  useURLSearchParamsChips,
} from "@rhoas/app-services-ui-components";
import { KafkaInstancesSortableColumns, useKafkas } from "consoledot-api/src";
import type { FunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import type { KafkaInstanceDrawerTab, KafkaInstancesProps } from "ui";
import { ControlPlaneHeader, KafkaInstances, useKafkaLabels } from "ui";
import type { Kafka, SimplifiedStatus } from "ui-models/src/models/kafka";
import { ReadyStatuses } from "ui-models/src/models/kafka";
import { useUserControlGate } from "../../../useUserControlGate";
import { useDrawer } from "../DrawerProvider";
import {
  ControlPlaneNewInstancePath,
  ControlPlaneRouteRoot,
} from "../routesConsts";

export type KafkaInstancesRoute = Pick<
  KafkaInstancesProps<Kafka>,
  "getUrlForInstance"
>;

export const KafkaInstancesRoute: FunctionComponent<KafkaInstancesRoute> = ({
  getUrlForInstance,
}) => {
  const history = useHistory();
  const { quickStarts } = useChrome();

  const { selectedInstance, toggleExpanded, setActiveTab, isExpanded } =
    useDrawer(
      useCallback(() => {
        history.replace(`${ControlPlaneRouteRoot}`);
      }, [history])
    );

  const { userData } = useUserControlGate();

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
    KafkaInstancesSortableColumns,
    labels.fields,
    "createdAt",
    "desc"
  );

  const { data } = useKafkas({
    page,
    perPage,
    name: namesChips.chips,
    owner: ownersChips.chips,
    status: statusesChips.chips,
    sort: sort || "createdAt",
    direction: sortDirection,
  });

  const onClearAllFilters = useCallback(() => {
    namesChips.clearChained(
      ownersChips.clearChained(
        statusesChips.clearChained(setPaginationQuery(1, perPage))
      ),
      true
    );
  }, [namesChips, ownersChips, perPage, setPaginationQuery, statusesChips]);

  const openDrawer = useCallback(
    (id: string, tab: KafkaInstanceDrawerTab) => {
      if (selectedInstance === id && isExpanded) {
        toggleExpanded(false);
      } else {
        history.replace(`${ControlPlaneRouteRoot}/${id}`);
        toggleExpanded(true);
        setActiveTab(tab);
      }
    },
    [history, isExpanded, selectedInstance, setActiveTab, toggleExpanded]
  );

  const onDetailsClick: KafkaInstancesProps["onDetails"] = useCallback(
    (instance) => {
      openDrawer(instance.id, "details");
    },
    [openDrawer]
  );

  const onConnectionsClick: KafkaInstancesProps["onDetails"] = useCallback(
    (instance) => {
      openDrawer(instance.id, "connections");
    },
    [openDrawer]
  );

  const onCreate = useCallback(() => {
    history.push(`${ControlPlaneNewInstancePath}`);
  }, [history]);

  const onDelete = useCallback<KafkaInstancesProps["onDelete"]>(
    ({ id }) => {
      history.push(`${ControlPlaneRouteRoot}/${id}/delete`);
    },
    [history]
  );
  const onChangeOwner = useCallback<KafkaInstancesProps["onChangeOwner"]>(
    ({ id }) => {
      history.push(`${ControlPlaneRouteRoot}/${id}/change-owner`);
    },
    [history]
  );

  const onQuickstartGuide = useCallback(
    () => quickStarts.toggle("getting-started"),
    [quickStarts]
  );

  return (
    <>
      <ControlPlaneHeader />
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
        onChangeOwner={onChangeOwner}
        onDelete={onDelete}
        onCreate={onCreate}
        isRowSelected={({ row }) => row.id === selectedInstance}
        getUrlForInstance={getUrlForInstance}
        onDetails={onDetailsClick}
        onConnection={onConnectionsClick}
        onClickConnectionTabLink={() => {
          /* TODO */
        }}
        onClickSupportLink={() => {
          /* TODO */
        }}
        onInstanceLinkClick={() => {
          /* TODO */
        }}
        onQuickstartGuide={onQuickstartGuide}
        canHaveInstanceLink={({ status }) => ReadyStatuses.includes(status)}
        canOpenConnection={(row) => userData.canOpenConnection(row)}
        canChangeOwner={({ owner, status }) =>
          userData.canChangeOwner(owner, status)
        }
        canDelete={({ owner }) => userData.isUserOwnerOrAdmin(owner)}
      />
    </>
  );
};
