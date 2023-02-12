import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from "@patternfly/react-core";
import { SearchIcon } from "@patternfly/react-icons";
import type React from "react";
import { useTranslation } from "react-i18next";

export type PermissionsTableEmptyStateProps = {
  openManagePermissions: () => void;
};
export const PermissionsTableEmptyState: React.FunctionComponent<
  PermissionsTableEmptyStateProps
> = ({ openManagePermissions }) => {
  const { t } = useTranslation("manage-kafka-permissions");
  return (
    <EmptyState
      data-ouia-page-id="emptyStateTopics"
      variant={EmptyStateVariant.large}
    >
      <EmptyStateIcon icon={SearchIcon} />
      <Title headingLevel="h2" size="lg">
        {t("no_results_title")}
      </Title>
      <EmptyStateBody>{t("no_results_body")}</EmptyStateBody>
      <Button
        data-testid="actionManagePermissions"
        ouiaId="button-manage-permissions"
        variant="primary"
        onClick={openManagePermissions}
      >
        {t("dialog_title")}
      </Button>
    </EmptyState>
  );
};
