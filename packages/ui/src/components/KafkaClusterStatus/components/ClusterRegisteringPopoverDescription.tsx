import {
  Alert,
  Button,
  ButtonVariant,
  StackItem,
  TextContent,
  TextVariants,
  Text,
} from "@patternfly/react-core";
import { Trans, useTranslation } from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";

type ClusterRegisteringPopoverDescriptionProps = {
  showWarning: boolean;
  showError: boolean;
  onClickSupportLink: () => void;
};

export const ClusterRegisteringPopoverDescription: VoidFunctionComponent<
  ClusterRegisteringPopoverDescriptionProps
> = ({ showError, showWarning, onClickSupportLink }) => {
  const { t } = useTranslation("kafka");

  return (
    <StackItem>
      {showWarning && (
        <Alert
          variant="warning"
          isInline
          isPlain
          title={t("status_warning_or_error_title")}
        />
      )}
      {showError && (
        <Alert
          variant="danger"
          isInline
          isPlain
          title={t("status_warning_or_error_title")}
        >
          <TextContent>
            <Text component={TextVariants.small}>
              <Trans
                ns={["kafka"]}
                i18nKey="cluster_status_warning_popover_description"
                components={[
                  <Button
                    key="btn-support-case"
                    variant={ButtonVariant.link}
                    onClick={onClickSupportLink}
                    isInline
                  />,
                ]}
              />
            </Text>
          </TextContent>
        </Alert>
      )}
      {!showError && !showWarning && (
        <TextContent>
          <Text component={TextVariants.small}>
            {t("status_created_shortly_help")}
          </Text>
        </TextContent>
      )}
    </StackItem>
  );
};
