import {
  Level,
  LevelItem,
  PageSection,
  PageSectionVariants,
  Text,
  TextContent,
} from "@patternfly/react-core";
import { useTranslation } from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";

export const KafkaInstancesHeader: VoidFunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <PageSection variant={PageSectionVariants.light}>
      <Level>
        <LevelItem>
          <TextContent>
            <Text component="h1">{t("kafka:table.title")}</Text>
          </TextContent>
        </LevelItem>
      </Level>
    </PageSection>
  );
};
