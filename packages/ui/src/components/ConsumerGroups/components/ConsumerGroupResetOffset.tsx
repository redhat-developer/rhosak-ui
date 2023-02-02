import {
  Alert,
  Button,
  Checkbox,
  Form,
  FormGroup,
  Modal,
  ModalVariant,
  Stack,
  StackItem,
  TextInput,
} from "@patternfly/react-core";
import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@patternfly/react-table";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Consumer } from "ui-models/src/models/consumer-group";
import "../ConsumerGroup.css";
import type { OffsetValue } from "../types";
import { OffsetSelect } from "./OffsetSelect";
import { TopicSelect } from "./TopicSelect";
import type { ConsumerGroupState } from "@rhoas/app-services-ui-components";
import type { FunctionComponent } from "react";

export type ConsumerRow = Consumer & {
  selected?: boolean;
};

export type ConsumerGroupResetOffsetProps = {
  isModalOpen: boolean;
  state: ConsumerGroupState;
  groupId: string;
  topics: string[];
  consumers: Consumer[];
  onClickClose: () => void;
  onClickResetOffset: (
    topic: string,
    offset: OffsetValue,
    partitions: number[],
    customOffset: string
  ) => void;
  disableFocusTrap?: boolean;
  appendTo?: () => HTMLElement;
};

export const ConsumerGroupResetOffset: FunctionComponent<
  ConsumerGroupResetOffsetProps
