import { QuickStartContext } from "@patternfly/quickstarts";
import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import type { CreateKafkaInstanceServices } from "@rhoas/app-services-ui-components";
import { CreateKafkaInstance } from "@rhoas/app-services-ui-components";
import { useDeveloperInstanceAvailabilityQuery } from "consoledot-api";
import type { FunctionComponent } from "react";
import { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import type { CreateKafkaInstanceProps } from "ui";
import type { NavigationProps } from "../routes";
import { ControlPlaneRoutePath } from "../routes";

export const CreateKafkaInstanceRoute: FunctionComponent<NavigationProps> = ({
  instancesHref,
}) => {
  const { auth } = useChrome();
  const history = useHistory();

  const getUsername = useCallback(async () => {
    const username = (await auth.getUser()).identity.user?.username;
    if (!username) {
      return Promise.reject("Invalid user");
    }
    return username;
  }, [auth]);

  const checkDeveloperAvailabilityQuery =
    useDeveloperInstanceAvailabilityQuery();

  const checkDeveloperAvailability = useCallback<
    CreateKafkaInstanceProps["checkDeveloperAvailability"]
  >(
    async ({ onAvailable, onUsed, onUnavailable }) => {
      try {
        const available = await checkDeveloperAvailabilityQuery(getUsername);

        if (available) {
          onAvailable();
        } else {
          onUsed();
        }
      } catch {
        onUnavailable();
      }
    },
    [checkDeveloperAvailabilityQuery, getUsername]
  );

  const qsContext = useContext(QuickStartContext);

  const onClickKafkaOverview = () => {
    history.push(`overview`);
  };

  const onClickQuickStart = useCallback(() => {
    qsContext.setActiveQuickStart &&
      qsContext.setActiveQuickStart("getting-started");
  }, [qsContext]);

  const handleCreate = useCallback<CreateKafkaInstanceServices["onCreate"]>(
    function (data, onSuccess, onError) {
      const handleOnSuccess = () => {
        onSuccess();
        history.push(ControlPlaneRoutePath);
      };
    },
    [history]
  );

  const handleOnCancel = useCallback(() => {
    history.push(instancesHref);
  }, [history, instancesHref]);

  return (
    <CreateKafkaInstance
      checkDeveloperAvailability={checkDeveloperAvailability}
      checkStandardQuota={({
        onQuotaAvailable,
        onNoQuotaAvailable,
        onOutOfQuota,
      }) => onNoQuotaAvailable({ hasTrialQuota: false })}
      fetchProvidersWithRegions={(plan, { onAvailable, onUnavailable }) =>
        onUnavailable()
      }
      getStandardSizes={() => Promise.reject()}
      getTrialSizes={() => Promise.reject()}
      isModalOpen={true}
      onCancel={handleOnCancel}
      onClickContactUs={onClickKafkaOverview}
      onClickKafkaOverview={onClickKafkaOverview}
      onClickQuickStart={onClickQuickStart}
      onCreate={handleCreate}
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
