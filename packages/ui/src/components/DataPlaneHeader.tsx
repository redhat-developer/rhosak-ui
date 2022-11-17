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

type Sections =
  | "dashboard"
  | "topics"
  | "consumer"
  | "permissions"
  | "settings";

export type DataPlaneHeaderProps = {
  instancesHref: string;
  instanceName: string;
  activeSection: Sections;
  crumbs?: { label: string; href: string }[];
  sectionsHref: { [key in Sections]: string };
};

export const DataPlaneHeader: VoidFunctionComponent<DataPlaneHeaderProps> = ({
  instancesHref,
  instanceName,
  activeSection,
  sectionsHref,
  crumbs = [],
}) => {
  const { t } = useTranslation("kafka");

  return (
    <>
      {crumbs.length > 0 ? (
        <section className="pf-c-page__main-breadcrumb">
          <Breadcrumb ouiaId={"breadcrumb"}>
            <BreadcrumbItem
              render={() => (
                <Link to={instancesHref}>{t("common:kafka_instance")}</Link>
              )}
            />
            {crumbs.map((c, idx, crumbs) => (
              <BreadcrumbItem
                key={idx}
                to={c.href}
                isActive={idx === crumbs.length - 1}
              >
                {c.label}
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        </section>
      ) : undefined}
      <PageSection variant={PageSectionVariants.light}>
        <Level>
          <LevelItem>
            <TextContent>
              <Text component="h1">{instanceName}</Text>
            </TextContent>
          </LevelItem>
        </Level>
      </PageSection>
      <PageSection
        variant={PageSectionVariants.light}
        padding={{ default: "noPadding" }}
        className="pf-c-page__main-tabs"
        hasShadowBottom={true}
      >
        <Nav
          variant="tertiary"
          data-testid="pageKafka-tabProperties"
          className="pf-m-page-insets"
        >
          <NavList>
            <NavItem
              data-testid="pageKafka-tabDashboard"
              id="dashboard-tab-section"
              aria-label={t("dashboard.dashboard")}
              ouiaId={"tab-Dashboard"}
              isActive={activeSection === "dashboard"}
            >
              <Link to={sectionsHref["dashboard"]}>
                {t("dashboard.dashboard")}
              </Link>
            </NavItem>
            <NavItem
              data-testid="pageKafka-tabTopics"
              id="topics-tab-section"
              aria-label={t("topic.topics")}
              ouiaId={"tab-Topics"}
              isActive={activeSection === "topics"}
            >
              <Link to={sectionsHref["topics"]}>{t("topic.topics")}</Link>
            </NavItem>
            <NavItem
              data-testid="pageKafka-tabConsumers"
              id="consumer-groups-tab-section"
              aria-label={t("consumerGroup.consumer_groups")}
              ouiaId={"tab-Consumers"}
              isActive={activeSection === "consumer"}
            >
              <Link to={sectionsHref["consumer"]}>
                {t("consumerGroup.consumer_groups")}
              </Link>
            </NavItem>
            <NavItem
              data-testid="pageKafka-tabPermissions"
              id="permissions-tab-section"
              aria-label={t("permission.tab.label")}
              ouiaId={"tab-Permissions"}
              isActive={activeSection === "permissions"}
            >
              <Link to={sectionsHref["permissions"]}>
                {t("permission.tab.label")}
              </Link>
            </NavItem>
            <NavItem
              data-testid="pageKafka-tabSettings"
              id="settings-tab-section"
              aria-label={t("settings.settings")}
              ouiaId={"tab-Settings"}
              isActive={activeSection === "settings"}
            >
              <Link to={sectionsHref["settings"]}>
                {t("settings.settings")}
              </Link>
            </NavItem>
          </NavList>
        </Nav>
      </PageSection>
    </>
  );
};
