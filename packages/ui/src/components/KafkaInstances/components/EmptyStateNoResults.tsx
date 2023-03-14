import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from "@patternfly/react-core";
import { SearchIcon } from "@patternfly/react-icons";
import { Trans, useTranslation } from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";

export type EmptyStateNoResultsProps = {
  onClearAllFilters: () => void;
};

export const EmptyStateNoResults: VoidFunctionComponent<
  EmptyStateNoResultsProps
> = ({ onClearAllFilters }) => {
  const { t } = useTranslation("kafka");
  return (
    <EmptyState variant={EmptyStateVariant.xs} isFullHeight={true}>
      <EmptyStateIcon icon={SearchIcon} />
      <Title headingLevel="h2" size="lg">
        {t("empty_state_no_results_found_title")}
      </Title>
      <EmptyStateBody>
        <Trans
          ns={"kafka"}
          i18nKey={"empty_state_no_results_found_body"}
          components={[<a onClick={onClearAllFilters} />]}
        />
      </EmptyStateBody>
    </EmptyState>
  );
};
