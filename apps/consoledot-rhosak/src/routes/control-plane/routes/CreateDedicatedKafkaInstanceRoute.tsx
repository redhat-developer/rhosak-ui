import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import { useCreateDedicatedKafkaMutation } from "consoledot-api";
import type { FunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { CreateDedicatedKafkaInstance } from "ui";
import type { CreateDedicatedKafkaInstanceServices } from "ui/src/components/CreateKafkaInstance/machines";
import type { DedicatedControlPlaneNavigationProps } from "../routesConsts";
import { DedicatedControlPlaneRoutePath } from "../routesConsts";
import { useCreateDedicatedKafkaCallbacks } from "./useCreateDedicatedKafkaCallbacks";
import { useSelfTermsReviewGate } from "./useSelfTermsReviewGate";

export const CreateDedicatedKafkaInstanceRoute: FunctionComponent<
  DedicatedControlPlaneNavigationProps
> = ({ instancesHref }) => {
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        history.push(DedicatedControlPlaneRoutePath);
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