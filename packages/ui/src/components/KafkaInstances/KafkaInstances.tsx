import { Button, PageSection, Stack, StackItem } from "@patternfly/react-core";
import type { TableViewProps } from "@rhoas/app-services-ui-components";
import {
  FormatDate,
  TableView,
  Trans,
  useTranslation,
} from "@rhoas/app-services-ui-components";
import { parseISO } from "date-fns";
import { Link } from "react-router-dom";
import type { Kafka, SimplifiedStatus } from "ui-models/src/models/kafka";
import { DeletingStatuses } from "ui-models/src/models/kafka";
import { useKafkaLabels } from "../../hooks";
import { KafkaInstanceActions } from "../KafkaInstanceActions";
import { KafkaInstanceStatus } from "../KafkaInstanceStatus";
import type {
  EmptyStateNoInstancesProps,
  EmptyStateNoResultsProps,
} from "./components";
import { EmptyStateNoInstances, EmptyStateNoResults } from "./components";

const StandardColumns = [
  "name",
  "owner",
  "createdAt",
  "provider",
  "region",
  "status",
] as const;

const DedicatedColumns = [
  "name",
  "owner",
  "createdAt",
  "clusterId",
  "status",
] as const;

export type KafkaInstancesProps = {
  columns: "standard" | "dedicated";
  instances: Array<Kafka> | undefined | null;
  getUrlForInstance: (row: Kafka) => string;
  names: string[];
  owners: string[];
  statuses: string[];
  onCreate: () => void;
  onSearchName: (value: string) => void;
  onRemoveNameChip: (value: string) => void;
  onRemoveNameChips: () => void;
  onSearchOwner: (value: string) => void;
  onRemoveOwnerChip: (value: string) => void;
  onRemoveOwnerChips: () => void;
  onSearchStatus: (value: SimplifiedStatus) => void;
  onRemoveStatusChip: (value: SimplifiedStatus) => void;
  onRemoveStatusChips: () => void;
  onDetails: (row: Kafka) => void;
  onConnection: (row: Kafka) => void;
  canChangeOwner: (row: Kafka) => boolean;
  onChangeOwner: (row: Kafka) => void;
  canDelete: (row: Kafka) => boolean;
  onDelete: (row: Kafka) => void;
  onClickConnectionTabLink: (row: Kafka) => void;
  onClickSupportLink: () => void;
  onInstanceLinkClick: (row: Kafka) => void;
  canHaveInstanceLink: (row: Kafka) => boolean;
  canOpenConnection: (row: Kafka) => boolean;
} & Pick<
  TableViewProps<
    Kafka,
    (typeof StandardColumns | typeof DedicatedColumns)[number]
  >,
  | "itemCount"
  | "page"
  | "perPage"
  | "onPageChange"
  | "isRowSelected"
  | "isColumnSortable"
  | "onClearAllFilters"
> &
  Partial<
    Pick<
      TableViewProps<
        Kafka,
        (typeof StandardColumns | typeof DedicatedColumns)[number]
      >,
      "emptyStateNoData"
    >
  > &
  EmptyStateNoInstancesProps &
  EmptyStateNoResultsProps;

export const KafkaInstances = <
  Columns extends typeof StandardColumns | typeof DedicatedColumns
