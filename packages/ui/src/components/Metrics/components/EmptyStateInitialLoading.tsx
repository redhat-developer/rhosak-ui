import {
  EmptyState,
  EmptyStateBody,
  EmptyStateVariant,
  PageSection,
} from "@patternfly/react-core";
import { AppServicesLoading } from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";

export const EmptyStateInitialLoading: VoidFunctionComponent = () => {
  return (
    <PageSection isFilled={true}>
      <EmptyState variant={EmptyStateVariant.xs}>
        <EmptyStateBody data-chromatic="ignore">
          <AppServicesLoading />
        </EmptyStateBody>
      </EmptyState>
    </PageSection>
  );
};
