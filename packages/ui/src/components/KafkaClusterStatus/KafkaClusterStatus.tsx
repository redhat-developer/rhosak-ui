import type { VoidFunctionComponent } from "react";
import { StatusLabel } from "../KafkaInstanceStatus/components";
import { FailedClusterLabel } from "./components/FailedClusterLabel";
import { RegisteringLabel } from "./components/RegisteringLabel";
import type { PopoverStatus, Status } from "./types";
import "./components/ClusterStatusLabel.css";
import { useTranslation } from "@rhoas/app-services-ui-components";

export type KafkaClusterStatusProps = {
  status: Status;
  registeringStep: PopoverStatus;
};

export const KafkaClusterStatus: VoidFunctionComponent<
  KafkaClusterStatusProps
> = ({ status, registeringStep }) => {
  const { t } = useTranslation("kafka");

  const showLabel = () => {
    switch (status) {
      case "ready":
        return <StatusLabel value={"ready"} />;
      case "registering":
        return <RegisteringLabel registeringStep={registeringStep} />;
      case "failed":
        return <FailedClusterLabel />;
      case "unregistering":
        return (
          <div>
            <p className="mas-m-deleting"> {t("unregistering")}</p>
          </div>
        );
    }
  };

  return showLabel();
};
