import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { PermissionsTableV2 } from "./PermissionsTableV2";
import { PermissionsForSelectedAccount } from "./ReviewPermissionsTable.stories";
//This type will be used when working with the shared table component

/*const permissions: Permissions[] = [
  {account:'User:test_kafka_devexp',
   resource:{resourceName:'test',resourceType:'GROUP',patternType:'PREFIXED'},
   permission:{operation:'ALL',permission:'ALLOW'}

},
{account:'User:test_kafka_devexp',
   resource:{resourceName:'test',resourceType:'GROUP',patternType:'PREFIXED'},
   permission:{operation:'ALL',permission:'ALLOW'}

}
];*/

export default {
  component: PermissionsTableV2,
  args: {
    acls: PermissionsForSelectedAccount,
  },
} as ComponentMeta<typeof PermissionsTableV2>;

const Template: ComponentStory<typeof PermissionsTableV2> = (args) => (
  <PermissionsTableV2 {...args} />
);

export const PermissionsTable = Template.bind({});
PermissionsTable.args = {};
