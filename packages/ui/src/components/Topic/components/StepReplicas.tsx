import {
  Alert,
  Form,
  FormSection,
  Text,
  TextContent,
  TextVariants,
} from "@patternfly/react-core";
import { useTranslation } from "@rhoas/app-services-ui-components";
import type React from "react";
import type { AZ } from "ui-models/src/models/kafka";
import { TextWithLabelPopover } from "./TextWithLabelPopover";

export type StepReplicasProps = {
  replicationFactor: number;
  minInSyncReplica: number;
  availabiltyZone: AZ;
};

export const StepReplicas: React.FC<StepReplicasProps> = ({
  replicationFactor,
  minInSyncReplica,
  availabiltyZone,
}) => {
  const { t } = useTranslation(["create-topic"]);

  return (
    <Form>
      <FormSection
        title={t("replicas")}
        id="replica-section"
        titleElement={"h2"}
      >
        <TextContent>
          <Text component={TextVariants.p}>{t("replicas_info")}</Text>
          <Text component={TextVariants.small}>{t("replicas_detail")}</Text>
        </TextContent>
        <Alert
          variant="info"
          isInline
          title={
            availabiltyZone == "multi"
              ? t("replicas_helper_text_multi_az")
              : t("replicas_helper_text_single_az")
          }
        />

        <TextWithLabelPopover
          fieldId="replicas"
          btnAriaLabel={t("replicas")}
          fieldLabel={t("replicas")}
          fieldValue={replicationFactor.toString()}
          popoverBody={t("replicas_description")}
          popoverHeader={t("replicas")}
        />

        <TextWithLabelPopover
          fieldId="min-insync-replicas"
          btnAriaLabel="topic detail min-in-sync replica"
          fieldLabel="Minimum in-sync replicas"
          fieldValue={minInSyncReplica.toString()}
          popoverBody={t("min_insync_replicas_description")}
          popoverHeader={t("min_insync_replicas")}
        />
      </FormSection>
    </Form>
  );
};
