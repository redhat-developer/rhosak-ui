import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { TermsAndConditionsDialog as TermsAndConditionsDialogComponent } from "./TermsAndConditionsDialog";

export default {
  component: TermsAndConditionsDialogComponent,
  args: {
    isOpen: true,
    disableFocusTrap: true,
  },
} as ComponentMeta<typeof TermsAndConditionsDialogComponent>;

const Template: ComponentStory<typeof TermsAndConditionsDialogComponent> = (
  args
) => <TermsAndConditionsDialogComponent {...args} />;

export const TermsAndConditionsDialog = Template.bind({});
TermsAndConditionsDialog.args = {};
