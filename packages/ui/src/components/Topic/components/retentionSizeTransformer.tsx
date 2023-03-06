import { convert } from "convert";
import type { CustomRetentionSizeSelect } from "./types";

export const retentionSizeTransformer = (size: CustomRetentionSizeSelect) => {
  switch (size.unit) {
    case "bytes":
      return BigInt(size.value);
    case "kibibytes":
      return convert(BigInt(size.value), "kibibytes").to("bytes");
    case "mebibytes":
      return convert(BigInt(size.value), "mebibytes").to("bytes");
    case "gibibytes":
      return convert(BigInt(size.value), "gibibytes").to("bytes");
    case "tebibytes":
      return convert(BigInt(size.value), "tebibytes").to("bytes");
    case "unlimited":
      return BigInt(size.value);
  }
};
