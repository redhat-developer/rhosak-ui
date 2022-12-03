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
import { useKafkaLabels } from "../../hooks";
import type { KafkaInstance, SimplifiedStatus } from "../../types";
import { DeletingStatuses } from "../../types";
import { KafkaInstanceActions } from "../KafkaInstanceActions";
import { KafkaInstanceStatus } from "../KafkaInstanceStatus";
import type {
  EmptyStateNoInstancesProps,
  EmptyStateNoResultsProps,
} from "./components";
import { EmptyStateNoInstances, EmptyStateNoResults } from "./components";

const Columns = [
  "name",
  "owner",
  "createdAt",
  "provider",
  "region",
  "status",
] as const;

export type KafkaInstancesProps<T extends KafkaInstance> = {
  instances: Array<T> | undefined | null;
  getUrlForInstance: (row: T) => string;
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
  onDetails: (row: T) => void;
  onConnection: (row: T) => void;
  canChangeOwner: (row: T) => boolean;
  onChangeOwner: (row: T) => void;
  canDelete: (row: T) => boolean;
  onDelete: (row: T) => void;
  onClickConnectionTabLink: (row: T) => void;
  onClickSupportLink: () => void;
  onInstanceLinkClick: (row: T) => void;
} & Pick<
  TableViewProps<T, typeof Columns[number]>,
  | "itemCount"
  | "page"
  | "perPage"
  | "onPageChange"
  | "isRowSelected"
  | "isColumnSortable"
  | "onClearAllFilters"
> &
  EmptyStateNoInstancesProps &
  EmptyStateNoResultsProps;

export const KafkaInstances = <T extends KafkaInstance>({
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
}: KafkaInstancesProps<T>) => {
  const { t } = useTranslation("kafka");
  const labels = useKafkaLabels();
  const breakpoint = "lg";

  const isFiltered =
    names.length > 0 || owners.length > 0 || statuses.length > 0;

  return (
    <PageSection isFilled={true}>
      <TableView
        data={instances}
        columns={Columns}
        renderHeader={({ column, Th, key }) => (
          <Th key={key}>{labels.fields[column]}</Th>
        )}
        renderCell={({ column, row, Td, key }) => {
          const timeCreatedDate = parseISO(row.createdAt);
          return (
            <Td key={key} dataLabel={labels.fields[column]}>
              {(() => {
                switch (column) {
                  case "name":
                    return (
                      <Button
                        isInline={true}
                        variant="link"
                        component={(props) => (
                          <Link to={getUrlForInstance(row)} {...props}>
                            {row.name}
                          </Link>
                        )}
                        isDisabled={DeletingStatuses.includes(row["status"])}
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
          return (
            <KafkaInstanceActions
              onDetails={() => onDetails(row)}
              onConnection={() => onConnection(row)}
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
          <EmptyStateNoInstances
            onCreate={onCreate}
            onQuickstartGuide={onQuickstartGuide}
          />
        }
        emptyStateNoResults={
          <EmptyStateNoResults onClearAllFilters={onClearAllFilters} />
        }
      />
    </PageSection>
  );
};
