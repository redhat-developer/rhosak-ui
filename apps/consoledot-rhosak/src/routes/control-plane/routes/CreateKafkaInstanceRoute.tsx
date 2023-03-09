import { QuickStartContext } from "@patternfly/quickstarts";
import { useCreateKafkaMutation } from "consoledot-api";
import type { FunctionComponent } from "react";
import { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import type { CreateKafkaInstanceServices } from "ui";
import { CreateKafkaInstance } from "ui";
import type { ControlPlaneNavigationProps } from "../routesConsts";
import { ControlPlaneRouteRoot } from "../routesConsts";
import { useCreateKafkaCallbacks } from "./useCreateKafkaCallbacks";
import { useSelfTermsReviewGate } from "./useSelfTermsReviewGate";

export const CreateKafkaInstanceRoute: FunctionComponent<
  ControlPlaneNavigationProps
> = ({ instancesHref }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const history = useHistory();
  const callbacks = useCreateKafkaCallbacks();
  const createKafkaInstance = useCreateKafkaMutation();
  const qsContext = useContext(QuickStartContext);
  useSelfTermsReviewGate();

  const onClickKafkaOverview = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
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
