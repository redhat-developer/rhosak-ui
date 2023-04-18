import {
  ProgressStep,
  ProgressStepper,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import { useTranslation } from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";
import type { PopoverStatus } from "../types";
import { PopoverStatusOrder } from "../types";
import { ClusterRegisteringPopoverDescription } from "./ClusterRegisteringPopoverDescription";

type ClusterRegisteringStateProgressStepperProps = {
  registeringStep: PopoverStatus;
  onClickSupportLink: () => void;
  showWarning: boolean;
  showError: boolean;
};

export const ClusterRegisteringStateProgressStepper: VoidFunctionComponent<
  ClusterRegisteringStateProgressStepperProps
> = ({ registeringStep, onClickSupportLink, showWarning, showError }) => {
  const { t } = useTranslation("kafka");

  const currentStep = PopoverStatusOrder.findIndex(
    (s) => s === registeringStep
  );

  const getVariant = (index: number) =>
    (currentStep === index && "info") ||
    (currentStep > index && "success") ||
    "default";

  return (
    <div>
      <Stack hasGutter>
        <StackItem>
          <ClusterRegisteringPopoverDescription
            showWarning={showWarning}
            showError={showError}
            onClickSupportLink={onClickSupportLink}
          />
        </StackItem>
        <StackItem>
          {t("common:progress_stepper_current_step", {
            currentStep,
            total: PopoverStatusOrder.length,
          })}
        </StackItem>
        <StackItem>
          <ProgressStepper isVertical={true}>
            <ProgressStep
              id={"accepted"}
              titleId={"accepted"}
              isCurrent={registeringStep === "accepted"}
              description={t("cluster_accepted_description")}
              aria-label={t("cluster_accepted_description")}
              variant={getVariant(0)}
              title={t("cluster_status_popover_title")}
            >
              {t("cluster_accepted_title")}
            </ProgressStep>

            <ProgressStep
              id={"provisioning"}
              titleId={"provisioning"}
              isCurrent={registeringStep === "provisioning"}
              description={t("provisioning_cluster_description")}
              aria-label={t("provisioning_cluster_description")}
              variant={getVariant(1)}
            >
              {t("statuses.provisioning")}
            </ProgressStep>
            <ProgressStep
              id={"provisioned"}
              titleId={"proviioned"}
              isCurrent={registeringStep === "provisioned"}
              description={t("cluster_provisioned_description")}
              aria-label={t("cluster_provisioned_description")}
              variant={getVariant(2)}
            >
              {t("cluster_provisioned_title")}
            </ProgressStep>
            <ProgressStep
              id={"preparing"}
              titleId={"preparing"}
              isCurrent={registeringStep === "waitingOperator"}
              description={t("preparing_cluster_description")}
              aria-label={t("preparing_cluster_description")}
              variant={getVariant(3)}
            >
              {t("statuses.preparing")}
            </ProgressStep>
          </ProgressStepper>
        </StackItem>
      </Stack>
    </div>
  );
};
