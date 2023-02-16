import { useDedicatedClusters } from "consoledot-api";
import type { VoidFunctionComponent } from "react";
import { ControlPlaneHeader, DedicatedClusters } from "ui";
import { useDedicatedGate } from "../../useDedicatedGate";

export const DedicatedClustersRoute: VoidFunctionComponent = () => {
  const gate = useDedicatedGate();

  const { data } = useDedicatedClusters();

  return (
    <>
      <ControlPlaneHeader
        activeSection={"clusters"}
        hasStandardNavigation={gate === "standard-and-dedicated"}
        hasDedicatedNavigation={
          gate === "standard-and-dedicated" || gate === "dedicated-only"
        }
        sectionsHref={{
          standard: "/kafkas",
          dedicated: "/dedicated",
          clusters: "/dedicated/clusters",
        }}
      />
      <DedicatedClusters
        clusters={data?.clusters}
        itemCount={data?.count}
        page={1}
        onPageChange={() => {}}
      />
    </>
  );
};
