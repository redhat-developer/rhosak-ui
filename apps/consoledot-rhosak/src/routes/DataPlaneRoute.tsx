import { PageSection } from "@patternfly/react-core";
import { MetricsConnected } from "consoledot-containers";
import type { VoidFunctionComponent } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import type { DataPlaneHeaderProps } from "ui";
import { DataPlaneHeader } from "ui";

export type DataPlaneRouteParams = { id: string; name: string };

export type DataPlaneRouteProps = {
  instancesHref: DataPlaneHeaderProps["instancesHref"];
};

export const DataPlaneRoute: VoidFunctionComponent<DataPlaneRouteProps> = ({
  instancesHref,
}) => {
  const {
    path,
    url,
    params: { id, name },
  } = useRouteMatch<DataPlaneRouteParams>();

  const crumbs = [{ href: url, label: name }];
  const sectionsHref = {
    dashboard: `${url}/dashboard`,
    topics: `${url}/topics`,
    consumer: `${url}/consumer`,
    permissions: `${url}/permissions`,
    settings: `${url}/settings`,
  };

  return (
    <>
      <Route
        path={`${path}/:section`}
        render={({ match }) => (
          <DataPlaneHeader
            instancesHref={instancesHref}
            instanceName={name}
            crumbs={crumbs}
            activeSection={
              match.params.section as DataPlaneHeaderProps["activeSection"]
            }
            sectionsHref={sectionsHref}
          />
        )}
      />
      <Switch>
        <Route
          path={`${path}/dashboard`}
          exact={true}
          render={() => <MetricsConnected />}
        />
        <Route>
          <PageSection isFilled={true}>TODO</PageSection>
        </Route>
      </Switch>
    </>
  );
};

export default DataPlaneRoute;
