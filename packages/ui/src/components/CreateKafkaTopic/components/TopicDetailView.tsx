import React from "react";
import { useTranslation } from "react-i18next";
import {
  PageSection,
  PageGroup,
  JumpLinks,
  JumpLinksItem,
  TextContent,
  Text,
  TextVariants,
  Button,
  Divider,
  Sidebar,
  SidebarContent,
  SidebarPanel,
  SplitItem,
  Split,
  Form,
  FormSection,
} from "@patternfly/react-core";
import { TextWithLabelPopover } from "@rhoas/app-services-ui-components";
import { NewTopic } from "../types";
import { ConstantValues } from "../types";
import {
  formattedRetentionSize,
  formattedRetentionTime,
} from "../../KafkaTopics/types";

export type TopicViewDetailProps = {
  topic: NewTopic;
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
        <SidebarPanel variant="sticky">
          <JumpLinks
            isVertical
            label={t("jump_to_section")}
            style={{ position: "sticky" }}
            scrollableSelector=".pf-c-page__main-section.pf-m-light.pf-m-overflow-scroll"
          >
            <JumpLinksItem key={0} href="#core-configuration">
              {t("core_configuration")}
            </JumpLinksItem>
            <JumpLinksItem key={1} href="#messages">
              {t("messages")}
            </JumpLinksItem>
            <JumpLinksItem key={2} href="#log">
              {t("log")}
            </JumpLinksItem>
            <JumpLinksItem key={3} href="#replication">
              {t("replication")}
            </JumpLinksItem>
            <JumpLinksItem key={4} href="#cleanup">
              {t("cleanup")}
            </JumpLinksItem>
            <JumpLinksItem key={5} href="#index">
              {t("index")}
            </JumpLinksItem>
            <JumpLinksItem key={6} href="#flush">
              {t("flush")}
            </JumpLinksItem>
            <JumpLinksItem key={7} href="#delete">
              {t("delete")}
            </JumpLinksItem>
          </JumpLinks>
        </SidebarPanel>
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
                        fieldValue={topic.numPartitions.toString()}
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
                    <FormSection
                      title={t("messages")}
                      id="messages"
                      titleElement={"h2"}
                    >
                      <TextContent>
                        <Text
                          component={TextVariants.p}
                          className="section-info"
                        >
                          {t("message_section_info")}
                        </Text>
                      </TextContent>

                      <TextWithLabelPopover
                        fieldId="max-message-size"
                        btnAriaLabel={t("max_message_size")}
                        fieldLabel={t("max_message_size")}
                        fieldValue={constantValues.DEFAULT_MAXIMUM_MESSAGE_BYTES.toString()}
                        popoverBody={t("max_message_size_description")}
                        popoverHeader={t("max_message_size")}
                      />

                      <TextWithLabelPopover
                        fieldId="message-timestamp-type"
                        btnAriaLabel={t("message_timestamp_type")}
                        fieldLabel={t("message_timestamp_type")}
                        fieldValue={
                          constantValues.DEFAULT_MESSAGE_TIMESTAMP_TYPE
                        }
                        popoverBody={t("message_timestamp_type_description")}
                        popoverHeader={t("message_timestamp_type")}
                      />

                      <TextWithLabelPopover
                        fieldId="max-message-timestamp-diff"
                        btnAriaLabel={t("max_message_timestamp_diff")}
                        fieldLabel={t("max_message_timestamp_diff")}
                        fieldValue={
                          constantValues.DEFAULT_MAX_MESSAGE_TIMESTAMP_DIFF_MILLISECONDS
                        }
                        popoverBody={t(
                          "max_message_timestamp_diff_description"
                        )}
                        popoverHeader={t("max_message_timestamp_diff")}
                      />

                      <TextWithLabelPopover
                        fieldId="compression-type"
                        btnAriaLabel={t("compression_type")}
                        fieldLabel={t("compression_type")}
                        fieldValue="Producer"
                        popoverBody={t("compression_type_description")}
                        popoverHeader={t("compression_type")}
                      />

                      <TextWithLabelPopover
                        fieldId="message-format"
                        btnAriaLabel={t("message_format")}
                        fieldLabel={t("message_format")}
                        fieldValue="2.7-IV2"
                        popoverBody={t("message_format_description")}
                        popoverHeader={t("message_format")}
                      />
                    </FormSection>
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
                    <FormSection
                      title={t("replication")}
                      id="replication"
                      titleElement={"h2"}
                    >
                      <TextContent>
                        <Text component={TextVariants.p}>
                          {t("replication_section_info")}
                          <Text component={TextVariants.small}>
                            {t("replication_section_info_note")}
                          </Text>
                        </Text>
                      </TextContent>

                      <TextWithLabelPopover
                        fieldId="unclean-leader-election"
                        btnAriaLabel={t("unclean_leader_election")}
                        fieldLabel={t("unclean_leader_election")}
                        fieldValue={t("disabled")}
                        popoverBody={t("unclean_leader_election_description")}
                        popoverHeader={t("unclean_leader_election")}
                      />
                    </FormSection>

                    <FormSection
                      title={t("cleanup")}
                      id="cleanup"
                      titleElement={"h2"}
                    >
                      <TextContent>
                        <Text
                          component={TextVariants.p}
                          className="section-info"
                        >
                          {t("cleanup_section_info")}
                        </Text>
                      </TextContent>

                      <TextWithLabelPopover
                        fieldId="log-segment-size"
                        btnAriaLabel={t("log_segment_size")}
                        fieldLabel={t("log_segment_size")}
                        fieldValue={constantValues.DEFAULT_LOG_SEGMENT_SIZE_BYTES.toString()}
                        popoverBody={t("log_segment_size_description")}
                        popoverHeader={t("log_segment_size")}
                      />

                      <TextWithLabelPopover
                        fieldId="segement-time"
                        btnAriaLabel={t("segement_time")}
                        fieldLabel={t("segement_time")}
                        fieldValue={constantValues.DEFAULT_SEGMENT_TIME_MILLISECONDS.toString()}
                        popoverBody={t("segement_time_description")}
                        popoverHeader={t("segement_time")}
                      />

                      <TextWithLabelPopover
                        fieldId="segment-jitter-time"
                        btnAriaLabel={t("segment_jitter_time")}
                        fieldLabel={t("segment_jitter_time")}
                        fieldValue={constantValues.DEFAULT_SEGMENT_JITTER_TIME_MILLISECONDS.toString()}
                        popoverBody={t("segment_jitter_time_description")}
                        popoverHeader={t("segment_jitter_time")}
                      />

                      <TextWithLabelPopover
                        fieldId="file-delete-delay"
                        btnAriaLabel={t("file_delete_delay")}
                        fieldLabel={t("file_delete_delay")}
                        fieldValue={constantValues.DEFAULT_FILE_DELETE_DELAY_MILLISECONDS.toString()}
                        popoverBody={t("file_delete_delay_description")}
                        popoverHeader={t("file_delete_delay")}
                      />

                      <TextWithLabelPopover
                        fieldId="preallocate-log-segment-files"
                        btnAriaLabel={t("preallocate_log_segment_files")}
                        fieldLabel={t("preallocate_log_segment_files")}
                        fieldValue={t("common.disabled")}
                        popoverBody={t(
                          "topic.preallocate_log_segment_files_description"
                        )}
                        popoverHeader={t("preallocate_log_segment_files")}
                      />
                    </FormSection>
                    <FormSection
                      title={t("index")}
                      id="index"
                      titleElement={"h2"}
                    >
                      <TextContent>
                        <Text
                          component={TextVariants.p}
                          className="section-info"
                        >
                          {t("index_section_info")}
                        </Text>
                      </TextContent>

                      <TextWithLabelPopover
                        fieldId="index-interval-size"
                        btnAriaLabel={t("index_interval_size")}
                        fieldLabel={t("index_interval_size")}
                        fieldValue={constantValues.DEFAULT_INDEX_INTERVAL_SIZE_BYTES.toString()}
                        popoverBody={t("index_interval_size_description")}
                        popoverHeader={t("index_interval_size")}
                      />

                      <TextWithLabelPopover
                        fieldId="segment-index-size"
                        btnAriaLabel={t("segment_index_size")}
                        fieldLabel={t("segment_index_size")}
                        fieldValue={constantValues.DEFAULT_SEGMENT_INDEX_SIZE_BYTES.toString()}
                        popoverBody={t("segment_index_size_description")}
                        popoverHeader={t("segment_index_size")}
                      />
                    </FormSection>
                    <FormSection
                      title={t("flush")}
                      id="flush"
                      titleElement={"h2"}
                    >
                      <TextContent>
                        <Text
                          component={TextVariants.p}
                          className="section-info"
                        >
                          {t("flush_section_info")}
                        </Text>
                      </TextContent>

                      <TextWithLabelPopover
                        fieldId="flush-interval-messages"
                        btnAriaLabel={t("flush_interval_messages")}
                        fieldLabel={t("flush_interval_messages")}
                        fieldValue={
                          constantValues.DEFAULT_FLUSH_INTERVAL_MESSAGES
                        }
                        popoverBody={t(
                          "topic.flush_interval_messages_description"
                        )}
                        popoverHeader={t("flush_interval_messages")}
                      />

                      <TextWithLabelPopover
                        fieldId="flush-interval-time"
                        btnAriaLabel={t("flush_interval_time")}
                        fieldLabel={t("flush_interval_time")}
                        fieldValue={
                          constantValues.DEFAULT_FLUSH_INTERVAL_TIME_MILLISECONDS
                        }
                        popoverBody={t("flush_interval_time_description")}
                        popoverHeader={t("flush_interval_time")}
                      />
                    </FormSection>
                  </Form>

                  <Divider className="kafka-ui-divider__Margin" />

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
