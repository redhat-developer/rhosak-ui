export function valuesToQuery(
  field: string,
  values: string[],
  comparison: "%" | "="
): string | undefined {
  return values
    .map((v) =>
      comparison === "%"
        ? `${field} like %${v.trim()}%`
        : `${field} = ${v.trim()}`
    )
    .join(" or ");
}
