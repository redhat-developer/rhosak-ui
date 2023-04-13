import {
  Split,
  SplitItem,
  TextContent,
  Text,
  Icon,
} from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import "../../KafkaInstanceStatus/components/StatusLabel.css";
import { useTranslation } from "@rhoas/app-services-ui-components";
import { ExclamationCircleIcon } from "@patternfly/react-icons";
import "./ClusterStatusLabel.css";
export const FailedClusterLabel: VoidFunctionComponent = () => {
  const { t } = useTranslation("kafka");
  return (
    <>
      <Split hasGutter className="mas-c-status">
        <SplitItem>
          <Icon status="danger">
            <ExclamationCircleIcon />
          </Icon>
        </SplitItem>
        <SplitItem>
          <TextContent>
            <Text component="p">{t("statuses-filter.failed")}</Text>
          </TextContent>
        </SplitItem>
      </Split>
    </>
  );
};
