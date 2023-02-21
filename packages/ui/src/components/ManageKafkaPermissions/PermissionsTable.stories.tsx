import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { PermissionsTable } from "./components/PermissionsTable";
import type { Permissions } from "./types";
import { PrincipalType } from "./types";

const permissions: Permissions[] = [
  {
    account: "User:snaithan_kafka_devexp",
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
  {
    account: "User:*",
    resource: {
      resourceName: "test",
      resourceType: "GROUP",
      patternType: "PREFIXED",
    },
    permission: { operation: "ALL", permission: "ALLOW" },
  },
];

const account = [
  {
    id: "test_kafka_devexp",
    displayName: "ServiceAccount",
    principalType: PrincipalType.ServiceAccount,
  },
  {
    id: "id5",
    displayName: "ServiceAccount5",
    principalType: PrincipalType.ServiceAccount,
  },
  {
    id: "id2",
    displayName: "ServiceAccount2",
    principalType: PrincipalType.ServiceAccount,
  },
  {
    id: "snaithan_kafka_devexp",
    displayName: "Suyash Naithani",
    principalType: PrincipalType.UserAccount,
    email: "snaithan@kafka_devexp",
  },
  {
    id: "id4",
    displayName: "UserAccount4",
    principalType: PrincipalType.UserAccount,
  },
  {
    id: "id6",
    displayName: "UserAccount6",
    principalType: PrincipalType.UserAccount,
  },
  {
    id: "id7",
    displayName: "ServiceAccount7",
    principalType: PrincipalType.ServiceAccount,
  },
];

export default {
  component: PermissionsTable,
  args: {
    permissions: permissions,
    itemCount: 2,
    perPage: 10,
    page: 1,
    allAccounts: account,
  },
} as ComponentMeta<typeof PermissionsTable>;

const Template: ComponentStory<typeof PermissionsTable> = (args) => (
  <PermissionsTable {...args} />
);

export const PermissionsTableView = Template.bind({});
PermissionsTableView.args = {};
