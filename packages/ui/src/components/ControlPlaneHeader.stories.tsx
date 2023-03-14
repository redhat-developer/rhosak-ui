import { Page, PageSection, TextContent } from "@patternfly/react-core";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { ControlPlaneHeader } from "./ControlPlaneHeader";

export default {
  component: ControlPlaneHeader,
  args: {
    sectionsHref: {
      instances: "#/instances",
      clusters: "#/clusters",
    },
  },
} as ComponentMeta<typeof ControlPlaneHeader>;

const Template: ComponentStory<typeof ControlPlaneHeader> = (args) => (
  <Page>
    <ControlPlaneHeader {...args} />
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

export const Instances = Template.bind({});
Instances.args = {
  activeSection: "instances",
};

export const Clusters = Template.bind({});
Clusters.args = {
  activeSection: "clusters",
};
