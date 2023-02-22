import { useSelector } from "@xstate/react";
import { useCallback } from "react";
import type { DedicatedCluster } from "ui-models/src/models/dedicated-cluster";
import type { Size } from "ui-models/src/models/kafka";
import type { CreateDedicatedKafkaInstanceError } from "../types";
import type { DedicatedPlanMachineContext } from "./DedicatedPlanMachine";
import { useCreateDedicatedKafkaInstance } from "./useCreateDedicatedKafkaInstance";

type SelectorReturn = {
  form: DedicatedPlanMachineContext["form"];
  capabilities: DedicatedPlanMachineContext["capabilities"];
  selectedCluster: DedicatedCluster | undefined;
  selectedSize: Size | undefined;
  sizes: DedicatedPlanMachineContext["sizes"];
  remainingQuota: number | undefined;

  isFormEnabled: boolean;

  isNameInvalid: boolean;
  isNameEmpty: boolean;
  isNameError: boolean;
  isNameTaken: boolean;
  isSizeDisabled: boolean;
  isSizeOverQuota: boolean;
  isSizeLoadingError: boolean;
  isSizeAvailable: boolean;
  isSizeError: boolean;
  isBillingError: boolean;
  isBillingPrepaidAvailable: boolean;
  isBillingPrepaidOverQuota: boolean;

  isClusterError: boolean;

  isLoading: boolean;
  isLoadingSizes: boolean;
  isSaving: boolean;

  error: CreateDedicatedKafkaInstanceError | "form-invalid" | undefined;

  setName: (name: string) => void;
  setCluster: (name: DedicatedCluster) => void;
  onCreate: () => void;
  setSize: (size: Size) => void;
  setBillingPrepaid: () => void;
};

export function useDedicatedPlanMachine(): SelectorReturn {
  const {
    dedicatedPlanMachine: service,
    isLoading,
    isSaving,
  } = useCreateDedicatedKafkaInstance();

  if (!service) {
    throw new Error(
      "useDedicatedPlanMachine should be called only when the parent CreateDedicatedKafkaInstanceMachine is in the right state"
    );
  }

  const setName = useCallback(
    (name: string) => service.send({ type: "nameChange", name }),
    [service]
  );
  const setCluster = useCallback(
    (cluster: DedicatedCluster) =>
      service.send({ type: "clusterChange", cluster }),
    [service]
  );
  const onCreate = useCallback(() => service.send("create"), [service]);
  const setSize = useCallback(
    (size: Size) => service.send({ type: "sizeChange", size }),
    [service]
  );

  const setBillingPrepaid = useCallback(
    () =>
      service.send({
        type: "selectPrepaid",
      }),
    [service]
  );

  return useSelector<typeof service, SelectorReturn>(
    service,
    useCallback(
      (state) => {
        const { creationError, capabilities, form, sizes } = state.context;
        const isBlocked = state.hasTag("blocked");
        const isFormInvalid =
          state.hasTag("formInvalid") && state.hasTag("submitted");
        const isNameTaken = creationError === "name-taken";
        const isConfigurable = state.hasTag("configurable");
        const isLoadingSizes = state.hasTag("sizeLoading");

        const isBillingPrepaidAvailable =
          capabilities.remainingDedicatedQuota !== undefined;

        const selectedCluster = isBlocked
          ? undefined
          : capabilities.availableClusters.find(
              (p) => p.id === form.cluster?.id
            );

        const selectedSize = isBlocked
          ? undefined
          : sizes?.find((s) => form.size?.id === s.id);

        const error: SelectorReturn["error"] = creationError
          ? creationError
          : isFormInvalid
          ? "form-invalid"
          : undefined;

        const remainingQuota = capabilities.remainingDedicatedQuota;

        const isBillingPrepaidOverQuota: boolean = (() => {
          if (
            capabilities.remainingDedicatedQuota !== undefined &&
            capabilities.remainingDedicatedQuota === 0
          ) {
            return true;
          } else if (
            selectedSize?.quota &&
            capabilities.remainingDedicatedQuota
          ) {
            return selectedSize.quota > capabilities.remainingDedicatedQuota;
          }
          return false;
        })();

        return {
          form: form,
          capabilities,
          selectedCluster,
          selectedSize,
          sizes: sizes,
          remainingQuota,

          isFormEnabled: !isLoading && !isSaving && !isBlocked,
          isNameInvalid: state.hasTag("nameInvalid"),
          isNameEmpty: state.hasTag("nameEmpty"),
          isNameError:
            state.hasTag("nameInvalid") ||
            isNameTaken ||
            (!state.hasTag("nameValid") && isFormInvalid),
          isNameTaken,
          isSizeDisabled: state.hasTag("sizeDisabled"),
          isSizeOverQuota: state.hasTag("sizeOverQuota"),
          isSizeLoadingError: state.hasTag("sizeError"),
          isSizeAvailable: !state.hasTag("sizeIdle"),
          isSizeError: !state.hasTag("sizeValid") && isFormInvalid,
          isClusterError: !state.hasTag("clusterValid") && isFormInvalid,
          isBillingError: !state.hasTag("billingValid") && isFormInvalid,
          isBillingPrepaidAvailable,
          isBillingPrepaidOverQuota,
          isLoading,
          isLoadingSizes,
          isConfigurable,
          isSaving,

          error,

          setName,
          setCluster,
          onCreate,
          setSize,
          setBillingPrepaid,
        };
      },
      [
        isLoading,
        isSaving,
        onCreate,
        setBillingPrepaid,
        setName,
        setCluster,
        setSize,
      ]
    )
  );
}
