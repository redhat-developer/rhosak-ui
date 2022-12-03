import type { TabsProps } from "@patternfly/react-core";
import {
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelBody,
  DrawerPanelContent,
  Tab,
  Tabs,
  TabTitleText,
  Text,
  TextContent,
  TextVariants,
  Title,
  TitleSizes,
} from "@patternfly/react-core";
import { useTranslation } from "@rhoas/app-services-ui-components";
import { parseISO } from "date-fns";
import type { FunctionComponent, VoidFunctionComponent } from "react";
import { useCallback, useMemo } from "react";
import type { KafkaInstance } from "../../types";
import { CreatingStatuses } from "../../types";
import { KafkaConnectionTabP2, KafkaDetailsTab } from "./components";

export type KafkaInstanceDrawerProps = {
  instance?: KafkaInstance;
  activeTab: KafkaInstanceDrawerTab;
  onTabChange: (tab: KafkaInstanceDrawerTab) => void;
  onClose: () => void;
};

export const KafkaInstanceDrawer: FunctionComponent<
  KafkaInstanceDrawerProps
> = ({ instance, activeTab, onTabChange, onClose, children }) => {
  const isDrawerOpen = instance !== undefined;
  const content = useMemo(() => {
    return (
      <DrawerPanelContent>
        {instance ? (
          <KafkaInstanceDrawerPanel
            instance={instance}
            activeTab={activeTab}
            onTabChange={onTabChange}
            onClose={onClose}
          />
        ) : null}
      </DrawerPanelContent>
    );
  }, [activeTab, instance, onClose, onTabChange]);
  return (
    <Drawer isExpanded={isDrawerOpen} isInline={true}>
      <DrawerContent panelContent={content}>
        <DrawerContentBody
          className={"pf-u-display-flex pf-u-flex-direction-column"}
        >
          {children}
        </DrawerContentBody>
      </DrawerContent>
    </Drawer>
  );
};

export type KafkaInstanceDrawerTab = "details" | "connections";

export const KafkaInstanceDrawerPanel: VoidFunctionComponent<
  Required<KafkaInstanceDrawerProps> & { activeTab: KafkaInstanceDrawerTab }
> = ({ instance, activeTab, onTabChange, onClose }) => {
  const { t } = useTranslation(["kafka"]);

  const handleSelect: TabsProps["onSelect"] = useCallback(
    (_, tab) => {
      const t = tab as KafkaInstanceDrawerTab;
      onTabChange(t);
    },
    [onTabChange]
  );

  const isKafkaPending = CreatingStatuses.includes(instance.status);

  return (
    <>
      <DrawerHead>
        <TextContent>
          <Text component={TextVariants.small} className={"pf-u-mb-0"}>
            {t("common:name")}
          </Text>
          <Title
            headingLevel={"h1"}
            size={TitleSizes["xl"]}
            className={"pf-u-mt-0"}
          >
            {instance.name}
          </Title>
        </TextContent>
        <DrawerActions>
          <DrawerCloseButton onClick={onClose} />
        </DrawerActions>
      </DrawerHead>
      <DrawerPanelBody>
        <Tabs activeKey={activeTab} onSelect={handleSelect}>
          <Tab
            eventKey={"details"}
            title={<TabTitleText>{t("drawer-tabs.details")}</TabTitleText>}
          >
            <div className={"pf-u-pt-md pf-u-pb-md"}>
              <KafkaDetailsTab
                id={instance.id}
                owner={instance.owner}
                createdAt={parseISO(instance.createdAt)}
                updatedAt={parseISO(instance.updatedAt)}
                expiryDate={
                  instance.expiryDate
                    ? parseISO(instance.expiryDate)
                    : undefined
                }
                size={instance.size}
                ingress={instance.ingress}
                egress={instance.egress}
                storage={instance.storage}
                maxPartitions={instance.maxPartitions}
                connections={instance.connections}
                connectionRate={instance.connectionRate}
                messageSize={instance.messageSize}
                region={t(instance.region)}
                instanceType={instance.plan}
                billing={instance.billing}
                kafkaVersion={instance.version}
              />
            </div>
          </Tab>
          <Tab
            eventKey={"connections"}
            title={<TabTitleText>{t("drawer-tabs.connections")}</TabTitleText>}
            data-testid="drawerStreams-tabConnect"
          >
            <div className={"pf-u-pt-md pf-u-pb-md"}>
              <KafkaConnectionTabP2
                isKafkaPending={isKafkaPending}
                externalServer={getExternalServer(instance.bootstrapUrl)}
                tokenEndPointUrl={"TODO"}
                linkToServiceAccount={"service-accounts"}
                linkToAccessTab={`TODO/acls`}
                adminAPIUrl={getAdminServerUrl(instance.adminUrl)}
                showCreateServiceAccountModal={() => {
                  /* TODO */
                }}
                kafkaFleetManagerUrl={
                  "https://api.openshift.com/api/kafkas_mgmt/v1/openapi"
                }
              />
            </div>
          </Tab>
        </Tabs>
      </DrawerPanelBody>
    </>
  );
};

const getExternalServer = (bootstrapUrl: string | undefined) => {
  return bootstrapUrl?.endsWith(":443") ? bootstrapUrl : `${bootstrapUrl}:443`;
};

const getAdminServerUrl = (adminUrl: string | undefined) => {
  return adminUrl ? `${adminUrl}/openapi` : undefined;
};
