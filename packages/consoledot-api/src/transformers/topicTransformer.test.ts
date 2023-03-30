import type { CustomSelect } from "ui";
import { retentionTimeTransformer } from "./topicTransformer";

describe("retentionTimeTransformer", () => {
  it("retention time values when unit is days", () => {
    const value: CustomSelect = { unit: "days", value: 7 };
    const result = retentionTimeTransformer(value);
    expect(result).toBe(BigInt(604800000));
  });

  it("retention time values when unit is unlimited", () => {
    const value: CustomSelect = { unit: "unlimited", value: 1 };
    const result = retentionTimeTransformer(value);
    expect(result).toBe(BigInt(-1));
  });
});
