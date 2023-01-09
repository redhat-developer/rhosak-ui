import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
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
        displayName: "xxx",
      },
      {
        id: "zzz_kafka_devexp",
        displayName: "zzz",
      },
      {
        id: "yyy_kafka_devexp",
        displayName: "yyy",
      },
    ],
    currentOwner: "hema_kafka_devexp",
    selectedAcount: "",
  },
} as ComponentMeta<typeof ChangeKafkaOwner>;

export const InteractiveExample: ComponentStory<typeof ChangeKafkaOwner> = (
  args
) => {
  const [selectedAccount, setSelectedAccount] = useState<string | undefined>(
    undefined
  );

  return (
    <ChangeKafkaOwner
      {...args}
      selectedAccount={selectedAccount}
      onChangeAccount={setSelectedAccount}
    />
  );
};
