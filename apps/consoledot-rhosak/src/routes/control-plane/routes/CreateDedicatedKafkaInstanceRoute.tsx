import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import { useCreateDedicatedKafkaMutation } from "consoledot-api";
import type { FunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { CreateDedicatedKafkaInstance } from "ui";
import type { CreateDedicatedKafkaInstanceServices } from "ui/src/components/CreateKafkaInstance/machines";
import { useConsoledotLink } from "../../../hooks";
import type { DedicatedControlPlaneNavigationProps } from "../routesConsts";
import { ControlPlaneRoutePath } from "../routesConsts";
import { useCreateDedicatedKafkaCallbacks } from "./useCreateDedicatedKafkaCallbacks";
import { useSelfTermsReviewGate } from "./useSelfTermsReviewGate";

export const CreateDedicatedKafkaInstanceRoute: FunctionComponent<
  DedicatedControlPlaneNavigationProps
> = ({ instancesHref }) => {
  const makeConsoledotLink = useConsoledotLink();
  const history = useHistory();
  const callbacks = useCreateDedicatedKafkaCallbacks();
  const createDedicatedKafkaInstance = useCreateDedicatedKafkaMutation();
  const { quickStarts } = useChrome();
  useSelfTermsReviewGate();

  const onClickKafkaOverview = () => {
    history.push(`overview`);
  };

  const onClickQuickStart = useCallback(() => {
    quickStarts.toggle("getting-started");
  }, [quickStarts]);

  const onCreate = useCallback<
    CreateDedicatedKafkaInstanceServices["onCreate"]
  >(
    function (instance, onSuccess, onError) {
      const onOnSuccess = () => {
        onSuccess();
        history.push(ControlPlaneRoutePath);
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
      subscriptionOptionsHref={makeConsoledotLink(
        "/application-services/overview"
      )}
      appendTo={() =>
        (document.getElementById("chrome-app-render-root") as HTMLElement) ||
        document.body
      }
    />
  );
};
