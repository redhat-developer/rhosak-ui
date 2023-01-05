import { QuickStartContext } from "@patternfly/quickstarts";
import type { CreateKafkaInstanceServices } from "@rhoas/app-services-ui-components";
import { CreateKafkaInstance } from "@rhoas/app-services-ui-components";
import { useCreateKafkaMutation } from "consoledot-api";
import type { FunctionComponent } from "react";
import { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import type { ControlPlaneNavigationProps } from "../routesConsts";
import { ControlPlaneRouteRoot } from "../routesConsts";
import { useCreateKafkaCallbacks } from "./useCreateKafkaCallbacks";

export const CreateKafkaInstanceRoute: FunctionComponent<
  ControlPlaneNavigationProps
> = ({ instancesHref }) => {
  const history = useHistory();
  const callbacks = useCreateKafkaCallbacks();
  const createKafkaInstance = useCreateKafkaMutation();
  const qsContext = useContext(QuickStartContext);

  const onClickKafkaOverview = () => {
    history.push(`overview`);
  };

  const onClickQuickStart = useCallback(() => {
    qsContext.setActiveQuickStart &&
      qsContext.setActiveQuickStart("getting-started");
  }, [qsContext]);

  const onCreate = useCallback<CreateKafkaInstanceServices["onCreate"]>(
    function (instance, onSuccess, onError) {
      const onOnSuccess = () => {
        onSuccess();
        history.push(ControlPlaneRouteRoot);
      };
      void createKafkaInstance.mutateAsync({
        instance,
        onSuccess: onOnSuccess,
        onError,
      });
    },
    [createKafkaInstance, history]
  );

  const onCancel = useCallback(() => {
    history.push(instancesHref);
  }, [history, instancesHref]);

  return (
    <CreateKafkaInstance
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
