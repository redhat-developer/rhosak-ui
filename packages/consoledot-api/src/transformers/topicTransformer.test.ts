import type { CustomSelect, CustomRetentionSizeSelect } from "ui";
import {
  retentionTimeTransformer,
  retentionSizeTransformer,
} from "./topicTransformer";

describe("retentionTimeTransformer", () => {
  it("converts retention time unit in days to bytes correctly", () => {
    const value: CustomSelect = { unit: "days", value: 7 };
    const result = retentionTimeTransformer(value);
    expect(result).toBe(BigInt(604800000));
  });

  it("converts retention time unit in unlimited to bytes correctly", () => {
    const value: CustomSelect = { unit: "unlimited", value: -1 };
    const result = retentionTimeTransformer(value);
    expect(result).toBe(BigInt(-1));
  });

  it("converts retention time unit in minutes to bytes correctly", () => {
    const value: CustomSelect = { unit: "minutes", value: 10 };
    const result = retentionTimeTransformer(value);
    expect(result).toBe(BigInt(600000));
  });

  it("converts retention time unit in weeks to bytes correctly", () => {
    const value: CustomSelect = { unit: "weeks", value: 1 };
    const result = retentionTimeTransformer(value);
    expect(result).toBe(BigInt(604800000));
  });

  it("converts retention time unit in hours to bytes correctly", () => {
    const value: CustomSelect = { unit: "hours", value: 9 };
    const result = retentionTimeTransformer(value);
    expect(result).toBe(BigInt(32400000));
  });

  it("converts retention time unit in seconds to bytes correctly", () => {
    const value: CustomSelect = { unit: "seconds", value: 20 };
    const result = retentionTimeTransformer(value);
    expect(result).toBe(BigInt(20000));
  });

  it("returns the same value for units in milliseconds", () => {
    const value: CustomSelect = { unit: "milliseconds", value: 20 };
    const result = retentionTimeTransformer(value);
    expect(result).toBe(BigInt(20));
  });
});

describe("retentionSizeTransformer", () => {
  test("converts kibibytes size unit to bytes correctly", () => {
    const input: CustomRetentionSizeSelect = { unit: "kibibytes", value: 10 };
    const output = BigInt(10240);
    expect(retentionSizeTransformer(input)).toEqual(output);
  });

  test("converts gibibytes size unit to bytes correctly", () => {
    const input: CustomRetentionSizeSelect = { unit: "gibibytes", value: 10 };
    const output = BigInt(10737418240);
    expect(retentionSizeTransformer(input)).toEqual(output);
  });

  test("converts mebibytes size unit to bytes correctly", () => {
    const input: CustomRetentionSizeSelect = { unit: "mebibytes", value: 10 };
    const output = BigInt(10485760);
    expect(retentionSizeTransformer(input)).toEqual(output);
  });

  test("converts tebibytes size unit to bytes correctly", () => {
    const input: CustomRetentionSizeSelect = { unit: "tebibytes", value: 10 };
    const output = BigInt(10995116277760);
    expect(retentionSizeTransformer(input)).toEqual(output);
  });

  test("converts unlimited size unit to bytes correctly", () => {
    const input: CustomRetentionSizeSelect = { unit: "unlimited", value: -1 };
    const output = BigInt(-1);
    expect(retentionSizeTransformer(input)).toEqual(output);
  });

  test("returns the same value for bytes size", () => {
    const input: CustomRetentionSizeSelect = { unit: "bytes", value: 10 };
    const output = BigInt(10);
    expect(retentionSizeTransformer(input)).toEqual(output);
  });
});
