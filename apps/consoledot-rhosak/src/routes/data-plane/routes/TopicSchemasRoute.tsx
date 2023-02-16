/* eslint-disable */
// @ts-nocheck
import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import { I18nProvider } from "@rhoas/app-services-ui-components";
import type { Auth, Config } from "@rhoas/app-services-ui-shared";
import { AuthContext, ConfigContext } from "@rhoas/app-services-ui-shared";
/* tslint:disable */
import type { Registry } from "@rhoas/registry-management-sdk";
import type { ScalprumComponentProps } from "@scalprum/react-core";
import { ScalprumComponent } from "@scalprum/react-core";
import type { VoidFunctionComponent } from "react";
import type { DataPlaneNavigationProps } from "../routesConsts";
import { useTopicGate } from "../useTopicGate";
import { DataPlaneTopicHeaderConnected } from "./DataPlaneTopicHeaderConnected";

export const TopicSchemasRoute: VoidFunctionComponent<
  DataPlaneNavigationProps
> = ({
  instanceDetailsHref,
  instanceTopicsHref,
  instancesHref,
  instanceConsumerGroupsHref,
}) => {
  const chrome = useChrome();
  const { topic } = useTopicGate();
  const processor = (([_, m]: [string, { entry: string[] }]) =>
    m.entry.map(
      (e) => `/beta/apps/srs-ui-build${e}`
    )) as unknown as ScalprumComponentProps["processor"];
  const processor2 = (([_, m]: [string, { entry: string[] }]) =>
    m.entry.map(
      (e) => `/beta/apps/sr-ui-build${e}`
    )) as unknown as ScalprumComponentProps["processor"];
  const basename = "/service-registry";
  const auth: Auth = {
    srs: { getToken: chrome.auth.getToken },
  };
  const config: Config = {
    srs: { apiBasePath: process.env.API_URL },
  };
  return (
    <>
      <DataPlaneTopicHeaderConnected
        instancesHref={instancesHref}
        instanceDetailsHref={instanceDetailsHref}
        instanceTopicsHref={instanceTopicsHref}
        instanceConsumerGroupsHref={instanceConsumerGroupsHref}
        activeSection={"schemas"}
      />
      <AuthContext.Provider value={auth}>
        <ConfigContext.Provider value={config}>
          <I18nProvider
            lng={"en"}
            resources={{
              en: {
                common: () =>
                  import(
                    "@rhoas/app-services-ui-components/locales/en/common.json"
                  ),
                "service-registry": () =>
                  import(
                    "@rhoas/app-services-ui-components/locales/en/service-registry.json"
                  ),
                srsTemporaryFixMe: () => import("./srs-locales.json"),
              },
            }}
            debug={true}
          >
            <ScalprumComponent
              appName="srs"
              module="./ServiceRegistryMapping"
              scope="srs"
              ErrorComponent={<div>opsie</div>}
              processor={processor}
              basename={basename}
              topicName={topic.name}
              renderSchema={(registry: Registry) => {
                return (
                  <ScalprumComponent
                    appName="ar"
                    scope="ar"
                    ErrorComponent={<div>opsie</div>}
                    processor={processor2}
                    module="./FederatedSchemaMapping"
                    registry={registry}
                    topicName={topic.name}
                    groupId={null}
                    version={"latest"}
                    registryId={registry?.id}
                    basename={basename}
                  />
                );
              }}
            />
          </I18nProvider>
        </ConfigContext.Provider>
      </AuthContext.Provider>
    </>
  );
};
