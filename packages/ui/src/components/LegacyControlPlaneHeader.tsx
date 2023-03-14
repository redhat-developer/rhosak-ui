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

export const LegacyControlPlaneHeader: VoidFunctionComponent = () => {
  const { t } = useTranslation("kafka");

  return (
    <>
      <PageSection
        variant={PageSectionVariants.light}
        padding={{ default: "noPadding" }}
        hasShadowBottom={true}
        type={"tabs"}
      >
        <Level>
          <LevelItem>
            <TextContent className={"pf-u-p-md pf-u-p-lg-on-xl"}>
              <Text component="h1">{t("kafka:title")}</Text>
              <p>{t("kafka:description")}</p>
            </TextContent>
          </LevelItem>
        </Level>
      </PageSection>
    </>
  );
};
