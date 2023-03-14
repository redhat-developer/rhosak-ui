import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from "@patternfly/react-core";
import { PlusCircleIcon } from "@patternfly/react-icons";
import { Trans, useTranslation } from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";

export type EmptyStateNoDedicatedClustersProps = {
  onQuickstartGuide: () => void;
};

export const EmptyStateNoDedicatedClusters: VoidFunctionComponent<
  EmptyStateNoDedicatedClustersProps
> = ({ onQuickstartGuide }) => {
  const { t } = useTranslation("kafka");
  return (
    <EmptyState variant={EmptyStateVariant.xs} isFullHeight={true}>
      <EmptyStateIcon icon={PlusCircleIcon} />
      <Title headingLevel="h2" size="lg">
        {t("empty_state_instances_no_dedicated_clusters_title")}
      </Title>
      <EmptyStateBody>
        <Trans
          ns={"kafka"}
          i18nKey={"empty_state_instances_no_dedicated_clusters_body"}
          components={[<a onClick={onQuickstartGuide} />]}
        />
      </EmptyStateBody>
      <Button
        ouiaId="button-create"
        variant="primary"
        onClick={onQuickstartGuide}
      >
        {t("empty_state_instances_no_dedicated_clusters_prerequisites_button")}
      </Button>
    </EmptyState>
  );
};
