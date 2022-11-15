import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
  TitleSizes,
} from "@patternfly/react-core";
import { CubesIcon } from "@patternfly/react-icons";
import type { FunctionComponent } from "react";
import { useTranslation } from "@rhoas/app-services-ui-components";

export const ConsumerGroupEmptyState: FunctionComponent = () => {
  const { t } = useTranslation(["kafka"]);
  return (
    <EmptyState variant={EmptyStateVariant.large}>
      <EmptyStateIcon icon={CubesIcon} />
      <Title headingLevel={"h1"} size={TitleSizes.lg}>
        {t("consumerGroup.empty_consumer_title")}
      </Title>
      <EmptyStateBody>{t("consumerGroup.empty_consumer_body")}</EmptyStateBody>
    </EmptyState>
  );
};
