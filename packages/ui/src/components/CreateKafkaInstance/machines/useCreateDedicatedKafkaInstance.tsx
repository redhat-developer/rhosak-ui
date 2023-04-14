import { useSelector } from "@xstate/react";
import { useCallback, useContext } from "react";
import type { ActorRefFrom } from "xstate";
import { CreateDedicatedKafkaInstanceContext } from "./CreateDedicatedKafkaInstanceProvider";
import type { DedicatedPlanMachine } from "./DedicatedPlanMachine";
import type { DedicatedTrialPlanMachine } from "./DedicatedTrialPlanMachine";

export type UseCreateDedicatedKafkaInstanceSelectorReturn = {
  dedicatedPlanMachine: ActorRefFrom<typeof DedicatedPlanMachine> | undefined;
  trialPlanMachine: ActorRefFrom<typeof DedicatedTrialPlanMachine> | undefined;
  isLoading: boolean;
  isSystemUnavailable: boolean;
  isDedicated: boolean;
  isDeveloper: boolean;
  isSaving: boolean;
  isSaved: boolean;
};

export function useCreateDedicatedKafkaInstance() {
  const { service } = useContext(CreateDedicatedKafkaInstanceContext);
  return useSelector<
    typeof service,
    UseCreateDedicatedKafkaInstanceSelectorReturn
  >(
    service,
    useCallback((state) => {
      const dedicatedPlanMachine = state.children["dedicatedPlanService"] as
        | ActorRefFrom<typeof DedicatedPlanMachine>
        | undefined;
      const trialPlanMachine = state.children["trialPlanService"] as
        | ActorRefFrom<typeof DedicatedTrialPlanMachine>
        | undefined;

      const isLoading = state.hasTag("loading");
      const isSystemUnavailable = state.hasTag("systemUnavailable");
      const isDedicated = state.hasTag("dedicatedPlan");
      const isDeveloper = state.hasTag("developerPlan");
      const isSaving = state.hasTag("saving");
      const isSaved = state.done === true;

      return {
        dedicatedPlanMachine,
        trialPlanMachine,
        isLoading,
        isSystemUnavailable,
        isDedicated,
        isDeveloper,
        isSaving,
        isSaved,
      };
    }, [])
  );
}
