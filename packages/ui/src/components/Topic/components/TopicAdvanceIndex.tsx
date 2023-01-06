import {
  FormSection,
  Text,
  TextContent,
  TextVariants,
} from "@patternfly/react-core";
import { useTranslation } from "@rhoas/app-services-ui-components";
import convert from "convert";
import type React from "react";
import { TextWithLabelPopover } from "./TextWithLabelPopover";

type TopicAdavanceIndexProps = {
  defaultIndexIntervalSize: bigint;
  defaultSegmentIndexSize: bigint;
};

const TopicAdvanceIndex: React.FC<TopicAdavanceIndexProps> = ({
  defaultIndexIntervalSize,
  defaultSegmentIndexSize,
}) => {
  const { t } = useTranslation(["create-topic"]);

  return (
    <FormSection title={t("index")} id="index" titleElement={"h2"}>
      <TextContent>
        <Text component={TextVariants.p} className="section-info">
          {t("index_section_info")}
        </Text>
      </TextContent>

      <TextWithLabelPopover
        fieldId="index-interval-size"
        btnAriaLabel={t("index_interval_size")}
        fieldLabel={t("index_interval_size")}
        fieldValue={t("bytes_to_kibibytes", {
          bytes: defaultIndexIntervalSize,
          kibibytes: convert(Number(defaultIndexIntervalSize), "bytes").to(
            "kibibytes"
          ),
        })}
        popoverBody={t("index_interval_size_description")}
        popoverHeader={t("index_interval_size")}
      />

      <TextWithLabelPopover
        fieldId="segment-index-size"
        btnAriaLabel={t("segment_index_size")}
        fieldLabel={t("segment_index_size")}
        fieldValue={t("bytes_to_mebibytes", {
          bytes: defaultSegmentIndexSize,
          mebibytes: convert(Number(defaultIndexIntervalSize), "bytes").to(
            "mebibytes"
          ),
        })}
        popoverBody={t("segment_index_size_description")}
        popoverHeader={t("segment_index_size")}
      />
    </FormSection>
  );
};

export { TopicAdvanceIndex };
