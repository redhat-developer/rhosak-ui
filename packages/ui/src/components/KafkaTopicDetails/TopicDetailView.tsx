import {
  Button,
  Divider,
  Form,
  FormSection,
  PageGroup,
  PageSection,
  Sidebar,
  SidebarContent,
  Split,
  SplitItem,
  Text,
  TextContent,
  TextVariants,
} from "@patternfly/react-core";
import { TextWithLabelPopover } from "@rhoas/app-services-ui-components";
import type React from "react";
import { useTranslation } from "react-i18next";
import type { KafkaTopic } from "../../types";
import { Cleanup } from "../CreateKafkaTopic/components/Cleanup";
import { Flush } from "../CreateKafkaTopic/components/Flush";
import { Message } from "../CreateKafkaTopic/components/Message";
import { Replication } from "../CreateKafkaTopic/components/Replication";
import { TopicAdvanceIndex } from "../CreateKafkaTopic/components/TopicAdvanceIndex";
import { TopicAdvanceJumpLinks } from "../CreateKafkaTopic/components/TopicAdvanceJumpLinks";
import "../CreateKafkaTopic/CreateTopicPage.css";
import type { ConstantValues } from "../CreateKafkaTopic/types";
import {
  formattedRetentionSize,
  formattedRetentionTime,
} from "../KafkaTopics/types";

export type TopicViewDetailProps = {
  topic: KafkaTopic;
  deleteTopic: () => void;
  constantValues: ConstantValues;
  updateTopic: () => void;
};

