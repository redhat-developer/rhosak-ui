import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from "@patternfly/react-core";
import { OpenDrawerRightIcon } from "@patternfly/react-icons";
import {
  ExternalLink,
  Trans,
  useTranslation,
} from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";
import { RHOSAKLogo } from "../../Logos";

export type EmptyStateNoQuotaInstanceProps = {
  onQuickstartGuide: () => void;
  onCreateTrialInstance: () => void;
};

export const EmptyStateNoQuotaInstance: VoidFunctionComponent<
  EmptyStateNoQuotaInstanceProps
> = ({ onQuickstartGuide, onCreateTrialInstance }) => {
  const { t } = useTranslation("kafka");
  return (
    <EmptyState variant={EmptyStateVariant.xs} isFullHeight={true}>
      <EmptyStateIcon icon={RHOSAKLogo} />
      <Title headingLevel="h2" size="lg">
        {t("empty_state_no_quota_title")}
      </Title>
      <EmptyStateBody>
        <Trans
          ns={"kafka"}
          i18nKey={"empty_state_no_quota_instance_body"}
          components={[
            <ExternalLink
              href={
                "https://www.redhat.com/en/technologies/cloud-computing/openshift/openshift-streams-for-apache-kafka/pricing"
              }
              testId={"subscription-link"}
              className={"pf-u-ml-xs"}
            />,
            <Button
              variant="link"
              component="a"
              isInline
              onClick={onQuickstartGuide}
              icon={<OpenDrawerRightIcon />}
              iconPosition="right"
            />,
          ]}
        />
      </EmptyStateBody>
      <Button onClick={onCreateTrialInstance}>
        {t("create_trial_instance")}
      </Button>
    </EmptyState>
  );
};
