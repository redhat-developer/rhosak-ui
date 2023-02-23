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

export type EmptyStateNoDedicatedInstancesProps = {
  onCreate: () => void;
  onQuickstartGuide: () => void;
};

export const EmptyStateNoDedicatedInstances: VoidFunctionComponent<
  EmptyStateNoDedicatedInstancesProps
> = ({ onCreate, onQuickstartGuide }) => {
  const { t } = useTranslation("kafka");
  return (
    <EmptyState variant={EmptyStateVariant.xs}>
      <EmptyStateIcon icon={PlusCircleIcon} />
      <Title headingLevel="h2" size="lg">
        {t("empty_state_no_dedicated_instances_title")}
      </Title>
      <EmptyStateBody>
        <Trans
          ns={"kafka"}
          i18nKey={"empty_state_no_dedicated_instances_body"}
          components={[<a onClick={onQuickstartGuide} />]}
        />
      </EmptyStateBody>
      <Button ouiaId="button-create" variant="primary" onClick={onCreate}>
        {t("empty_state_no_dedicated_instances_create_instance")}
      </Button>
    </EmptyState>
  );
};
