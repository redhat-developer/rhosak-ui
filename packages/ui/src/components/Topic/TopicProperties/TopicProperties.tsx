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
import type React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import type { Topic } from "ui-models/src/models/topic";
import {
  formattedRetentionSize,
  formattedRetentionTime,
} from "../../KafkaTopics/types";
import { TextWithLabelPopover } from "../components";
import { Cleanup } from "../components/Cleanup";
import { Flush } from "../components/Flush";
import { Message } from "../components/Message";
import { Replication } from "../components/Replication";
import { TopicAdvanceIndex } from "../components/TopicAdvanceIndex";
import { TopicAdvanceJumpLinks } from "../components/TopicAdvanceJumpLinks";

export type TopicViewDetailProps = {
  topic: Topic;
  deleteTopicHref: string;
  updateTopicHref: string;
};

export const TopicProperties: React.FunctionComponent<TopicViewDetailProps> = ({
  topic,
  deleteTopicHref,
  updateTopicHref,
}) => {
  const { t } = useTranslation(["create-topic"]);
  return (
    <PageSection
      variant={"light"}
      className={"topic-properties"}
      hasOverflowScroll={true}
      aria-label={"TODO"}
    >
      <Sidebar hasGutter>
        <TopicAdvanceJumpLinks canHaveDelete={true} />
        <SidebarContent>
          <PageGroup
            hasOverflowScroll={true}
            aria-label={"TODO"}
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
                        btnAriaLabel={t("topic_name")}
                        fieldLabel={t("topic_name")}
                        fieldValue={topic.name}
                        popoverBody={t("topic_name_description")}
                        popoverHeader={t("topic_name")}
                      />

                      <TextWithLabelPopover
                        fieldId="partitions"
                        btnAriaLabel={t("partitions")}
                        fieldLabel={t("partitions")}
                        fieldValue={topic.partitions.length.toString()}
                        popoverBody={t("partitions_description")}
                        popoverHeader={t("partitions")}
                      />

                      <TextWithLabelPopover
                        fieldId="replicas"
                        btnAriaLabel={t("replicas")}
                        fieldLabel={t("replicas")}
                        fieldValue={
                          "TODO" /* TODO this is a config from the Kafka instance itself, should we be showing it? */
                        }
                        popoverBody={t("replicas_description")}
                        popoverHeader={t("replicas")}
                      />

                      <TextWithLabelPopover
                        fieldId="min-insync-replicas"
                        btnAriaLabel={t("min_insync_replicas")}
                        fieldLabel={t("min_insync_replicas")}
                        fieldValue={topic["min.insync.replicas"].toString()}
                        popoverBody={t("min_insync_replicas_description")}
                        popoverHeader={t("min_insync_replicas")}
                      />

                      <TextWithLabelPopover
                        fieldId="retention-time"
                        btnAriaLabel={t("retention_time")}
                        fieldLabel={t("retention_time")}
                        fieldValue={formattedRetentionTime(
                          topic["retention.ms"].value
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
                          topic["retention.bytes"].value
                        )}
                        popoverHeader={t("retention_size")}
                        popoverBody={t("retention_size_description")}
                        showUnlimited={true}
                      />
                    </FormSection>
                    <Message
                      defaultMaximumMessageBytes={
                        topic["max.message.bytes"].value
                      }
                      defaultMessageTimestampType={
                        topic["message.timestamp.type"]
                      }
                      defaultMaxMessageTimestampDiff={
                        topic["message.timestamp.difference.max.ms"].value
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
                        fieldValue={topic["cleanup.policy"]}
                        popoverBody={t("cleanup_policy_description")}
                        popoverHeader={t("cleanup_policy")}
                      />

                      <TextWithLabelPopover
                        fieldId="delete-retention-time"
                        btnAriaLabel={t("delete_retention_time")}
                        fieldLabel={t("delete_retention_time")}
                        fieldValue={topic[
                          "delete.retention.ms"
                        ].value.toString()}
                        popoverBody={t("delete_retention_time_description")}
                        popoverHeader={t("delete_retention_time")}
                      />

                      <TextWithLabelPopover
                        fieldId="min-cleanable-ratio"
                        btnAriaLabel={t("min_cleanable_ratio")}
                        fieldLabel={t("min_cleanable_ratio")}
                        fieldValue={topic[
                          "min.cleanable.dirty.ratio"
                        ].toString()}
                        popoverBody={t("min_cleanable_ratio_description")}
                        popoverHeader={t("min_cleanable_ratio")}
                      />

                      <TextWithLabelPopover
                        fieldId="min-compaction-lag-time"
                        btnAriaLabel={t("min_compaction_lag_time")}
                        fieldLabel={t("min_compaction_lag_time")}
                        fieldValue={topic[
                          "min.compaction.lag.ms"
                        ].value.toString()}
                        popoverBody={t("min_compaction_lag_time_description")}
                        popoverHeader={t("min_compaction_lag_time")}
                      />
                    </FormSection>
                    <Replication />
                    <Cleanup
                      defaultLogSegmentSize={topic["segment.bytes"].value}
                      defaultSegmentTime={topic["segment.ms"].value}
                      defaultSegmentJitterTime={
                        topic["segment.jitter.ms"].value
                      }
                      defaultFileDeleteDelay={
                        topic["file.delete.delay.ms"].value
                      }
                    />
                    <TopicAdvanceIndex
                      defaultIndexIntervalSize={
                        topic["index.interval.bytes"].value
                      }
                      defaultSegmentIndexSize={
                        topic["segment.index.bytes"].value
                      }
                    />
                    <Flush
                      defaultFlushIntervalMessages={
                        topic["flush.messages"].value
                      }
                      defaultFlushIntervalTime={topic["flush.ms"].value}
                    />
                  </Form>

                  <Divider className="pf-u-mt-2xl pf-u-mb-2xl" />

                  <TextContent>
                    <Text component={TextVariants.h2} id="delete">
                      {t("delete_topic_irreversible")}
                    </Text>
                    <Text component={TextVariants.p} className="section-info">
                      {t("delete_topic_info")}
                    </Text>
                    <Button
                      variant="danger"
                      data-testid="tabProperties-actionDelete"
                      component={(props) => (
                        <Link {...props} to={deleteTopicHref}>
                          {t("delete_topic")}
                        </Link>
                      )}
                    />
                  </TextContent>
                </SplitItem>
                <SplitItem>
                  <Button
                    variant="primary"
                    data-testid="tabProperties-actionEdit"
                    component={(props) => (
                      <Link {...props} to={updateTopicHref}>
                        {t("edit_props")}
                      </Link>
                    )}
                  />
                </SplitItem>
              </Split>
            </PageSection>
          </PageGroup>
        </SidebarContent>
      </Sidebar>
    </PageSection>
  );
};
