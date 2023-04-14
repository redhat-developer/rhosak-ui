import { useSelector } from "@xstate/react";
import { useCallback } from "react";
import type { CreateKafkaInstanceError } from "../types";
import type { DedicatedTrialPlanMachineContext } from "./DedicatedTrialPlanMachine";
import { useCreateDedicatedKafkaInstance } from "./useCreateDedicatedKafkaInstance";

type SelectorReturn = {
  form: DedicatedTrialPlanMachineContext["form"];
  capabilities: DedicatedTrialPlanMachineContext["capabilities"];
  sizes: DedicatedTrialPlanMachineContext["sizes"];

  isFormEnabled: boolean;

  isNameInvalid: boolean;
  isNameEmpty: boolean;
  isNameError: boolean;
  isNameTaken: boolean;
  isSizeLoadingError: boolean;
  isSizeAvailable: boolean;
  isSizeError: boolean;

  isLoading: boolean;
  isLoadingSizes: boolean;
  isSaving: boolean;

  error: CreateKafkaInstanceError | "form-invalid" | undefined;

  setName: (name: string) => void;
  onCreate: () => void;
};

export function useDedicatedTrialPlanMachine(): SelectorReturn {
  const {
    trialPlanMachine: service,
    isLoading,
    isSaving,
  } = useCreateDedicatedKafkaInstance();

  if (!service) {
    throw new Error(
      "useDedicatedTrialPlanMachine should be called only when the parent CreateKafkaInstanceMachine is in the right state"
    );
  }

  const setName = useCallback(
    (name: string) => service.send({ type: "nameChange", name }),
    [service]
  );
  const onCreate = useCallback(() => service.send("create"), [service]);

  return useSelector<typeof service, SelectorReturn>(
    service,
    useCallback(
      (state) => {
        const isBlocked = state.hasTag("blocked");
        const isFormInvalid =
          state.hasTag("formInvalid") && state.hasTag("submitted");
        const isNameTaken = state.context.creationError === "name-taken";
        const isConfigurable = state.hasTag("configurable");
        const isLoadingSizes = state.hasTag("sizeLoading");

        const error: SelectorReturn["error"] = state.context.creationError
          ? state.context.creationError
          : isFormInvalid
          ? "form-invalid"
          : undefined;

        return {
          form: state.context.form,
          capabilities: state.context.capabilities,
          sizes: state.context.sizes,

          isFormEnabled: !isLoading && !isSaving && !isBlocked,

          isNameInvalid: state.hasTag("nameInvalid"),
          isNameEmpty: state.hasTag("nameEmpty"),
          isNameError:
            state.hasTag("nameInvalid") ||
            isNameTaken ||
            (!state.hasTag("nameValid") && isFormInvalid),
          isNameTaken,
          isSizeLoadingError: state.hasTag("sizeError"),
          isSizeAvailable: !state.hasTag("sizeIdle"),
          isSizeError: !state.hasTag("sizeValid") && isFormInvalid,

          isLoading,
          isLoadingSizes,
          isConfigurable,
          isSaving,

          error,

          setName,
          onCreate,
        };
      },
      [isLoading, isSaving, onCreate, setName]
    )
  );
}
