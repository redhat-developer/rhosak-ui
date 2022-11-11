import {
  Level,
  LevelItem,
  PageSection,
  PageSectionVariants,
  Text,
  TextContent,
} from "@patternfly/react-core";
import { useTranslation } from "@rhoas/app-services-ui-components";
import type { FunctionComponent } from "react";
import { KafkaInstances } from "ui";
import type { PageRoute } from "./types";
import { useKafkaInstances } from "./useKafkaInstances";

export const KafkaInstancesPage: FunctionComponent<PageRoute> = (params) => {
  const fetchInstances = useKafkaInstances(params);
  const { t } = useTranslation();

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <Level>
          <LevelItem>
            <TextContent>
              <Text component="h1">{t("kafka:table.title")}</Text>
            </TextContent>
          </LevelItem>
        </Level>
      </PageSection>
      <KafkaInstances
        isRowSelected={() => false}
        getInstances={fetchInstances}
        getUrlForInstance={(instance) => `./kafkas/${instance.id}/dashboard`}
        onCreate={() => {}}
        onDetails={() => {}}
        onConnection={() => {}}
        onChangeOwner={() => {}}
        onDelete={() => {}}
        onClickConnectionTabLink={() => {}}
        onClickSupportLink={() => {}}
        onInstanceLinkClick={() => {}}
        onQuickstartGuide={() => {}}
        canChangeOwner={() => true}
        canDelete={() => true}
      />
    </>
  );
};
