import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { ChangeKafkaOwner } from "./ChangeKafkaOwner";

export default {
  component: ChangeKafkaOwner,
  args: {
    isModalOpen: true,
    accounts: [
      {
        id: "hema_kafka_devexp",
        displayName: "hemahg",
      },
      {
        id: "xxx_kafka_devexp",
        displayName: "foo-test-name",
      },
      {
        id: "zzz_kafka_devexp",
        displayName: "bar-test-display-name",
      },
      {
        id: "yyy_kafka_devexp",
        displayName: "baz-test-display",
      },
    ],
    currentOwner: "hema_kafka_devexp",
    selectedAcount: "",
  },
} as ComponentMeta<typeof ChangeKafkaOwner>;

export const InteractiveExample: ComponentStory<typeof ChangeKafkaOwner> = (
  args
) => {
  return <ChangeKafkaOwner {...args} />;
};
