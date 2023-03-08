/* eslint-disable */
// @ts-nocheck
import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import { AssetsContext } from "@rhoas/app-services-ui-shared";
import { ScalprumComponent } from "@scalprum/react-core";
import type { VoidFunctionComponent } from "react";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const appIdentifier = "applicationServices";

const basePath = "/apps/rhoas-guides-build";
const getPath = () => {
  return basePath;
};

export const QuickstartLoader: VoidFunctionComponent = () => {
  const [loaded, setLoaded] = useState(false);
  const chrome = useChrome();
  const { quickStarts } = chrome;

  const onLoad = (qs: unknown) => {
    if (quickStarts) {
      setLoaded(true); // unload federated module
      quickStarts.set(appIdentifier, qs);
    }
  };

  const processor = (item) => {
    const fixPath = (e) => `${basePath}${e}`;
    return item.guides.entry.map(fixPath);
  };

  return (
    <ErrorBoundary fallbackRender={() => null}>
      <AssetsContext.Provider value={{ getPath }}>
        {!loaded ? (
          <ScalprumComponent
            appName="guides"
            scope="guides"
            module="./QuickStartLoader"
            ErrorComponent={<div>opsie</div>}
            processor={processor}
            showDrafts={false}
            onLoad={onLoad}
          />
        ) : null}
      </AssetsContext.Provider>
    </ErrorBoundary>
  );
};
