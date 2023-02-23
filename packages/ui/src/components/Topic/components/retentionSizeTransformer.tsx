import byteSize from "byte-size";
import { CustomRetentionSizeSelect } from './types';

export const retentionSizeTransformer = (size: CustomRetentionSizeSelect) => {
  switch (size.unit) {
    case "bytes":
      return BigInt(size.value);
    case "kibibytes":
      return BigInt(byteSize(size.value, { units: "iec" }).value)
    case "mebibytes":
      return BigInt(byteSize(size.value, { units: "iec" }).value);
    case "gibibytes":
      return BigInt(byteSize(size.value, { units: "iec" }).value);
    case "tebibytes":
      return BigInt(byteSize(size.value, { units: "iec" }).value);
    case "unlimited":
      return BigInt(size.value);
  }
}
