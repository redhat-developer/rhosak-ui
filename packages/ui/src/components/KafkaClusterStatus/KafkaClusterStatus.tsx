import { useTranslation } from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";
import { StatusLabel } from "../KafkaInstanceStatus/components";
import "./components/ClusterStatusLabel.css";
import { FailedClusterLabel } from "./components/FailedClusterLabel";
import { RegisteringLabel } from "./components/RegisteringLabel";
import type { Status } from "./types";

export type KafkaClusterStatusProps = {
  status: Status;
};

export const KafkaClusterStatus: VoidFunctionComponent<
  KafkaClusterStatusProps
> = ({ status }) => {
  const { t } = useTranslation("kafka");

  switch (status) {
    case "ready":
      return <StatusLabel value={"ready"} />;
    case "accepted":
    case "provisioning":
    case "provisioned":
    case "waitingOperator":
      return <RegisteringLabel registeringStep={status} />;
    case "failed":
      return <FailedClusterLabel />;
    case "deprovisioning":
    case "cleanup":
      return (
        <div>
          <p className="mas-m-deleting"> {t("unregistering")}</p>
        </div>
      );
  }
};
