import { I18nProvider as UiComponentsI18nProvider } from "@rhoas/app-services-ui-components";
import { FunctionComponent } from "react";

export const I18nProvider: FunctionComponent = ({ children }) => {
  return (
    <UiComponentsI18nProvider
      lng={"en"}
      resources={{
        en: {
          common: () =>
            import("@rhoas/app-services-ui-components/locales/en/common.json"),
          "create-kafka-instance": () =>
            import("locales/en/create-kafka-instance.json"),
          kafka: () => import("locales/en/kafka.json"),
          metrics: () => import("locales/en/metrics.json"),
          topic: () => import("locales/en/topic.json"),
          "manage-kafka-permissions": () =>
            import("locales/en/manage-kafka-permissions.json"),
          "create-topic": () => import("locales/en/create-topic.json"),
          "message-browser": () => import("locales/en/message-browser.json"),
          "connection-tab": () => import("locales/en/connection-tab.json"),
          "connection-tab-p1": () =>
            import("locales/en/connection-tab-p1.json"),
        },
        it: {
          common: () => Promise.resolve({ delete: "Elimina" }),
        },
      }}
      debug={true}
    >
      {children}
    </UiComponentsI18nProvider>
  );
};
