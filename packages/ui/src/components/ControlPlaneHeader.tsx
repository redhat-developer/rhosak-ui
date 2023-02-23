import {
  Divider,
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
import {
  ExternalLink,
  Trans,
  useTranslation,
} from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";
import { Link } from "react-router-dom";

type Sections = "standard" | "dedicated" | "clusters";

export type ControlPlaneHeaderProps = {
  activeSection: Sections;
  sectionsHref: { [key in Sections]: string };
};

export const ControlPlaneHeader: VoidFunctionComponent<
  ControlPlaneHeaderProps
> = ({ activeSection, sectionsHref }) => {
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
        <Nav variant="tertiary" className="pf-u-px-sm-on-xl">
          <NavList>
            <NavItem
              style={{ borderTop: 0 }}
              data-testid="pageKafka-tabstandard"
              id="dashboard-tab-section"
              aria-label={t("controlPlaneNavigation.standard")}
              ouiaId={"tab-standard"}
              isActive={activeSection === "standard"}
            >
              <Link to={sectionsHref["standard"]}>
                {t("controlPlaneNavigation.standard")}
              </Link>
            </NavItem>
            <NavItem
              style={{ borderTop: 0 }}
              data-testid="pageKafka-tabdedicated"
              id="dashboard-tab-section"
              aria-label={t("controlPlaneNavigation.dedicated")}
              ouiaId={"tab-dedicated"}
              isActive={
                activeSection === "dedicated" || activeSection === "clusters"
              }
            >
              <Link to={sectionsHref["dedicated"]}>
                {t("controlPlaneNavigation.dedicated")}
              </Link>
            </NavItem>
          </NavList>
        </Nav>
        {(activeSection === "dedicated" || activeSection === "clusters") && (
          <>
            <Divider />
            <Nav variant="tertiary" className="pf-u-px-sm-on-xl">
              <NavList>
                <NavItem
                  style={{ borderTop: 0 }}
                  data-testid="pageKafka-tabdedicated"
                  id="dashboard-tab-section"
                  aria-label={t("controlPlaneNavigation.dedicated")}
                  ouiaId={"tab-dedicated"}
                  isActive={activeSection === "dedicated"}
                >
                  <Link to={sectionsHref["dedicated"]}>
                    {t("controlPlaneNavigation.dedicated-instances")}
                  </Link>
                </NavItem>
                <NavItem
                  style={{ borderTop: 0 }}
                  data-testid="pageKafka-tabclusters"
                  id="dashboard-tab-section"
                  aria-label={t("controlPlaneNavigation.clusters")}
                  ouiaId={"tab-clusters"}
                  isActive={activeSection === "clusters"}
                >
                  <Link to={sectionsHref["clusters"]}>
                    {t("controlPlaneNavigation.clusters")}
                  </Link>
                </NavItem>
              </NavList>
            </Nav>
          </>
        )}
        <Divider />
        <div className="pf-u-p-md pf-u-p-lg-on-xl">
          {(() => {
            switch (activeSection) {
              case "standard":
                return t("standard_description");
              case "dedicated":
                return (
                  <Trans
                    ns={"kafka"}
                    i18nKey={"dedicated_description"}
                    components={[
                      <ExternalLink
                        href={"https://access.redhat.com/articles/TODO"}
                        testId={"dedicated-instances-support-link"}
                        className={"pf-u-ml-xs"}
                      />,
                    ]}
                  />
                );
              case "clusters":
                return (
                  <Trans
                    ns={"kafka"}
                    i18nKey={"clusters_description"}
                    components={[
                      <ExternalLink
                        href={"https://access.redhat.com/articles/TODO"}
                        testId={"clusters-support-link"}
                        className={"pf-u-ml-xs"}
                      />,
                    ]}
                  />
                );
            }
          })()}
        </div>
      </PageSection>
    </>
  );
};
