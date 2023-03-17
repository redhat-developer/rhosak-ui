import type React from "react";
import {
  WizardContextConsumer,
  Button,
  WizardFooter,
  ValidatedOptions,
} from "@patternfly/react-core";
import { useTranslation } from "@rhoas/app-services-ui-components";
import type { RadioSelectType, RetentionSizeRadioSelect } from "./types";

export interface IWizardFooter {
  isLoading: boolean;
  onValidate: (value: () => void) => void;
  topicNameValidated: ValidatedOptions;
  retentionTimeValidated: ValidatedOptions;
  retentionSizeValidated: ValidatedOptions;
  closeWizard: () => void;
  isSaving: boolean;
  onValidateRetentionValues: (value: () => void) => void;
  radioTimeSelectValue: RadioSelectType;
  radioSizeSelectValue: RetentionSizeRadioSelect;
}

export const WizardCustomFooter: React.FC<IWizardFooter> = ({
  isLoading,
  onValidate,
  closeWizard,
  topicNameValidated,
  isSaving,
  onValidateRetentionValues,
  retentionSizeValidated,
  retentionTimeValidated,
  radioTimeSelectValue,
  radioSizeSelectValue,
}) => {
  const { t } = useTranslation(["create-topic", "common"]);

  return (
    <WizardFooter>
      <WizardContextConsumer>
        {({ activeStep, onNext, onBack }) => {
          if (activeStep.name == t("topic_name")) {
            return (
              <>
                <Button
                  variant="primary"
                  type="submit"
                  isLoading={isLoading}
                  onClick={() => onValidate(onNext)}
                  isDisabled={
                    topicNameValidated == ValidatedOptions.default
                      ? false
                      : true
                  }
                  ouiaId={"button-next"}
                >
                  {t("common:next")}
                </Button>
                <Button
                  ouiaId={"button-back"}
                  variant="secondary"
                  isDisabled={true}
                >
                  {t("common:back")}
                </Button>
                <Button
                  ouiaId={"button-cancel"}
                  variant="link"
                  onClick={closeWizard}
                >
                  {t("common:cancel")}
                </Button>
              </>
            );
          }

          if (activeStep.name == "Replicas") {
            return (
              <>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={onNext}
                  ouiaId={"button-finish"}
                  isDisabled={isSaving}
                >
                  {t("common:finish")}
                </Button>
                <Button
                  ouiaId={"button-back"}
                  variant="secondary"
                  onClick={onBack}
                  isDisabled={isSaving}
                >
                  {t("common:back")}
                </Button>
                <Button
                  ouiaId={"button-cancel"}
                  variant="link"
                  onClick={closeWizard}
                  isDisabled={isSaving}
                >
                  {t("common:cancel")}
                </Button>
              </>
            );
          }
          if (activeStep.name == t("message_retention")) {
            return (
              <>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => onValidateRetentionValues(onNext)}
                  ouiaId={"button-finish"}
                  isDisabled={
                    (retentionSizeValidated == ValidatedOptions.error &&
                      radioSizeSelectValue == "custom") ||
                    (retentionTimeValidated == ValidatedOptions.error &&
                      radioTimeSelectValue == "custom")
                      ? true
                      : false
                  }
                >
                  {t("common:next")}
                </Button>
                <Button
                  ouiaId={"button-back"}
                  variant="secondary"
                  onClick={onBack}
                >
                  {t("common:back")}
                </Button>
                <Button
                  ouiaId={"button-cancel"}
                  variant="link"
                  onClick={closeWizard}
                >
                  {t("common:cancel")}
                </Button>
              </>
            );
          }
          return (
            <>
              <Button
                ouiaId={"button-next"}
                variant="primary"
                type="submit"
                onClick={onNext}
              >
                {t("common:next")}
              </Button>
              <Button
                ouiaId={"button-back"}
                variant="secondary"
                onClick={onBack}
              >
                {t("common:back")}
              </Button>
              <Button
                ouiaId={"button-cancel"}
                variant="link"
                onClick={closeWizard}
              >
                {t("common:cancel")}
              </Button>
            </>
          );
        }}
      </WizardContextConsumer>
    </WizardFooter>
  );
};
