import type { RenderOptions, RenderResult } from "@testing-library/react";
import { act, render, waitFor } from "@testing-library/react";
import type { FunctionComponent, ReactElement } from "react";
import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nProvider } from "./components";

const suspenseTestId = "i18n-suspense";

const AllTheProviders: FunctionComponent = ({ children }) => {
  return (
    <Router>
      <I18nProvider lng={"en"} debug={false}>
        <Suspense fallback={<div data-testid={suspenseTestId}>loading</div>}>
          {children}
        </Suspense>
      </I18nProvider>
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
