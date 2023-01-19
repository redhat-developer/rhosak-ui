import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import type { AclBinding } from "../types";

import { ReviewPermissionsTable } from "./ReviewPermissionsTable";

export const PermissionsForAllAccounts: AclBinding[] = [
  {
    resourceType: "CLUSTER",
    resourceName: "*",
    patternType: "LITERAL",
    principal: "User:*",
    operation: "DESCRIBE",
    permission: "ALLOW",
  },
  {
    resourceType: "GROUP",
    resourceName: "*",
    patternType: "LITERAL",
    principal: "User:*",
    operation: "DESCRIBE",
    permission: "ALLOW",
  },
  {
    resourceType: "TOPIC",
    resourceName: "*",
    patternType: "LITERAL",
    principal: "User:*",
    operation: "DESCRIBE",
    permission: "ALLOW",
  },
  {
    resourceType: "TOPIC",
    resourceName: "*",
    patternType: "LITERAL",
    principal: "User:*",
    operation: "DESCRIBE_CONFIGS",
    permission: "ALLOW",
  },
  {
    resourceType: "TOPIC",
    resourceName: "test",
    patternType: "PREFIXED",
    principal: "User:*",
    operation: "CREATE",
    permission: "DENY",
  },
  {
    resourceType: "TOPIC",
    resourceName: "test",
    patternType: "PREFIXED",
    principal: "User:*",
    operation: "WRITE",
    permission: "DENY",
  },
];

export const PermissionsForSelectedAccount: AclBinding[] = [
  {
    resourceType: "CLUSTER",
    resourceName: "*",
    patternType: "LITERAL",
    principal: "User:*",
    operation: "DESCRIBE",
    permission: "ALLOW",
  },
  {
    resourceType: "GROUP",
    resourceName: "*",
    patternType: "LITERAL",
    principal: "User:*",
    operation: "DESCRIBE",
    permission: "ALLOW",
  },
  {
    resourceType: "TOPIC",
    resourceName: "*",
    patternType: "LITERAL",
    principal: "User:*",
    operation: "DESCRIBE",
    permission: "ALLOW",
  },
  {
    resourceType: "TOPIC",
    resourceName: "*",
    patternType: "LITERAL",
    principal: "User:*",
    operation: "DESCRIBE_CONFIGS",
    permission: "ALLOW",
  },
  {
    operation: "ALL",
    patternType: "PREFIXED",
    permission: "ALLOW",
    principal: "User:test_kafka_devexp",
    resourceName: "test",
    resourceType: "TOPIC",
  },
  {
    operation: "ALL",
    patternType: "PREFIXED",
    permission: "ALLOW",
    principal: "User:test_kafka_devexp",
    resourceName: "test",
    resourceType: "GROUP",
  },
];

export default {
  component: ReviewPermissionsTable,
  args: {},
  excludeStories: [
    "PermissionsForAllAccounts",
    "PermissionsForSelectedAccount",
  ],
} as ComponentMeta<typeof ReviewPermissionsTable>;

const AclsReview: ComponentStory<typeof ReviewPermissionsTable> = ({
  acls: initialAcls,
  selectedAccountId,
}) => {
  const [acls, setAcls] = useState<AclBinding[]>(initialAcls);

  const onRemoveAcl = (index: number) => {
    const newAcls = acls.filter((_, i) => i !== index);
    setAcls(newAcls);
  };

  return (
    <ReviewPermissionsTable
      acls={acls}
      selectedAccountId={selectedAccountId}
      onRemoveAcl={onRemoveAcl}
    />
  );
};

export const Example = AclsReview.bind({});
Example.args = {
  acls: PermissionsForAllAccounts,
  selectedAccountId: "*",
};

export const AllAccountsCanDeleteAllAccounts = AclsReview.bind({});
AllAccountsCanDeleteAllAccounts.args = {
  acls: PermissionsForAllAccounts,
  selectedAccountId: "*",
};
AllAccountsCanDeleteAllAccounts.parameters = {
  docs: {
    description: {
      story:
        'If you select all accounts, you see all ACLs assigned to "All accounts" and can remove any of those ACLs.',
    },
  },
};

export const IndividualAccountCanDeleteOnlyOwnRules = AclsReview.bind({});
IndividualAccountCanDeleteOnlyOwnRules.args = {
  acls: PermissionsForSelectedAccount,
  selectedAccountId: "test_kafka_devexp",
};
IndividualAccountCanDeleteOnlyOwnRules.parameters = {
  docs: {
    description: {
      story:
        'If you select an individual account, you still see all ACLs assigned to "All accounts" because they affect the selected account, but you cannot remove them because they are not explicitly assigned to the selected account.',
    },
  },
};
