export enum RetentionTimeUnits {
  MILLISECOND = "milliseconds",
  SECOND = "seconds",
  MINUTE = "minutes",
  HOUR = "hours",
  DAY = "days",
  WEEK = "weeks",
  CUSTOM = "custom",
  UNLIMITED = "unlimited",
}

export enum RetentionSizeUnits {
  BYTE = "bytes",
  KIBIBYTE = "kibibytes",
  MEBIBYTE = "mebibytes",
  GIBIBYTE = "gibibytes",
  TEBIBYTE = "tebibytes",
  CUSTOM = "custom",
  UNLIMITED = "unlimited",
}

export const unitsToBytes = {
  [RetentionSizeUnits.BYTE]: BigInt("1"),
  [RetentionSizeUnits.KIBIBYTE]: BigInt("1024"),
  [RetentionSizeUnits.MEBIBYTE]: BigInt("1048576"),
  [RetentionSizeUnits.GIBIBYTE]: BigInt("1073741824"),
  [RetentionSizeUnits.TEBIBYTE]: BigInt("1099511627776"),
};

export const unitsToMilliSecond = {
  [RetentionTimeUnits.MILLISECOND]: BigInt("1"),
  [RetentionTimeUnits.SECOND]: BigInt("1000"),
  [RetentionTimeUnits.MINUTE]: BigInt("60000"),
  [RetentionTimeUnits.HOUR]: BigInt("3600000"),
  [RetentionTimeUnits.DAY]: BigInt("86400000"),
};

type ConversionUnit = {
  value: bigint;
  unit: string;
};

export const millisecondsToTime = (value: bigint): ConversionUnit => {
  if (value) {
    if (value % unitsToMilliSecond.days == BigInt(0))
      return { value: value / unitsToMilliSecond.days, unit: "days" };
    if (value % unitsToMilliSecond.hours == BigInt(0))
      return { value: value / unitsToMilliSecond.hours, unit: "hours" };
    if (value % unitsToMilliSecond.minutes == BigInt(0))
      return { value: value / unitsToMilliSecond.minutes, unit: "minutes" };
    if (value % unitsToMilliSecond.seconds == BigInt(0))
      return { value: value / unitsToMilliSecond.seconds, unit: "seconds" };
  }

  return { value, unit: "milliseconds" };
};

export const formattedRetentionTime = (time: bigint): string => {
  const { unit, value } = millisecondsToTime(time);
  return Number(value) === -1 ? "Unlimited" : `${time} ms (${value} ${unit})`;
};

export const formattedRetentionSize = (size: bigint): string => {
  const { unit, value } = bytesToMemorySize(size);
  return Number(value) === -1
    ? "Unlimited"
    : `${size} bytes (${value} ${unit})`;
};

export const bytesToMemorySize = (value: bigint): ConversionUnit => {
  if (value) {
    if (value % unitsToBytes.tebibytes == BigInt(0))
      return { value: value / unitsToBytes.tebibytes, unit: "tebibytes" };
    if (value % unitsToBytes.gibibytes == BigInt(0))
      return { value: value / unitsToBytes.gibibytes, unit: "gibibytes" };
    if (value % unitsToBytes.mebibytes == BigInt(0))
      return { value: value / unitsToBytes.mebibytes, unit: "mebibytes" };
    if (value % unitsToBytes.kibibytes == BigInt(0))
      return { value: value / unitsToBytes.kibibytes, unit: "kibibytes" };
  }

  return { value, unit: "bytes" };
};
