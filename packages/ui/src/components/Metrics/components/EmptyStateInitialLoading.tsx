import {
  EmptyState,
  EmptyStateBody,
  EmptyStateVariant,
} from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { AppServicesLoading } from "@rhoas/app-services-ui-components";

export const EmptyStateInitialLoading: VoidFunctionComponent = () => {
  return (
    <EmptyState variant={EmptyStateVariant.xs}>
      <EmptyStateBody data-chromatic="ignore">
        <AppServicesLoading />
      </EmptyStateBody>
    </EmptyState>
  );
};
