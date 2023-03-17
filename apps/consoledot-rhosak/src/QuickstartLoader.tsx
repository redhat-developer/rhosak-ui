/* eslint-disable */
// @ts-nocheck
import { ScalprumComponent } from "@scalprum/react-core";
import type { VoidFunctionComponent } from "react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const appIdentifier = "applicationServices";

const basePath = "/apps/rhoas-guides-build";
const getPath = () => {
  return basePath;
};

export const QuickstartLoader: VoidFunctionComponent = () => {
  return (
    <Suspense fallback={null}>
      <ErrorBoundary fallbackRender={() => null}>
        <ScalprumComponent
          appName="applicationServices"
          scope="applicationServices"
          module="./Guides"
          ErrorComponent={null}
        />
      </ErrorBoundary>
    </Suspense>
  );
};
