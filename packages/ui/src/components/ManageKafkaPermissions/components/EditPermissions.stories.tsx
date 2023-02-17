import { EditPermissions } from "./EditPermissions";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  PermissionsForAllAccounts,
  PermissionsForSelectedAccount,
} from "./ReviewPermissionsTable.stories";
export default {
  component: EditPermissions,
  args: {
    kafkaName: "name-test",
    selectedAcount: "test-account",
  },
} as ComponentMeta<typeof EditPermissions>;

export const InteractiveExampleAllAccountsSelected: ComponentStory<
  typeof EditPermissions
> = (args) => {
  return (
    <div
      id="modal-scroll"
      style={{ transform: "scale(1)", minHeight: 850, height: "100%" }}
    >
      <EditPermissions
        {...args}
        existingAcls={PermissionsForAllAccounts}
        selectedAccount={"All accounts"}
        topicsList={["topic-1", "my-topic", "test-topic"]}
        consumerGroupsList={["consumer", "my-consumer", "test-consumer"]}
      />
    </div>
  );
};

export const InteractiveExampleSelectedAccount: ComponentStory<
  typeof EditPermissions
> = (args) => {
  return (
    <div
      id="modal-scroll"
      style={{ transform: "scale(1)", minHeight: 850, height: "100%" }}
    >
      <EditPermissions
        {...args}
        existingAcls={PermissionsForSelectedAccount}
        topicsList={["topic-1", "my-topic", "test-topic"]}
        consumerGroupsList={["consumer", "my-consumer", "test-consumer"]}
      />
    </div>
  );
};
