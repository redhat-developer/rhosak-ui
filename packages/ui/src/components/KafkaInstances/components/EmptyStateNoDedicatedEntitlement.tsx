import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from "@patternfly/react-core";
import { PlusCircleIcon } from "@patternfly/react-icons";
import { Trans, useTranslation } from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";

export type EmptyStateNoDedicatedEntitlementProps = {
  onQuickstartGuide: () => void;
};

export const EmptyStateNoDedicatedEntitlement: VoidFunctionComponent<
  EmptyStateNoDedicatedEntitlementProps
> = ({ onQuickstartGuide }) => {
  const { t } = useTranslation("kafka");
  return (
    <EmptyState variant={EmptyStateVariant.xs}>
      <EmptyStateIcon icon={PlusCircleIcon} />
      <Title headingLevel="h2" size="lg">
        {t("empty_state_no_dedicated_entitlement_title")}
      </Title>
      <EmptyStateBody>
        <Trans
          ns={"kafka"}
          i18nKey={"empty_state_no_dedicated_entitlement_body"}
          components={[<a onClick={onQuickstartGuide} />]}
        />
      </EmptyStateBody>
    </EmptyState>
  );
};
