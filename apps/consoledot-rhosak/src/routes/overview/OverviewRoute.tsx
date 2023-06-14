import { Button, PageSection } from "@patternfly/react-core";
import { getBaseName } from "@redhat-cloud-services/frontend-components-utilities/helpers";
import {
  EmptyState,
  EmptyStateVariant,
} from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export const OverviewRoute: VoidFunctionComponent = () => {
  const { t } = useTranslation();

  function GoHomeBtn() {
    function handleClick() {
      document.location = "/application-services";
    }

    return (
      <Button onClick={handleClick}>{t("common:return_to_home_page")}</Button>
    );
  }

  return (
    <PageSection padding={{ default: "noPadding" }} isFilled>
      <EmptyState
        emptyStateProps={{ variant: EmptyStateVariant.PageNotFound }}
        titleProps={{ title: t("common:404_page_does_not_exist") }}
        emptyStateBodyProps={{
          body: t("common:we_cannot_find_the_page_you_are_looking_for"),
        }}
      >
        <GoHomeBtn />
      </EmptyState>
    </PageSection>
  );
};
