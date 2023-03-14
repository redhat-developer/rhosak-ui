import { useDedicatedClusters } from "consoledot-api";
import type { VoidFunctionComponent } from "react";
import { DedicatedClusters, EmptyStateNoDedicatedEntitlement } from "ui";
import { useDedicatedGate } from "../../useDedicatedGate";
import type { DedicatedControlPlaneNavigationProps } from "../routesConsts";
import { ConnectedControlPlaneHeader } from "./ConnectedControlPlaneHeader";

export const DedicatedClustersRoute: VoidFunctionComponent<
  DedicatedControlPlaneNavigationProps
> = ({ clustersHref, instancesHref }) => {
  const dedicatedGate = useDedicatedGate();
  const noEntitlement = dedicatedGate === "standard-only";

  return (
    <>
      <ConnectedControlPlaneHeader
        activeSection={"clusters"}
        clustersHref={clustersHref}
        instancesHref={instancesHref}
      />
      {noEntitlement ? (
        <EmptyStateNoDedicatedEntitlement
          onQuickstartGuide={() => {
            /* TODO */
          }}
        />
      ) : (
        <DedicatedClustersWithEntitlementRoute />
      )}
    </>
  );
};

export const DedicatedClustersWithEntitlementRoute: VoidFunctionComponent =
  () => {
    const { data } = useDedicatedClusters();

    return (
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
    );
  };
