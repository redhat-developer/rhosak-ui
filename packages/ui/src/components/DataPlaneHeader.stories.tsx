import { Page, PageSection, TextContent } from "@patternfly/react-core";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { DataPlaneHeader } from "./DataPlaneHeader";

export default {
  component: DataPlaneHeader,
  args: {
    instanceName: "Pepperoni pizza",
    instancesHref: "#/instances",
    sectionsHref: {
      consumer: "#/consumer",
      dashboard: "#/dashboard",
      permissions: "#/permissions",
      settings: "#/settings",
      topics: "#/topics",
    },
    canDelete: true,
    canChangeOwner: true,
    canOpenConnection: true,
  },
} as ComponentMeta<typeof DataPlaneHeader>;

const Template: ComponentStory<typeof DataPlaneHeader> = (args) => (
  <Page>
    <DataPlaneHeader {...args} />
    <PageSection>
      <TextContent>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          ducimus ea expedita necessitatibus qui similique, unde? Aperiam
          doloremque error, est fugit id nesciunt possimus quas quisquam rem
          suscipit ut voluptate.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          ducimus ea expedita necessitatibus qui similique, unde? Aperiam
          doloremque error, est fugit id nesciunt possimus quas quisquam rem
          suscipit ut voluptate.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          ducimus ea expedita necessitatibus qui similique, unde? Aperiam
          doloremque error, est fugit id nesciunt possimus quas quisquam rem
          suscipit ut voluptate.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          ducimus ea expedita necessitatibus qui similique, unde? Aperiam
          doloremque error, est fugit id nesciunt possimus quas quisquam rem
          suscipit ut voluptate.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          ducimus ea expedita necessitatibus qui similique, unde? Aperiam
          doloremque error, est fugit id nesciunt possimus quas quisquam rem
          suscipit ut voluptate.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          ducimus ea expedita necessitatibus qui similique, unde? Aperiam
          doloremque error, est fugit id nesciunt possimus quas quisquam rem
          suscipit ut voluptate.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          ducimus ea expedita necessitatibus qui similique, unde? Aperiam
          doloremque error, est fugit id nesciunt possimus quas quisquam rem
          suscipit ut voluptate.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          ducimus ea expedita necessitatibus qui similique, unde? Aperiam
          doloremque error, est fugit id nesciunt possimus quas quisquam rem
          suscipit ut voluptate.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          ducimus ea expedita necessitatibus qui similique, unde? Aperiam
          doloremque error, est fugit id nesciunt possimus quas quisquam rem
          suscipit ut voluptate.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          ducimus ea expedita necessitatibus qui similique, unde? Aperiam
          doloremque error, est fugit id nesciunt possimus quas quisquam rem
          suscipit ut voluptate.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          ducimus ea expedita necessitatibus qui similique, unde? Aperiam
          doloremque error, est fugit id nesciunt possimus quas quisquam rem
          suscipit ut voluptate.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          ducimus ea expedita necessitatibus qui similique, unde? Aperiam
          doloremque error, est fugit id nesciunt possimus quas quisquam rem
          suscipit ut voluptate.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          ducimus ea expedita necessitatibus qui similique, unde? Aperiam
          doloremque error, est fugit id nesciunt possimus quas quisquam rem
          suscipit ut voluptate.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          ducimus ea expedita necessitatibus qui similique, unde? Aperiam
          doloremque error, est fugit id nesciunt possimus quas quisquam rem
          suscipit ut voluptate.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          ducimus ea expedita necessitatibus qui similique, unde? Aperiam
          doloremque error, est fugit id nesciunt possimus quas quisquam rem
          suscipit ut voluptate.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          ducimus ea expedita necessitatibus qui similique, unde? Aperiam
          doloremque error, est fugit id nesciunt possimus quas quisquam rem
          suscipit ut voluptate.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          ducimus ea expedita necessitatibus qui similique, unde? Aperiam
          doloremque error, est fugit id nesciunt possimus quas quisquam rem
          suscipit ut voluptate.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          ducimus ea expedita necessitatibus qui similique, unde? Aperiam
          doloremque error, est fugit id nesciunt possimus quas quisquam rem
          suscipit ut voluptate.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          ducimus ea expedita necessitatibus qui similique, unde? Aperiam
          doloremque error, est fugit id nesciunt possimus quas quisquam rem
          suscipit ut voluptate.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          ducimus ea expedita necessitatibus qui similique, unde? Aperiam
          doloremque error, est fugit id nesciunt possimus quas quisquam rem
          suscipit ut voluptate.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          ducimus ea expedita necessitatibus qui similique, unde? Aperiam
          doloremque error, est fugit id nesciunt possimus quas quisquam rem
          suscipit ut voluptate.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus
          ducimus ea expedita necessitatibus qui similique, unde? Aperiam
          doloremque error, est fugit id nesciunt possimus quas quisquam rem
          suscipit ut voluptate.
        </p>
      </TextContent>
    </PageSection>
  </Page>
);

export const Dashboard = Template.bind({});
Dashboard.args = {
  activeSection: "dashboard",
};

export const Topics = Template.bind({});
Topics.args = {
  activeSection: "topics",
};

export const Consumer = Template.bind({});
Consumer.args = {
  activeSection: "consumer",
};
export const Permissions = Template.bind({});
Permissions.args = {
  activeSection: "permissions",
};

export const Settings = Template.bind({});
Settings.args = {
  activeSection: "settings",
};

export const DisabledActions = Template.bind({});
DisabledActions.args = {
  activeSection: "dashboard",
  canDelete: false,
  canChangeOwner: false,
  canOpenConnection: false,
};
