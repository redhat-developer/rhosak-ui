import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  PageSection,
  Title,
} from "@patternfly/react-core";
import { TachometerAltIcon } from "@patternfly/react-icons";
import { useTranslation } from "@rhoas/app-services-ui-components";
import type { FunctionComponent } from "react";

export const EmptyStateMetricsUnavailable: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <PageSection isFilled={true}>
      <EmptyState variant={EmptyStateVariant.xs}>
        <EmptyStateIcon icon={TachometerAltIcon} />
        <Title headingLevel="h3" size="lg">
          {t("metrics:empty_state_no_data_title")}
        </Title>
        <EmptyStateBody>{t("metrics:empty_state_no_data_body")}</EmptyStateBody>
      </EmptyState>
    </PageSection>
  );
};
