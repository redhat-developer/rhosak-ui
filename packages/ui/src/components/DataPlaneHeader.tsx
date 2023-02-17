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
  sectionsHref: { [key in Sections]: string };
} & KafkaInstanceActionsProps;

export const DataPlaneHeader: VoidFunctionComponent<DataPlaneHeaderProps> = ({
  instancesHref,
  instanceName,
  activeSection,
  sectionsHref,
  ...actionsProps
}) => {
  const { t } = useTranslation("kafka");

  return (
    <>
      <PageSection
        variant={PageSectionVariants.light}
        padding={{ default: "noPadding" }}
        hasShadowBottom={true}
      >
        <Breadcrumb
          ouiaId={"breadcrumb"}
          className="pf-c-page__main-breadcrumb"
        >
          <BreadcrumbItem
            render={() => (
              <Link to={instancesHref}>{t("common:kafka_instance")}</Link>
            )}
          />
          <BreadcrumbItem isActive={true}>{instanceName}</BreadcrumbItem>
        </Breadcrumb>
        <Level>
          <LevelItem>
            <TextContent className={"pf-u-p-md pf-u-p-lg-on-xl"}>
              <Text component="h1">{instanceName}</Text>
            </TextContent>
          </LevelItem>
          <LevelItem>
            <KafkaInstanceActions {...actionsProps} />
          </LevelItem>
        </Level>
        <Nav
          variant="tertiary"
          data-testid="pageKafka-tabProperties"
          className="pf-u-px-sm-on-xl"
        >
          <NavList>
            <NavItem
              style={{ borderTop: 0 }}
              data-testid="pageKafka-tabDashboard"
              id="dashboard-tab-section"
              aria-label={t("dataPlaneNavigation.dashboard")}
              ouiaId={"tab-Dashboard"}
              isActive={activeSection === "dashboard"}
            >
              <Link to={sectionsHref["dashboard"]}>
                {t("dataPlaneNavigation.dashboard")}
              </Link>
            </NavItem>
            <NavItem
              style={{ borderTop: 0 }}
              data-testid="pageKafka-tabTopics"
              id="topics-tab-section"
              aria-label={t("dataPlaneNavigation.topics")}
              ouiaId={"tab-Topics"}
              isActive={activeSection === "topics"}
            >
              <Link to={sectionsHref["topics"]}>
                {t("dataPlaneNavigation.topics")}
              </Link>
            </NavItem>
            <NavItem
              style={{ borderTop: 0 }}
              data-testid="pageKafka-tabConsumers"
              id="consumer-groups-tab-section"
              aria-label={t("dataPlaneNavigation.consumer_groups")}
              ouiaId={"tab-Consumers"}
              isActive={activeSection === "consumer"}
            >
              <Link to={sectionsHref["consumer"]}>
                {t("dataPlaneNavigation.consumer_groups")}
              </Link>
            </NavItem>
            <NavItem
              style={{ borderTop: 0 }}
              data-testid="pageKafka-tabPermissions"
              id="permissions-tab-section"
              aria-label={t("dataPlaneNavigation.permissions")}
              ouiaId={"tab-Permissions"}
              isActive={activeSection === "permissions"}
            >
              <Link to={sectionsHref["permissions"]}>
                {t("dataPlaneNavigation.permissions")}
              </Link>
            </NavItem>
            <NavItem
              style={{ borderTop: 0 }}
              data-testid="pageKafka-tabSettings"
              id="settings-tab-section"
              aria-label={t("dataPlaneNavigation.settings")}
              ouiaId={"tab-Settings"}
              isActive={activeSection === "settings"}
            >
              <Link to={sectionsHref["settings"]}>
                {t("dataPlaneNavigation.settings")}
              </Link>
            </NavItem>
          </NavList>
        </Nav>
      </PageSection>
    </>
  );
};
