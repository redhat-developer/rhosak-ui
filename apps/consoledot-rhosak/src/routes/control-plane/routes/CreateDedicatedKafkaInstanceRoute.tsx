import { QuickStartContext } from "@patternfly/quickstarts";
import { useCreateDedicatedKafkaMutation } from "consoledot-api";
import type { FunctionComponent } from "react";
import { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { CreateDedicatedKafkaInstance } from "ui";
import type { CreateDedicatedKafkaInstanceServices } from "ui/src/components/CreateKafkaInstance/machines";
import type { ControlPlaneNavigationProps } from "../routesConsts";
import { DedicatedControlPlaneRouteRoot } from "../routesConsts";
import { useCreateDedicatedKafkaCallbacks } from "./useCreateDedicatedKafkaCallbacks";

export const CreateDedicatedKafkaInstanceRoute: FunctionComponent<
  ControlPlaneNavigationProps
> = ({ instancesHref }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const history = useHistory();
  const callbacks = useCreateDedicatedKafkaCallbacks();
  const createDedicatedKafkaInstance = useCreateDedicatedKafkaMutation();
  const qsContext = useContext(QuickStartContext);

  const onClickKafkaOverview = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push(`overview`);
  };

  const onClickQuickStart = useCallback(() => {
    qsContext.setActiveQuickStart &&
      qsContext.setActiveQuickStart("getting-started");
  }, [qsContext]);

  const onCreate = useCallback<
    CreateDedicatedKafkaInstanceServices["onCreate"]
  >(
    function (instance, onSuccess, onError) {
      const onOnSuccess = () => {
        onSuccess();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        history.push(DedicatedControlPlaneRouteRoot);
      };
      void createDedicatedKafkaInstance.mutateAsync({
        instance,
        onSuccess: onOnSuccess,
        onError,
      });
    },
    [createDedicatedKafkaInstance, history]
  );

  const onCancel = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    history.push(instancesHref);
  }, [history, instancesHref]);

  return (
    <CreateDedicatedKafkaInstance
      {...callbacks}
      isModalOpen={true}
      onCancel={onCancel}
      onClickContactUs={onClickKafkaOverview}
      onClickKafkaOverview={onClickKafkaOverview}
      onClickQuickStart={onClickQuickStart}
      onCreate={onCreate}
      onLearnHowToAddStreamingUnits={onClickKafkaOverview}
      onLearnMoreAboutSizes={onClickKafkaOverview}
      subscriptionOptionsHref={document.location.href + "/../overview"}
      appendTo={() =>
        (document.getElementById("chrome-app-render-root") as HTMLElement) ||
        document.body
      }
    />
  );
};
