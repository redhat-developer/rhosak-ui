import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { constantValues } from "../components/storiesHelpers";
import { TopicDetailView } from "./TopicDetailView";
import {
  RetentionSizeUnits,
  RetentionTimeUnits,
} from "@rhoas/app-services-ui-components";

export default {
  component: TopicDetailView,
  args: {
    topic: {
      name: "test-topic",
      numPartitions: 1,
      replicationFactor: 1,
      retentionTime: 1,
      retentionTimeUnit: RetentionTimeUnits.WEEK,
      retentionBytes: 1,
      retentionBytesUnit: RetentionSizeUnits.BYTE,
      cleanupPolicy: "delete",
      customRetentionTimeUnit: RetentionTimeUnits.DAY,
      customRetentionSizeUnit: RetentionSizeUnits.BYTE,
      minInSyncReplica: 1,
      isMultiAZ: false,
    },
    constantValues: constantValues,
  },
} as ComponentMeta<typeof TopicDetailView>;

const Template: ComponentStory<typeof TopicDetailView> = (args) => (
  <TopicDetailView {...args} />
);

export const Properties = Template.bind({});
Properties.args = {};
