import { useInterpret } from "@xstate/react";
import type { FunctionComponent } from "react";
import { createContext } from "react";
import type { ActorRefFrom } from "xstate";
import type { CreateDedicatedKafkaInstanceServices } from "./CreateDedicatedKafkaInstanceMachine";
import { makeCreateDedicatedKafkaInstanceMachine } from "./CreateDedicatedKafkaInstanceMachine";

export const CreateDedicatedKafkaInstanceContext = createContext<{
  service: ActorRefFrom<
    ReturnType<typeof makeCreateDedicatedKafkaInstanceMachine>
  >;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
}>(null!);

export const CreateDedicatedKafkaInstanceProvider: FunctionComponent<
  CreateDedicatedKafkaInstanceServices
> = ({
  onCreate,
  checkDeveloperAvailability,
  checkDedicatedQuota,
  fetchClusters,
  getDedicatedSizes,
  getTrialSizes,
  children,
}) => {
  const service = useInterpret(
    () =>
      makeCreateDedicatedKafkaInstanceMachine({
        checkDedicatedQuota,
        checkDeveloperAvailability,
        fetchClusters,
        getDedicatedSizes,
        getTrialSizes,
        onCreate,
      }),
    { devTools: true }
  );

  return (
    <CreateDedicatedKafkaInstanceContext.Provider value={{ service }}>
      {children}
    </CreateDedicatedKafkaInstanceContext.Provider>
  );
};
