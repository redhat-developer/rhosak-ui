import { useDedicatedClusters } from "consoledot-api";
import type { VoidFunctionComponent } from "react";
import { DedicatedClusters } from "ui";
import { ConnectedControlPlaneHeader } from "./ConnectedControlPlaneHeader";

export const DedicatedClustersRoute: VoidFunctionComponent = () => {
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
      />
    </>
  );
};
