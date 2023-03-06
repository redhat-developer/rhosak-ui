export type SelectOptions = {
  key: string;
  value: string;
  isPlaceholder?: boolean;
  isDisabled?: boolean;
};

export const retentionTimeSelectOptions: SelectOptions[] = [
  { key: "days", value: "days", isPlaceholder: true },
  { key: "hours", value: "hours" },
  { key: "minutes", value: "minutes" },
  { key: "seconds", value: "seconds" },
  { key: "milliseconds", value: "milliseconds" },
];

export const retentionSizeSelectOptions: SelectOptions[] = [
  { key: "bytes", value: "bytes", isPlaceholder: true },
  { key: "kibibytes", value: "kibibytes" },
  { key: "mebibytes", value: "mebibytes" },
  { key: "gibibytes", value: "gibibytes" },
  { key: "tebibytes", value: "tebibytes" },
];

export type IDropdownOption = {
  value?: string;
  label?: string;
  key?: string;
  isDisabled?: boolean;
};

export type TimeUnit =
  | "days"
  | "hours"
  | "minutes"
  | "seconds"
  | "milliseconds"
  | "weeks"
  | "unlimited";

export type CustomSelect = {
  unit: TimeUnit;
  value: number;
};

export type CustomRetentionSizeSelect = {
  unit: CustomRetentionUnit;
  value: number;
};

export type CustomRetentionUnit =
  | "bytes"
  | "kibibytes"
  | "mebibytes"
  | "gibibytes"
  | "tebibytes"
  | "unlimited";

export type RadioSelectType = "day" | "week" | "custom" | "unlimited";

export type RetentionSizeRadioSelect = "unlimited" | "custom";
