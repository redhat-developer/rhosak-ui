import {
  Alert,
  AlertGroup,
  AlertVariant,
  Button,
  ButtonVariant,
} from "@patternfly/react-core";
import { Trans, useTranslation } from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";
import type { DedicatedPlanAvailability } from "../types";

export type ModalAlertsDedicatedPlanProps = {
  instanceAvailability: DedicatedPlanAvailability;
  onClickContactUs: () => void;
};

export const ModalAlertsDedicatedPlan: VoidFunctionComponent<
  ModalAlertsDedicatedPlanProps
> = ({ instanceAvailability, onClickContactUs }) => {
  const { t } = useTranslation("create-kafka-instance");

  return (
    <AlertGroup>
      {(() => {
        switch (instanceAvailability) {
          case "out-of-quota":
            return (
              <Alert
                role={"alert"}
                className="pf-u-mb-md"
                variant={AlertVariant.warning}
                title={t("modal_alerts.out_of_quota_title")}
                isInline
              >
                <Trans
                  ns={["create-kafka-instance"]}
                  i18nKey={t("modal_alerts.out_of_quota_message")}
                  components={[
                    <Button
                      key="btn-contact-us"
                      variant={ButtonVariant.link}
                      onClick={onClickContactUs}
                      isInline
                    />,
                  ]}
                />
              </Alert>
            );
          case "clusters-unavailable":
            return (
              <Alert
                role={"alert"}
                className="pf-u-mb-md"
                variant={AlertVariant.warning}
                title={t("modal_alerts.cluster_unavailable_title")}
                isInline
              >
                {t("modal_alerts.cluster_unavailable_message")}
              </Alert>
            );
          case "available":
            return null;
        }
      })()}
    </AlertGroup>
  );
};
