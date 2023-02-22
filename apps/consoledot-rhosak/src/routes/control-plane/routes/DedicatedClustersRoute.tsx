import { useDedicatedClusters } from "consoledot-api";
import type { FunctionComponent, VoidFunctionComponent } from "react";
import { DedicatedClusters, EmptyStateNoDedicatedEntitlement } from "ui";
import { useDedicatedGate } from "../../useDedicatedGate";
import { ConnectedControlPlaneHeader } from "./ConnectedControlPlaneHeader";

export const DedicatedClustersRoute: FunctionComponent = () => {
  const dedicatedGate = useDedicatedGate();
  const noEntitlement = dedicatedGate === "standard-only";

  if (noEntitlement) {
    return (
      <>
        <ConnectedControlPlaneHeader activeSection={"clusters"} />
        <EmptyStateNoDedicatedEntitlement
          onQuickstartGuide={() => {
            /* TODO */
          }}
        />
      </>
    );
  }

  return <DedicatedClustersWithEntitlementRoute />;
};

export const DedicatedClustersWithEntitlementRoute: VoidFunctionComponent =
  () => {
    const { data } = useDedicatedClusters();

    return (
      <>
        <ConnectedControlPlaneHeader activeSection={"clusters"} />
        <DedicatedClusters
          clusters={data?.clusters}
          itemCount={data?.count}
          page={1}
          onPageChange={() => {
            /* TODO */
          }}
          onQuickstartGuide={() => {
            /* TODO */
          }}
        />
      </>
    );
  };
