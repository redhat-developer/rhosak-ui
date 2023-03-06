import { convert } from "convert";
import type { CustomSelect } from "./types";

export const retentionTimeTransformer = (value: CustomSelect) => {
  if (value.value != null)
    switch (value.unit) {
      case "days": {
        const convertedValue = convert(BigInt(value.value), "days").to("ms");
        return convertedValue;
      }
      case "weeks": {
        const convertedValue = convert(BigInt(value.value), "weeks").to("ms");
        return convertedValue;
      }
      case "seconds": {
        const convertedValue = convert(BigInt(value.value), "seconds").to("ms");
        return convertedValue;
      }
      case "hours": {
        const convertedValue = convert(BigInt(value.value), "hours").to("ms");
        return convertedValue;
      }
      case "minutes": {
        const convertedValue = convert(BigInt(value.value), "minutes").to("ms");
        return convertedValue;
      }
      case "unlimited": {
        return BigInt(value.value);
      }
      case "milliseconds": {
        return BigInt(value.value);
      }
    }
};