export const TopicDetailView: React.FunctionComponent<TopicViewDetailProps> = ({
  topic,
  deleteTopic,
  constantValues,
  updateTopic,
}) => {
  const { t } = useTranslation(["create-topic"]);
  return (
    <PageSection padding={{ default: "noPadding" }}>
      <Sidebar hasGutter>
        <TopicAdvanceJumpLinks canHaveDelete={true} />
        <SidebarContent>
          <PageGroup
            hasOverflowScroll
            id="topic-detail-view"
            className={"pf-u-mb-4xl"}
          >
            <PageSection padding={{ default: "noPadding" }}>
              <Split>
                <SplitItem isFilled>
                  <Form id="topic-form">
                    <FormSection
                      title={t("core_configuration")}
                      id="core-configuration"
                      titleElement={"h2"}
                    >
                      <TextContent>
                        <Text
                          component={TextVariants.p}
                          className="section-info"
                        >
                          {t("core_config_info")}
                        </Text>
                      </TextContent>

                      <TextWithLabelPopover
                        fieldId="topic-name"
                        btnAriaLabel={t("name")}
                        fieldLabel={t("topic_name")}
                        fieldValue={topic.name}
                        popoverBody={t("topic_name_description")}
                        popoverHeader={t("topic_name")}
                      />

                      <TextWithLabelPopover
                        fieldId="partitions"
                        btnAriaLabel={t("partitions")}
                        fieldLabel={t("partitions")}
                        fieldValue={topic.partitionsCount.toString()}
                        popoverBody={t("partitions_description")}
                        popoverHeader={t("partitions")}
                      />

                      <TextWithLabelPopover
                        fieldId="replicas"
                        btnAriaLabel={t("replicas")}
                        fieldLabel={t("replicas")}
                        fieldValue={topic.replicationFactor.toString()}
                        popoverBody={t("replicas_description")}
                        popoverHeader={t("replicas")}
                      />

                      <TextWithLabelPopover
                        fieldId="min-insync-replicas"
                        btnAriaLabel={t("min_insync_replicas")}
                        fieldLabel={t("min_insync_replicas")}
                        fieldValue={
                          topic.minInSyncReplica?.toString() ||
                          constantValues.DEFAULT_MIN_INSYNC_REPLICAS.toString()
                        }
                        popoverBody={t("min_insync_replicas_description")}
                        popoverHeader={t("min_insync_replicas")}
                      />

                      <TextWithLabelPopover
                        fieldId="retention-time"
                        btnAriaLabel={t("retention_time")}
                        fieldLabel={t("retention_time")}
                        fieldValue={formattedRetentionTime(
                          Number(topic["retentionTime"])
                        )}
                        popoverBody={t("retention_time_description")}
                        popoverHeader={t("retention_time")}
                        showUnlimited={true}
                      />

                      <TextWithLabelPopover
                        fieldId="retention-size"
                        btnAriaLabel={t("retention_size")}
                        fieldLabel={t("retention_size")}
                        fieldValue={formattedRetentionSize(
                          Number(topic["retentionBytes"])
                        )}
                        popoverHeader={t("retention_size")}
                        popoverBody={t("retention_size_description")}
                        showUnlimited={true}
                      />
                    </FormSection>
                    <Message
                      defaultMaximumMessageBytes={
                        constantValues.DEFAULT_MAXIMUM_MESSAGE_BYTES
                      }
                      defaultMessageTimestampType={
                        constantValues.DEFAULT_MESSAGE_TIMESTAMP_TYPE
                      }
                      defaultMaxMessageTimestampDiff={
                        constantValues.DEFAULT_MAX_MESSAGE_TIMESTAMP_DIFF_MILLISECONDS
                      }
                    />
                    <FormSection title={t("log")} id="log" titleElement={"h2"}>
                      <TextContent>
                        <Text component={TextVariants.p}>
                          {t("log_section_info")}
                          <Text
                            component={TextVariants.small}
                            className="section-info-note"
                          >
                            {t("log_section_info_note")}
                          </Text>
                        </Text>
                      </TextContent>

                      <TextWithLabelPopover
                        fieldId="cleanup-policy"
                        btnAriaLabel={t("cleanup_policy")}
                        fieldLabel={t("cleanup_policy")}
                        fieldValue={topic["cleanupPolicy"]}
                        popoverBody={t("cleanup_policy_description")}
                        popoverHeader={t("cleanup_policy")}
                      />

                      <TextWithLabelPopover
                        fieldId="delete-retention-time"
                        btnAriaLabel={t("delete_retention_time")}
                        fieldLabel={t("delete_retention_time")}
                        fieldValue={constantValues.DEFAULT_DELETE_RETENTION_TIME_MILLISECONDS.toString()}
                        popoverBody={t("delete_retention_time_description")}
                        popoverHeader={t("delete_retention_time")}
                      />

                      <TextWithLabelPopover
                        fieldId="min-cleanable-ratio"
                        btnAriaLabel={t("min_cleanable_ratio")}
                        fieldLabel={t("min_cleanable_ratio")}
                        fieldValue={constantValues.DEFAULT_MIN_CLEANBLE_RATIO.toString()}
                        popoverBody={t("min_cleanable_ratio_description")}
                        popoverHeader={t("min_cleanable_ratio")}
                      />

                      <TextWithLabelPopover
                        fieldId="min-compaction-lag-time"
                        btnAriaLabel={t("min_compaction_lag_time")}
                        fieldLabel={t("min_compaction_lag_time")}
                        fieldValue={constantValues.DEFAULT_MINIMUM_COMPACTION_LAG_TIME_MILLISECONDS.toString()}
                        popoverBody={t("min_compaction_lag_time_description")}
                        popoverHeader={t("min_compaction_lag_time")}
                      />
                    </FormSection>
                    <Replication />
                    <Cleanup
                      defaultLogSegmentSize={
                        constantValues.DEFAULT_LOG_SEGMENT_SIZE_BYTES
                      }
                      defaultSegmentTime={
                        constantValues.DEFAULT_SEGMENT_TIME_MILLISECONDS
                      }
                      defaultSegmentJitterTime={
                        constantValues.DEFAULT_SEGMENT_JITTER_TIME_MILLISECONDS
                      }
                      defaultFileDeleteDelay={
                        constantValues.DEFAULT_FILE_DELETE_DELAY_MILLISECONDS
                      }
                    />
                    <TopicAdvanceIndex
                      defaultIndexIntervalSize={
                        constantValues.DEFAULT_INDEX_INTERVAL_SIZE_BYTES
                      }
                      defaultSegmentIndexSize={
                        constantValues.DEFAULT_SEGMENT_INDEX_SIZE_BYTES
                      }
                    />
                    <Flush
                      defaultFlushIntervalMessages={
                        constantValues.DEFAULT_FLUSH_INTERVAL_MESSAGES
                      }
                      defaultFlushIntervalTime={
                        constantValues.DEFAULT_FLUSH_INTERVAL_TIME_MILLISECONDS
                      }
                    />
                  </Form>

                  <Divider className="delete-topic-divider__Margin" />

                  <TextContent>
                    <Text component={TextVariants.h2} id="delete">
                      {t("delete_topic_irreversible")}
                    </Text>
                    <Text component={TextVariants.p} className="section-info">
                      {t("delete_topic_info")}
                    </Text>
                    <Button
                      variant="danger"
                      onClick={deleteTopic}
                      data-testid="tabProperties-actionDelete"
                    >
                      {t("delete_topic")}
                    </Button>
                  </TextContent>
                </SplitItem>
                <SplitItem>
                  <Button
                    variant="primary"
                    onClick={updateTopic}
                    data-testid="tabProperties-actionEdit"
                  >
                    {t("edit_props")}
                  </Button>
                </SplitItem>
              </Split>
            </PageSection>
          </PageGroup>
        </SidebarContent>
      </Sidebar>
    </PageSection>
  );
};
