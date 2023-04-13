import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from "@patternfly/react-core";
import { OpenDrawerRightIcon, PlusCircleIcon } from "@patternfly/react-icons";
import {
  ExternalLink,
  Trans,
  useTranslation,
} from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";

export type EmptyStateInstanceReadyProps = {
  onQuickstartGuide: () => void;
  onCreateInstance: () => void;
};

export const EmptyStateInstanceReady: VoidFunctionComponent<
  EmptyStateInstanceReadyProps
> = ({ onQuickstartGuide, onCreateInstance }) => {
  const { t } = useTranslation("kafka");
  return (
    <EmptyState variant={EmptyStateVariant.large} isFullHeight={true}>
      <EmptyStateIcon icon={PlusCircleIcon} />
      <Title headingLevel="h2" size="lg">
        {t("empty_state_no_dedicated_instances_title")}
      </Title>
      <EmptyStateBody>
        <Trans
          ns={"kafka"}
          i18nKey={"empty_state_instance_creation_ready"}
          components={[
            <ExternalLink
              href={""} //TBD
              testId={"prerequisites-link"}
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
      <Button onClick={onCreateInstance}>{t("create_kafka_instance")}</Button>
    </EmptyState>
  );
};
