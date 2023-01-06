import type { DeleteModalProps } from "@rhoas/app-services-ui-components";
import {
  DeleteModal,
  Trans,
  useTranslation,
} from "@rhoas/app-services-ui-components";
import type { VoidFunctionComponent } from "react";

export type DeleteKafkaTopicProps = {
  topicName: string;
} & Omit<
  DeleteModalProps,
  "title" | "variant" | "confirmationValue" | "children"
>;

export const DeleteKafkaTopic: VoidFunctionComponent<DeleteKafkaTopicProps> = ({
  topicName,
  ...props
}) => {
  const { t } = useTranslation("kafka");

  return (
    <DeleteModal
      {...props}
      variant={"destructive"}
      title={t("delete_topic_title")}
      confirmationValue={topicName}
    >
      <Trans
        ns={"kafka"}
        i18nKey={"delete_topic_message"}
        components={[<strong />]}
        values={{
          topicName,
        }}
      />
    </DeleteModal>
  );
};
