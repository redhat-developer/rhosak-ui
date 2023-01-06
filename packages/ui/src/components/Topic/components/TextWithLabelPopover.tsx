import { FormGroup, Popover, TextInput } from "@patternfly/react-core";
import { HelpIcon } from "@patternfly/react-icons";
import type { FunctionComponent } from "react";

export interface TextWithLabelPopoverProps {
  fieldId: string;
  fieldLabel: string;
  fieldValue?: string;
  popoverHeader: string;
  popoverBody: string;
  btnAriaLabel: string;
  showUnlimited?: boolean;
}

export const TextWithLabelPopover: FunctionComponent<
  TextWithLabelPopoverProps
> = ({
  fieldId,
  fieldLabel,
  btnAriaLabel,
  fieldValue,
  popoverBody,
  popoverHeader,
  showUnlimited,
}) => {
  let displayText = "-";

  if (
    showUnlimited === true &&
    fieldValue !== undefined &&
    parseInt(fieldValue) < 0
  ) {
    displayText = "Unlimited"; // TODO i18n
  } else if (fieldValue) {
    displayText = fieldValue;
  }

  return (
    <FormGroup
      fieldId={fieldId}
      label={fieldLabel}
      className="kafka-ui-form-group--readonly"
      labelIcon={
        <Popover
          headerContent={<div>{popoverHeader}</div>}
          bodyContent={<div>{popoverBody}</div>}
        >
          <button
            aria-label={btnAriaLabel}
            onClick={(event) => event.preventDefault()}
            className="pf-c-form__group-label-help"
          >
            <HelpIcon noVerticalAlign />
          </button>
        </Popover>
      }
    >
      <TextInput
        readOnlyVariant={"plain"}
        type="text"
        id={fieldId}
        name={fieldId}
        value={displayText}
      />
    </FormGroup>
  );
};
