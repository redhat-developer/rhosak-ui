import { PageSection } from "@patternfly/react-core";
import type { TableViewProps } from "@rhoas/app-services-ui-components";
import { TableView } from "@rhoas/app-services-ui-components";
import type { DedicatedCluster } from "ui-models/src/models/dedicated-cluster";
import { useDedicatedClusterLabels } from "../../hooks";
import type { EmptyStateNoDedicatedClustersProps } from "./components";
import { EmptyStateNoDedicatedClusters } from "./components";

const Columns = ["name", "id", "status"] as const;

export type DedicatedClustersProps<
  T extends DedicatedCluster = DedicatedCluster
> = {
  clusters: Array<T> | undefined | null;
} & Pick<
  TableViewProps<T, (typeof Columns)[number]>,
  "itemCount" | "page" | "onPageChange"
> &
  EmptyStateNoDedicatedClustersProps;

export const DedicatedClusters = <T extends DedicatedCluster>({
  clusters,
  itemCount,
  page,
  onPageChange,
  onQuickstartGuide,
}: DedicatedClustersProps<T>) => {
  const labels = useDedicatedClusterLabels();
  const breakpoint = "lg";

  return (
    <PageSection isFilled={true}>
      <TableView
        ariaLabel={"TODO"}
        data={clusters}
        columns={Columns}
        renderHeader={({ column, Th, key }) => (
          <Th key={key}>{labels.fields[column]}</Th>
        )}
        renderCell={({ column, row, Td, key }) => {
          return (
            <Td key={key} dataLabel={labels.fields[column]}>
              {(() => {
                switch (column) {
                  case "name":
                    return row.name;
                  case "id":
                    return row.id;
                  case "status":
                    return row.status;
                }
              })()}
            </Td>
          );
        }}
        toolbarBreakpoint={breakpoint}
        itemCount={itemCount}
        page={page}
        onPageChange={onPageChange}
        emptyStateNoData={
          <EmptyStateNoDedicatedClusters
            onQuickstartGuide={onQuickstartGuide}
          />
        }
        emptyStateNoResults={
          <div>&bsp; {/* as users can't filter this is not needed */}</div>
        }
      />
    </PageSection>
  );
};
