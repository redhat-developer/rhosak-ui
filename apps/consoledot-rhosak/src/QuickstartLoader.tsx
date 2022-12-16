// @ts-nocheck
import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
/* tslint:disable */
import { AssetsContext } from "@rhoas/app-services-ui-shared";
import type { ScalprumComponentProps } from "@scalprum/react-core";
import { ScalprumComponent } from "@scalprum/react-core";
import type { VoidFunctionComponent } from "react";
import { useState } from "react";

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

  const processor = (([_, m]: [string, { entry: string[] }]) =>
    m.entry.map(
      (e) => `${basePath}${e}`
    )) as unknown as ScalprumComponentProps["processor"];

  return (
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
  );
};
