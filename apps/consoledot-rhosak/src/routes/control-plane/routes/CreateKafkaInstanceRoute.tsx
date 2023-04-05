import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import { useCreateKafkaMutation } from "consoledot-api/src";
import type { FunctionComponent } from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import type { CreateKafkaInstanceServices } from "ui";
import { CreateKafkaInstance } from "ui";
import { useConsoledotLink } from "../../../hooks";
import type { ControlPlaneNavigationProps } from "../routesConsts";
import { ControlPlaneRouteRoot } from "../routesConsts";
import { useCreateKafkaCallbacks } from "./useCreateKafkaCallbacks";
import { useSelfTermsReviewGate } from "./useSelfTermsReviewGate";

export const CreateKafkaInstanceRoute: FunctionComponent<
  ControlPlaneNavigationProps
> = ({ instancesHref }) => {
  const makeConsoledotLink = useConsoledotLink();
  const { analytics, quickStarts } = useChrome();
  const history = useHistory();
  const callbacks = useCreateKafkaCallbacks();
  const createKafkaInstance = useCreateKafkaMutation();
  useSelfTermsReviewGate();

  void analytics.track("RHOSAK Create Instance", { status: "prompt" });

  const onClickKafkaOverview = () => {
    history.push(`/overview`);
  };

  const onClickQuickStart = useCallback(() => {
    quickStarts.toggle("getting-started");
  }, [quickStarts]);

  const onCreate = useCallback<CreateKafkaInstanceServices["onCreate"]>(
    function (instance, onSuccess, onError) {
      const onOnSuccess = () => {
        onSuccess();
        void analytics.track("RHOSAK Create Instance", {
          status: "success",
        });
        history.push(ControlPlaneRouteRoot);
      };
      void createKafkaInstance.mutateAsync({
        instance,
        onSuccess: onOnSuccess,
        onError,
      });
    },
    [analytics, createKafkaInstance, history]
  );

  const onCancel = useCallback(() => {
    void analytics.track("RHOSAK Create Instance", {
      status: "canceled",
    });
    history.push(instancesHref);
  }, [analytics, history, instancesHref]);

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