> = ({
  groupId,
  topics,
  onClickClose,
  isModalOpen,
  onClickResetOffset,
  disableFocusTrap,
  appendTo,
  consumers,
  state,
}) => {
  const { t } = useTranslation(["kafka"]);

  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedOffset, setSelectedOffset] = useState<OffsetValue>("absolute");
  const [customOffsetValue, setcustomOffsetValue] = useState<string>();

  const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);

  const [selectedConsumer, setSelectedConsumer] = useState<Consumer[]>([]);

  const isDisconnected = state !== "Stable";

  const consumerList =
    consumers.filter((consumer) => consumer.topic === selectedTopic) || [];

  const isResetOffsetDisabled =
    !selectedTopic ||
    !selectedOffset ||
    !isCheckboxChecked ||
    !isDisconnected ||
    selectedConsumer.length === 0;

  const tableColumns = {
    partition: t("consumerGroup.partition"),
    clientId: `${t("consumerGroup.client_id")} + ${t(
      "consumerGroup.member_id"
    )}`,
    current_offset: t("consumerGroup.current_offset"),
    log_end_offset: t("consumerGroup.log_end_offset"),
    offset_lag: t("consumerGroup.offset_lag"),
    new_offset: t("consumerGroup.new_offset"),
  };

  const areAllConsumerSelected =
    selectedConsumer.length === consumerList.length;

  const onSelectAllConsumer = (isSelecting = true) => {
    setSelectedConsumer(isSelecting ? consumerList : []);
  };

  const isConsumerSelected = (consumer: Consumer) => {
    return selectedConsumer.includes(consumer);
  };
  const onSelect = (consumer: Consumer, isSelecting = true) => {
    setSelectedConsumer(
      isSelecting
        ? [...selectedConsumer, consumer]
        : selectedConsumer.filter((r) => r !== consumer)
    );
  };

  const onResetOffset = useCallback(() => {
    const partitions = selectedConsumer.map(({ partition }) => partition);
    onClickResetOffset(
      selectedTopic,
      selectedOffset,
      partitions,
      customOffsetValue || "0"
    );
  }, [
    onClickResetOffset,
    selectedTopic,
    selectedOffset,
    selectedConsumer,
    customOffsetValue,
  ]);

  return (
    <Modal
      variant={ModalVariant.large}
      isOpen={isModalOpen}
      aria-label={t("consumerGroup.reset_offset_modal_label")}
      title={t("consumerGroup.reset_offset")}
      showClose={true}
      onClose={onClickClose}
      aria-describedby="modal-message"
      disableFocusTrap={disableFocusTrap}
      appendTo={appendTo}
      position="top"
      actions={[
        <Button
          variant="danger"
          key={1}
          isDisabled={isResetOffsetDisabled}
          onClick={onResetOffset}
        >
          {t("consumerGroup.reset_offset")}
        </Button>,
        <Button variant="link" key={2} onClick={onClickClose}>
          {t("common:cancel")}
        </Button>,
      ]}
    >
      <Stack hasGutter>
        <StackItem>
          <Form isHorizontal>
            <FormGroup
              className="mas--ConsumerGroupResetOffset-form-group--readonly"
              label={t("consumerGroup.reset_offset_consumer_group_label")}
              fieldId="consumer-group-input"
            >
              <TextInput
                readOnlyVariant={"default"}
                type="text"
                name={t("consumerGroup.reset_offset_consumer_group_label")}
                id={"consumer-group-input"}
                value={groupId}
              />
            </FormGroup>
            {isDisconnected && (
              <FormGroup
                label={t("consumerGroup.reset_offset_topic_label")}
                fieldId="topic-select"
              >
                <TopicSelect
                  value={selectedTopic}
                  topics={topics}
                  onChange={setSelectedTopic}
                />
              </FormGroup>
            )}
            {isDisconnected && selectedTopic && (
              <FormGroup
                label={t("consumerGroup.reset_offset_new_offset_label")}
                fieldId="offset-select"
              >
                <OffsetSelect
                  value={selectedOffset}
                  onChange={setSelectedOffset}
                />
              </FormGroup>
            )}
            {isDisconnected &&
              selectedTopic &&
              selectedOffset === "absolute" && (
                <FormGroup
                  label={t("consumerGroup.reset_offset_custom_offset_label")}
                  fieldId="custom-offset-input"
                >
                  <TextInput
                    id="custom-offset-input"
                    name={t("consumerGroup.reset_offset_custom_offset_label")}
                    value={customOffsetValue}
                    onChange={setcustomOffsetValue}
                    type="number"
                  />
                </FormGroup>
              )}
          </Form>
        </StackItem>
        <StackItem>
          {!isDisconnected && (
            <Alert
              className="modal-alert"
              variant="danger"
              isInline
              title={t("consumerGroup.reset_offset_connected_alert_title")}
            >
              <p>{t("consumerGroup.reset_offset_connected_alert_body")}</p>
            </Alert>
          )}
        </StackItem>
        <StackItem>
          {isDisconnected && consumerList.length > 0 && selectedTopic && (
            <Stack hasGutter>
              <StackItem>
                <TableComposable
                  aria-label={t("consumerGroup.reset_offset_selectable table")}
                  className="consumer-table"
                >
                  <Thead>
                    <Tr>
                      <Th
                        select={{
                          onSelect: (_event, isSelecting) =>
                            onSelectAllConsumer(isSelecting),
                          isSelected: areAllConsumerSelected,
                        }}
                      />
                      <Th>{tableColumns.partition}</Th>
                      <Th>{tableColumns.clientId}</Th>
                      <Th>{tableColumns.current_offset}</Th>
                      <Th>{tableColumns.log_end_offset}</Th>
                      <Th>{tableColumns.offset_lag}</Th>
                      <Th>{tableColumns.new_offset}</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {consumerList.map((consumer, index) => {
                      return (
                        <Tr key={index}>
                          <Td
                            select={{
                              rowIndex: index,
                              isSelected: isConsumerSelected(consumer),
                              onSelect: (_event, isSelecting) =>
                                onSelect(consumer, isSelecting),
                            }}
                          />
                          <Td dataLabel={tableColumns.partition}>
                            {consumer.partition}
                          </Td>
                          <Td dataLabel={tableColumns.clientId}>
                            {String(consumer.groupId)}
                            {String(consumer.memberId)}
                          </Td>
                          <Td dataLabel={tableColumns.current_offset}>
                            {consumer.offset}
                          </Td>
                          <Td dataLabel={tableColumns.log_end_offset}>
                            {consumer.logEndOffset}
                          </Td>
                          <Td dataLabel={tableColumns.offset_lag}>
                            {consumer.lag}
                          </Td>
                          <Td dataLabel={tableColumns.offset_lag}>
                            {isConsumerSelected(consumer) && selectedOffset
                              ? selectedOffset === "absolute"
                                ? customOffsetValue || 0
                                : selectedOffset
                              : "-"}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </TableComposable>
              </StackItem>
              <StackItem>
                <Checkbox
                  label={t("consumerGroup.reset_offset_accept")}
                  id="resetoffset-checkbox"
                  isChecked={isCheckboxChecked}
                  onChange={setIsCheckboxChecked}
                />
              </StackItem>
            </Stack>
          )}
        </StackItem>
      </Stack>
    </Modal>
  );
};
