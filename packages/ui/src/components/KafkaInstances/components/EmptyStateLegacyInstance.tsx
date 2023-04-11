import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from "@patternfly/react-core";
import { PlusCircleIcon } from "@patternfly/react-icons";
import {
  ExternalLink,
  Trans,
  useTranslation,
} from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";

export type EmptyStateLegacyInstanceProps = {
  onCreateInstance: () => void;
};

export const EmptyStateLegacyInstance: VoidFunctionComponent<
  EmptyStateLegacyInstanceProps
> = ({ onCreateInstance }) => {
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
          i18nKey={"empty_state_legacy_instance_body"}
          components={[
            <ExternalLink
              href={""} //TBD
              testId={"prerequisites-link"}
              className={"pf-u-ml-xs"}
            />,
          ]}
        />
      </EmptyStateBody>
      <Button onClick={onCreateInstance}>{t("create_kafka_instance")}</Button>
    </EmptyState>
  );
};
