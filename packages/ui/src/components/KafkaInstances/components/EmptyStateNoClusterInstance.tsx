import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from "@patternfly/react-core";
import { WrenchIcon } from "@patternfly/react-icons";
import {
  ExternalLink,
  Trans,
  useTranslation,
} from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";

export const EmptyStateNoClusterInstance: VoidFunctionComponent = () => {
  const { t } = useTranslation("kafka");
  return (
    <EmptyState variant={EmptyStateVariant.xs} isFullHeight={true}>
      <EmptyStateIcon icon={WrenchIcon} />
      <Title headingLevel="h2" size="lg">
        {t("empty_state_no_dedicated_instances_title")}
      </Title>
      <EmptyStateBody>
        <Trans
          ns={"kafka"}
          i18nKey={"empty_state_no_cluster_instance_body"}
          components={[
            <ExternalLink
              href={""} //TBD
              testId={"prerequisites-link"}
              className={"pf-u-ml-xs"}
            />,
          ]}
        />
      </EmptyStateBody>
    </EmptyState>
  );
};
