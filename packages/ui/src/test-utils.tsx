import { AlertProvider, I18nProvider } from "@rhoas/app-services-ui-components";
import type { RenderOptions, RenderResult } from "@testing-library/react";
import { act, render, waitFor } from "@testing-library/react";
import type { FunctionComponent, ReactElement } from "react";
import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";

const suspenseTestId = "i18n-suspense";

const AllTheProviders: FunctionComponent = ({ children }) => {
  return (
    <Router>
      <AlertProvider>
        <I18nProvider
          lng={"en"}
          resources={{
            en: {
              common: () =>
                import(
                  "@rhoas/app-services-ui-components/locales/en/common.json"
                ),
              "create-kafka-instance": () =>
                import("../locales/en/create-kafka-instance.json"),
              kafka: () => import("../locales/en/kafka.json"),
              metrics: () => import("../locales/en/metrics.json"),
              topic: () => import("../locales/en/topic.json"),
              "manage-kafka-permissions": () =>
                import("../locales/en/manage-kafka-permissions.json"),
              "create-topic": () => import("../locales/en/create-topic.json"),
              "message-browser": () =>
                import("../locales/en/message-browser.json"),
              "connection-tab": () =>
                import("../locales/en/connection-tab.json"),
              "connection-tab-p1": () =>
                import("../locales/en/connection-tab-p1.json"),
            },
          }}
          debug={false}
        >
          <Suspense fallback={<div data-testid={suspenseTestId}>loading</div>}>
            {children}
          </Suspense>
        </I18nProvider>
      </AlertProvider>
    </Router>
  );
};

const AllTheProvidersWithRoot: FunctionComponent = ({ children }) => (
  <AllTheProviders>
    <div id={"root"}>{children}</div>
  </AllTheProviders>
);
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

const renderDialog = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProvidersWithRoot, ...options });

async function waitForI18n(r: RenderResult) {
  await waitFor(() => {
    expect(r.queryByTestId(suspenseTestId)).not.toBeInTheDocument();
  });
}

async function waitForPopper() {
  await act(async () => {
    /* let popper do its updates */
  });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render, renderDialog, waitForI18n, waitForPopper };
