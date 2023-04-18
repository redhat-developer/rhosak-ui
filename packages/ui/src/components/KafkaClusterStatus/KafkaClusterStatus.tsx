import { useTranslation, useInterval } from "@rhoas/app-services-ui-components";
import { differenceInMinutes } from "date-fns";
import type { VoidFunctionComponent } from "react";
import { useCallback, useState } from "react";
import { StatusLabel } from "../KafkaInstanceStatus/components";
import "./components/ClusterStatusLabel.css";
import { FailedClusterLabel } from "./components/FailedClusterLabel";
import { RegisteringLabel } from "./components/RegisteringLabel";
import type { Status } from "./types";

export type KafkaClusterStatusProps = {
  status: Status;
  createdAt: Date;
  warningAfterMinutes?: number;
  errorAfterMinutes?: number;
  onClickSupportLink: () => void;
};

export const KafkaClusterStatus: VoidFunctionComponent<
  KafkaClusterStatusProps
> = ({
  status,
  createdAt,
  warningAfterMinutes = 15,
  errorAfterMinutes = 30,
  onClickSupportLink,
}) => {
  const { t } = useTranslation("kafka");
  const [alert, setAlert] = useState<"warning" | "error" | false>(false);

  const checkCreatedAt = useCallback(() => {
    const elapsed = differenceInMinutes(new Date(), createdAt);
    if (elapsed > errorAfterMinutes) {
      setAlert("error");
    } else if (elapsed > warningAfterMinutes) {
      setAlert("warning");
    } else {
      setAlert(false);
    }
  }, [createdAt, errorAfterMinutes, warningAfterMinutes]);

  useInterval(checkCreatedAt, 5000);
  const showWarning = alert === "warning";
  const showError = alert === "error";

  switch (status) {
    case "ready":
      return <StatusLabel value={"ready"} />;
    case "accepted":
    case "provisioning":
    case "provisioned":
    case "waitingOperator":
      return (
        <RegisteringLabel
          registeringStep={status}
          showWarning={showWarning}
          showError={showError}
          onClickSupportLink={onClickSupportLink}
        />
      );
    case "failed":
      return <FailedClusterLabel />;
    case "deprovisioning":
    case "cleanup":
      return (
        <div>
          <p className="mas-m-unregistering"> {t("unregistering")}</p>
        </div>
      );
  }
};
