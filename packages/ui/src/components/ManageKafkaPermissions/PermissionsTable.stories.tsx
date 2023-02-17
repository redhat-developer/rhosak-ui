import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { PermissionsTable } from "./components/PermissionsTable";
import type { Permissions } from "./types";

const permissions: Permissions[] = [
  {
    account: "User:test_kafka_devexp",
    resource: {
      resourceName: "test",
      resourceType: "GROUP",
      patternType: "PREFIXED",
    },
    permission: { operation: "ALL", permission: "ALLOW" },
  },
  {
    account: "User:test_kafka_devexp",
    resource: {
      resourceName: "test",
      resourceType: "GROUP",
      patternType: "PREFIXED",
    },
    permission: { operation: "ALL", permission: "ALLOW" },
  },
];

export default {
  component: PermissionsTable,
  args: {
    permissions: permissions,
    itemCount: 2,
    perPage: 10,
    page: 1,
  },
} as ComponentMeta<typeof PermissionsTable>;

const Template: ComponentStory<typeof PermissionsTable> = (args) => (
  <PermissionsTable {...args} />
);

export const PermissionsTableView = Template.bind({});
PermissionsTableView.args = {};
