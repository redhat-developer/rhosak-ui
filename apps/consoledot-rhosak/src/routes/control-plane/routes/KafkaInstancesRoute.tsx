import { QuickStartContext } from "@patternfly/quickstarts";
import {
  usePaginationSearchParams,
  useSortableSearchParams,
  useURLSearchParamsChips,
} from "@rhoas/app-services-ui-components";
import { KafkaInstancesSortableColumns, useKafkas } from "consoledot-api";
import type { FunctionComponent } from "react";
import { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import type { KafkaInstanceDrawerTab, KafkaInstancesProps } from "ui";
import { ControlPlaneHeader, KafkaInstances, useKafkaLabels } from "ui";
import type { Kafka, SimplifiedStatus } from "ui-models/src/models/kafka";
import { ReadyStatuses } from "ui-models/src/models/kafka";
import { useDrawer } from "../DrawerProvider";
import {
  ControlPlaneNewInstancePath,
  ControlPlaneRouteRoot,
} from "../routesConsts";
import { useUserControlGate } from "../../../useUserControlGate";

export type KafkaInstancesRoute = Pick<
  KafkaInstancesProps<Kafka>,
  "getUrlForInstance"
>;

export const KafkaInstancesRoute: FunctionComponent<KafkaInstancesRoute> = ({
  getUrlForInstance,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const history = useHistory();
  const { setActiveQuickStart } = useContext(QuickStartContext);

  const { selectedInstance, toggleExpanded, setActiveTab, isExpanded } =
    useDrawer(
      useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push(`${ControlPlaneNewInstancePath}`);
  }, [history]);

  const onDelete = useCallback<KafkaInstancesProps["onDelete"]>(
    ({ id }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      history.push(`${ControlPlaneRouteRoot}/${id}/delete`);
    },
    [history]
  );
  const onChangeOwner = useCallback<KafkaInstancesProps["onChangeOwner"]>(
    ({ id }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      history.push(`${ControlPlaneRouteRoot}/${id}/change-owner`);
    },
    [history]
  );

  const onQuickstartGuide = useCallback(
    () => setActiveQuickStart && setActiveQuickStart("getting-started"),
    [setActiveQuickStart]
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
