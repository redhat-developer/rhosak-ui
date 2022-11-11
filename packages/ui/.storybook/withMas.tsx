import {
  AlertProvider,
  AppServicesLoading,
} from "@rhoas/app-services-ui-components";
import { PartialStoryFn, StoryContext } from "@storybook/csf";
import { Args, ReactFramework } from "@storybook/react/types-6-0";
import { Suspense, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nProvider } from "../src";

import { InsightsChromeLayout } from "./InsightsChromeLayout";

export const withMas = (
  Story: PartialStoryFn<ReactFramework, Args>,
  { globals }: StoryContext<ReactFramework, Args>
) => {
  useEffect(() => {
    document.body.classList.toggle("show-ouia", JSON.parse(globals.ouia));
  }, [globals.ouia]);

  return (
    <InsightsChromeLayout withLayout={globals.withInsightsChrome === "true"}>
      <Router>
        <AlertProvider>
          <I18nProvider>
            <Suspense fallback={<AppServicesLoading />}>
              <Story />
            </Suspense>
          </I18nProvider>
        </AlertProvider>
      </Router>
    </InsightsChromeLayout>
  );
};
