import { QuickStartContext } from "@patternfly/quickstarts";
import type { CreateKafkaInstanceServices } from "@rhoas/app-services-ui-components";
import { CreateKafkaInstance } from "@rhoas/app-services-ui-components";
import type { FunctionComponent } from "react";
import { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import type { NavigationProps } from "../routes";
import { ControlPlaneRoutePath } from "../routes";
import { useCreateKafkaCallbacks } from "./useCreateKafkaCallbacks";

export const CreateKafkaInstanceRoute: FunctionComponent<NavigationProps> = ({
  instancesHref,
}) => {
  const history = useHistory();
  const callbacks = useCreateKafkaCallbacks();

  const qsContext = useContext(QuickStartContext);

  const onClickKafkaOverview = () => {
    history.push(`overview`);
  };

  const onClickQuickStart = useCallback(() => {
    qsContext.setActiveQuickStart &&
      qsContext.setActiveQuickStart("getting-started");
  }, [qsContext]);

  const onCreate = useCallback<CreateKafkaInstanceServices["onCreate"]>(
    function (data, onSuccess, onError) {
      const onOnSuccess = () => {
        onSuccess();
        history.push(ControlPlaneRoutePath);
      };
    },
    [history]
  );

  const onOnCancel = useCallback(() => {
    history.push(instancesHref);
  }, [history, instancesHref]);

  return (
    <CreateKafkaInstance
      {...callbacks}
      isModalOpen={true}
      onCancel={onOnCancel}
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