>({
  columns,
  instances,
  itemCount,
  page,
  perPage,
  names,
  owners,
  statuses,
  getUrlForInstance,
  isRowSelected,
  isColumnSortable,
  onPageChange,
  onDetails,
  onConnection,
  canChangeOwner,
  onChangeOwner,
  canDelete,
  onDelete,
  onCreate,
  onQuickstartGuide,
  onClickConnectionTabLink,
  onClickSupportLink,
  onInstanceLinkClick,
  onSearchName,
  onRemoveNameChip,
  onRemoveNameChips,
  onSearchOwner,
  onRemoveOwnerChip,
  onRemoveOwnerChips,
  onSearchStatus,
  onRemoveStatusChip,
  onRemoveStatusChips,
  onClearAllFilters,
  emptyStateNoData,
  canHaveInstanceLink,
  canOpenConnection,
}: KafkaInstancesProps) => {
  const { t } = useTranslation("kafka");
  const labels = useKafkaLabels();
  const breakpoint = "lg";

  const isFiltered =
    names.length > 0 || owners.length > 0 || statuses.length > 0;

  return (
    <PageSection isFilled={true}>
      <TableView
        data={instances}
        columns={columns === "standard" ? StandardColumns : DedicatedColumns}
        renderHeader={({ column, Th, key }) => (
          <Th key={key}>{labels.fields[column]}</Th>
        )}
        renderCell={({ column, row, Td, key }) => {
          const timeCreatedDate = parseISO(row.createdAt);
          const instanceLinkEnable = canHaveInstanceLink(row);
          return (
            <Td key={key} dataLabel={labels.fields[column]}>
              {(() => {
                switch (column) {
                  case "name":
                    return (
                      <Button
                        variant="link"
                        component={(props) => (
                          <Link to={getUrlForInstance(row)} {...props}>
                            {row.name}
                          </Link>
                        )}
                        isInline={true}
                        isAriaDisabled={!instanceLinkEnable}
                        isDisabled={!instanceLinkEnable}
                        onClick={() => onInstanceLinkClick(row)}
                      />
                    );
                  case "provider":
                    return labels.providers[row.provider];
                  case "createdAt":
                    return (
                      <Stack>
                        <StackItem>
                          <FormatDate
                            date={timeCreatedDate}
                            format={"distanceToNowWithAgo"}
                          />
                        </StackItem>
                        {row.expiryDate && (
                          <StackItem>
                            <Trans
                              i18nKey="will_expire_short"
                              ns={["kafka"]}
                              components={{
                                time: (
                                  <FormatDate
                                    date={parseISO(row.expiryDate)}
                                    format="expiration"
                                  />
                                ),
                              }}
                            />
                          </StackItem>
                        )}
                      </Stack>
                    );
                  case "status":
                    return (
                      <KafkaInstanceStatus
                        status={row["status"]}
                        createdAt={timeCreatedDate}
                        onClickConnectionTabLink={() =>
                          onClickConnectionTabLink(row)
                        }
                        onClickSupportLink={onClickSupportLink}
                      />
                    );
                  case "clusterId":
                    return row.clusterId;
                  default:
                    return row[column];
                }
              })()}
            </Td>
          );
        }}
        renderActions={({ row }) => {
          const changeOwnerEnabled = canChangeOwner(row);
          const deleteEnabled = canDelete(row);
          const openConnectionEnabled = canOpenConnection(row);
          return (
            <KafkaInstanceActions
              onDetails={() => onDetails(row)}
              onConnection={() => onConnection(row)}
              canOpenConnection={openConnectionEnabled}
              canChangeOwner={changeOwnerEnabled}
              onChangeOwner={() => onChangeOwner(row)}
              canDelete={deleteEnabled}
              onDelete={() => onDelete(row)}
            />
          );
        }}
        onRowClick={({ row }) => onDetails(row)}
        isColumnSortable={isColumnSortable}
        isRowSelected={isRowSelected}
        isRowDeleted={({ row }) => DeletingStatuses.includes(row["status"])}
        toolbarBreakpoint={breakpoint}
        filters={{
          [labels.fields.name]: {
            type: "search",
            chips: names,
            onSearch: onSearchName,
            onRemoveChip: onRemoveNameChip,
            onRemoveGroup: onRemoveNameChips,
            validate: (value) => /^[a-z]([-a-z0-9]*[a-z0-9])?$/.test(value),
            errorMessage: t("kafka:input_field_invalid_message"),
          },
          [labels.fields.owner]: {
            type: "search",
            chips: owners,
            onSearch: onSearchOwner,
            onRemoveChip: onRemoveOwnerChip,
            onRemoveGroup: onRemoveOwnerChips,
            validate: (value: string) => !/["$^<>|+%/;:,\s*=~#()]/.test(value),
            errorMessage: t("kafka:input_field_invalid_message"),
          },
          [labels.fields.status]: {
            type: "checkbox",
            chips: statuses,
            options: labels.statusesSimplified,
            onToggle: onSearchStatus,
            onRemoveChip: onRemoveStatusChip,
            onRemoveGroup: onRemoveStatusChips,
          },
        }}
        actions={[
          {
            label: t("create_instance"),
            onClick: onCreate,
            isPrimary: true,
          },
        ]}
        itemCount={itemCount}
        page={page}
        perPage={perPage}
        onPageChange={onPageChange}
        onClearAllFilters={onClearAllFilters}
        ariaLabel={t("table.title")}
        isFiltered={isFiltered}
        emptyStateNoData={
          emptyStateNoData || (
            <EmptyStateNoInstances
              onCreate={onCreate}
              onQuickstartGuide={onQuickstartGuide}
            />
          )
        }
        emptyStateNoResults={
          <EmptyStateNoResults onClearAllFilters={onClearAllFilters} />
        }
      />
    </PageSection>
  );
};
