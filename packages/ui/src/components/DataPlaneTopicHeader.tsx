import {
  Breadcrumb,
  BreadcrumbItem,
  Level,
  LevelItem,
  Nav,
  NavItem,
  NavList,
  PageSection,
  PageSectionVariants,
  Text,
  TextContent,
} from "@patternfly/react-core";
import { useTranslation } from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";
import { Link } from "react-router-dom";
import type { KafkaInstanceActionsProps } from "./KafkaInstanceActions";
import { KafkaInstanceActions } from "./KafkaInstanceActions";

type Sections = "consumer" | "messages" | "properties" | "schemas";

export type DataPlaneTopicHeaderProps = {
  instancesHref: string;
  instanceName: string;
  instanceDetailHref: string;
  instanceTopicsHref: string;
  topicName: string;
  activeSection: Sections;
  tabsHref: { [key in Sections]: string };
} & KafkaInstanceActionsProps;

export const DataPlaneTopicHeader: VoidFunctionComponent<
  DataPlaneTopicHeaderProps
> = ({
  instancesHref,
  instanceName,
  instanceDetailHref,
  instanceTopicsHref,
  topicName,
  activeSection,
  tabsHref,
  ...actionsProps
}) => {
  const { t } = useTranslation("kafka");

  return (
    <>
      <section className="pf-c-page__main-breadcrumb">
        <Breadcrumb ouiaId={"breadcrumb"}>
          <BreadcrumbItem
            render={() => (
              <Link to={instancesHref}>{t("common:kafka_instance")}</Link>
            )}
          />
          <BreadcrumbItem
            render={() => <Link to={instanceDetailHref}>{instanceName}</Link>}
          />
          <BreadcrumbItem
            render={() => (
              <Link to={instanceTopicsHref}>
                {t("dataPlaneNavigation.topics")}
              </Link>
            )}
          />
          <BreadcrumbItem isActive={true}>{topicName}</BreadcrumbItem>
        </Breadcrumb>
      </section>
      <PageSection variant={PageSectionVariants.light}>
        <Level>
          <LevelItem>
            <TextContent>
              <Text component="h1">{topicName}</Text>
            </TextContent>
          </LevelItem>
          <LevelItem>
            <KafkaInstanceActions {...actionsProps} />
          </LevelItem>
        </Level>
      </PageSection>
      <PageSection
        variant={PageSectionVariants.light}
        padding={{ default: "noPadding" }}
        className="pf-c-page__main-tabs"
        hasShadowBottom={true}
      >
        <Nav variant="tertiary" className="pf-u-px-sm-on-xl">
          <NavList>
            <NavItem
              style={{ borderTop: 0 }}
              aria-label={t("dataPlaneTopicNavigation.consumer_groups")}
              ouiaId={"tab-Dashboard"}
              isActive={activeSection === "consumer"}
            >
              <Link to={tabsHref["consumer"]}>
                {t("dataPlaneTopicNavigation.consumer_groups")}
              </Link>
            </NavItem>
            <NavItem
              style={{ borderTop: 0 }}
              aria-label={t("dataPlaneTopicNavigation.messages")}
              ouiaId={"tab-Topics"}
              isActive={activeSection === "messages"}
            >
              <Link to={tabsHref["messages"]}>
                {t("dataPlaneTopicNavigation.messages")}
              </Link>
            </NavItem>
            <NavItem
              style={{ borderTop: 0 }}
              aria-label={t("dataPlaneTopicNavigation.properties")}
              ouiaId={"tab-Permissions"}
              isActive={activeSection === "properties"}
            >
              <Link to={tabsHref["properties"]}>
                {t("dataPlaneTopicNavigation.properties")}
              </Link>
            </NavItem>
            <NavItem
              style={{ borderTop: 0 }}
              aria-label={t("dataPlaneTopicNavigation.schemas")}
              ouiaId={"tab-Settings"}
              isActive={activeSection === "schemas"}
            >
              <Link to={tabsHref["schemas"]}>
                {t("dataPlaneTopicNavigation.schemas")}
              </Link>
            </NavItem>
          </NavList>
        </Nav>
      </PageSection>
    </>
  );
};
