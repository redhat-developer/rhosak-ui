import {
  ActionGroup,
  Button,
  Divider,
  Form,
  PageGroup,
  PageSection,
  Sidebar,
  SidebarContent,
  ValidatedOptions,
} from "@patternfly/react-core";
import { useTranslation } from "@rhoas/app-services-ui-components";
import type React from "react";
import { useState } from "react";
import type { Topic } from "ui-models/src/models/topic";
import type {
  CustomRetentionSizeSelect,
  CustomSelect,
  RadioSelectType,
  RetentionSizeRadioSelect,
} from "..";
import { Cleanup } from "./Cleanup";
import { CoreConfiguration } from "./CoreConfiguration";
import { Flush } from "./Flush";
import { Log } from "./Log";
import { Message } from "./Message";
import { Replication } from "./Replication";
import { TopicAdvanceIndex } from "./TopicAdvanceIndex";
import { TopicAdvanceJumpLinks } from "./TopicAdvanceJumpLinks";

export type TopicAdvancePageProps = {
  isCreate: boolean;
  onConfirm: (data: Topic) => void;
  handleCancel?: () => void;
  topicData: Topic;
  setTopicData: (val: Topic) => void;
  checkTopicName?: (value: string) => boolean;
  availablePartitionLimit: number;
  customRetentionSizeValue: CustomRetentionSizeSelect;
  setCustomRetentionSizeValue: (data: CustomRetentionSizeSelect) => void;
  customTimeValue: CustomSelect;
  setCustomTimeValue: (data: CustomSelect) => void;
  radioTimeSelectValue: RadioSelectType;
  setRadioTimeSelectValue: (value: RadioSelectType) => void;
  radioSizeSelectValue: RetentionSizeRadioSelect;
  setRadioSizeSelectValue: (data: RetentionSizeRadioSelect) => void;
};

export const TopicAdvancePage: React.FunctionComponent<
  TopicAdvancePageProps
> = ({
  isCreate,
  onConfirm,
  handleCancel,
  topicData,
  setTopicData,
  checkTopicName,
  availablePartitionLimit,
  customTimeValue,
  setCustomTimeValue,
  radioTimeSelectValue,
  setRadioTimeSelectValue,
  setCustomRetentionSizeValue,
  customRetentionSizeValue,
  radioSizeSelectValue,
  setRadioSizeSelectValue,
}) => {
  const { t } = useTranslation(["create-topic", "common"]);
  const actionText = isCreate ? t("create_topic") : t("common:save");

  //states

  const [topicValidated, setTopicValidated] = useState<ValidatedOptions>(
    ValidatedOptions.default
  );
  const [invalidText, setInvalidText] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [warning, setWarning] = useState<boolean>(false);
  const onValidateTopic = () => {
    if (isCreate) {
      if (topicData?.name.length < 1) {
        setInvalidText(t("common:required"));
        setTopicValidated(ValidatedOptions.error);
      } else {
        setIsLoading(true);

        const isTopicNameValid =
          checkTopicName && checkTopicName(topicData?.name);
        if (!isTopicNameValid) {
          setIsLoading(false);
          setInvalidText(t("already_exists", { name: topicData?.name })),
            setTopicValidated(ValidatedOptions.error);
        } else onConfirm(topicData);
      }
    } else {
      onConfirm(topicData);
    }
  };

  return (
    <PageSection padding={{ default: "noPadding" }}>
      <Sidebar hasGutter>
        <TopicAdvanceJumpLinks />
        <SidebarContent>
          <PageGroup
            hasOverflowScroll={true}
            id="topic-detail-view"
            aria-label={"TODO"}
          >
            <PageSection padding={{ default: "noPadding" }}>
              <Form>
                <CoreConfiguration
                  isCreate={isCreate}
                  topicData={topicData}
                  setTopicData={setTopicData}
                  availablePartitionLimit={availablePartitionLimit}
                  invalidText={invalidText}
                  setInvalidText={setInvalidText}
                  setTopicValidated={setTopicValidated}
                  topicValidated={topicValidated}
                  setWarning={setWarning}
                  warning={warning}
                  customRetentionSizeValue={customRetentionSizeValue}
                  setCustomRetentionSizeValue={setCustomRetentionSizeValue}
                  customTimeValue={customTimeValue}
                  setCustomTimeValue={setCustomTimeValue}
                  radioTimeSelectValue={radioTimeSelectValue}
                  setRadioTimeSelectValue={setRadioTimeSelectValue}
                  radioSizeSelectValue={radioSizeSelectValue}
                  setRadioSizeSelectValue={setRadioSizeSelectValue}
                />
                <Message
                  defaultMaximumMessageBytes={
                    topicData["max.message.bytes"].value
                  }
                  defaultMessageTimestampType={
                    topicData["message.timestamp.type"]
                  }
                  defaultMaxMessageTimestampDiff={
                    topicData["message.timestamp.difference.max.ms"].value
                  }
                />
                <Log
                  topicData={topicData}
                  setTopicData={setTopicData}
                  defaultDeleteRetentionTime={topicData["retention.ms"].value}
                  defaultMinCleanbleRatio={
                    topicData["min.cleanable.dirty.ratio"]
                  }
                  defaultMinimumCompactionLagTime={
                    topicData["min.compaction.lag.ms"].value
                  }
                />
                <Replication />
                <Cleanup
                  defaultLogSegmentSize={topicData["segment.bytes"].value}
                  defaultSegmentTime={topicData["segment.ms"].value}
                  defaultSegmentJitterTime={
                    topicData["segment.jitter.ms"].value
                  }
                  defaultFileDeleteDelay={
                    topicData["file.delete.delay.ms"].value
                  }
                />
                <TopicAdvanceIndex
                  defaultIndexIntervalSize={
                    topicData["index.interval.bytes"].value
                  }
                  defaultSegmentIndexSize={
                    topicData["segment.index.bytes"].value
                  }
                />
                <Flush
                  defaultFlushIntervalMessages={
                    topicData["flush.messages"].value
                  }
                  defaultFlushIntervalTime={topicData["flush.ms"].value}
                />
              </Form>

              <ActionGroup className="kafka-ui--sticky-footer">
                <Divider className="kafka-ui--divider--FlexShrink" />
                <Button
                  isLoading={isLoading}
                  onClick={onValidateTopic}
                  variant="primary"
                  data-testid={
                    isCreate
                      ? "topicAdvanceCreate-actionCreate"
                      : "tabProperties-actionSave"
                  }
                  isDisabled={topicValidated !== "default"}
                >
                  {actionText}
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="link"
                  data-testid={
                    isCreate
                      ? "topicAdvanceCreate-actionCancel"
                      : "tabProperties-actionCancel"
                  }
                >
                  {t("common:cancel")}
                </Button>
              </ActionGroup>
            </PageSection>
          </PageGroup>
        </SidebarContent>
      </Sidebar>
    </PageSection>
  );
};
