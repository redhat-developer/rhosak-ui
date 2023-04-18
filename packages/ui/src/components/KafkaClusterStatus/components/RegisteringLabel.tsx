import {
  Split,
  SplitItem,
  Spinner,
  Button,
  Popover,
  Flex,
  FlexItem,
  HelperText,
  HelperTextItem,
  Alert,
} from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { useRef } from "react";
import type { PopoverStatus } from "../types";
import { useTranslation } from "@rhoas/app-services-ui-components";
import { ClusterRegisteringStateProgressStepper } from "./ClusterRegisteringStateProgressStepper";

export type RegisteringLabelProps = {
  registeringStep: PopoverStatus;
  showWarning: boolean;
  showError: boolean;
  onClickSupportLink: () => void;
};

export const RegisteringLabel: VoidFunctionComponent<RegisteringLabelProps> = ({
  registeringStep,
  showWarning,
  showError,
  onClickSupportLink,
}) => {
  const { t } = useTranslation("kafka");
  const labelRef = useRef<HTMLButtonElement>(null);

  const showAlert = () => {
    if (showWarning) {
      return (
        <Alert
          variant="warning"
          isInline
          isPlain
          title={t("status_warning_or_error_title")}
        />
      );
    } else
      return (
        <Alert
          variant="danger"
          isInline
          isPlain
          title={t("status_warning_or_error_title")}
        />
      );
  };

  return (
    <>
      <Split hasGutter className="mas-c-cluster-status">
        <SplitItem>
          <Spinner size="md" />
        </SplitItem>
        <SplitItem>
          <Button variant={"link"} isInline ref={labelRef}>
            {t("registering")}
          </Button>
          <Flex>
            <FlexItem>
              {!showWarning && !showError ? (
                <HelperText>
                  <HelperTextItem variant="indeterminate">
                    {t("status_created_shortly_help")}
                  </HelperTextItem>
                </HelperText>
              ) : (
                showAlert()
              )}
            </FlexItem>
          </Flex>
        </SplitItem>
      </Split>
      <Popover
        position={"right"}
        enableFlip={true}
        headerContent={t("cluster_status_popover_title")}
        bodyContent={
          <ClusterRegisteringStateProgressStepper
            registeringStep={registeringStep}
            onClickSupportLink={onClickSupportLink}
            showError={showError}
            showWarning={showWarning}
          />
        }
        reference={labelRef}
      />
    </>
  );
};
