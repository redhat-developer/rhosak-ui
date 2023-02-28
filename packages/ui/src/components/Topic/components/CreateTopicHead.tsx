import type { VoidFunctionComponent } from "react";
import { useTranslation } from "@rhoas/app-services-ui-components";
import {
  PageSection,
  PageSectionVariants,
  Title,
  Switch,
  Breadcrumb,
  BreadcrumbItem,
  Button,
} from "@patternfly/react-core";
import { Link } from "react-router-dom";

export type CreateTopicProps = {
  showAllOptions: boolean;
  kafkaName: string;
  onShowAllOptions: (value: boolean) => void;
  onKafkaInstanceLink: string;
  onKafkaPageLink: string;
};

export const CreateTopicHead: VoidFunctionComponent<CreateTopicProps> = ({
  showAllOptions,
  onShowAllOptions,
  kafkaName,
  onKafkaInstanceLink,
  onKafkaPageLink,
}) => {
  const { t } = useTranslation(["common", "topic"]);

  const mainBreadcrumbs = (
    <Breadcrumb ouiaId={"breadcrumb"}>
      <BreadcrumbItem
        render={() => (
          <Link to={onKafkaInstanceLink}>{t("common:kafka_instance")}</Link>
        )}
      />
      <BreadcrumbItem
        render={() => <Link to={onKafkaPageLink}>{kafkaName}</Link>}
      />
      <BreadcrumbItem isActive>{t("topic:create_topic")}</BreadcrumbItem>
    </Breadcrumb>
  );
  return (
    <>
      <section className="pf-c-page__main-breadcrumb">
        {mainBreadcrumbs}
      </section>
      <PageSection variant={PageSectionVariants.light}>
        <Title headingLevel="h1" size="2xl">
          {t("topic:create_topic")}
        </Title>
        <br />
        <Switch
          ouiaId={"toggle-switch-off"}
          id="id-show-all-options"
          label={t("topic:show_all_options")}
          labelOff={t("topic:show_all_options")}
          isChecked={showAllOptions}
          onChange={onShowAllOptions}
          className="create-topic-wizard"
        />
      </PageSection>
    </>
  );
};
