import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from "@patternfly/react-core";
import { FilterIcon } from "@patternfly/react-icons";
import { Trans, useTranslation } from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";

export const EmptyStateNoTopicSelected: VoidFunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <EmptyState variant={EmptyStateVariant.xs}>
      <EmptyStateIcon icon={FilterIcon} />
      <Title headingLevel="h3" size="lg">
        {t("metrics:empty_state_no_filter_title")}
      </Title>
      <EmptyStateBody>
        <Trans
          ns={"metrics"}
          i18nKey={"empty_state_no_filter_body"}
          components={{ bold: <strong /> }}
        />
      </EmptyStateBody>
    </EmptyState>
  );
};
