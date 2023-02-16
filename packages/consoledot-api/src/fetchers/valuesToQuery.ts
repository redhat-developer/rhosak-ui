export function valuesToQuery(
  field: string,
  values: string[],
  comparison: "%" | "=" | "<>",
  join: "and" | "or"
): string | undefined {
  return values
    .map((v) =>
      comparison === "%"
        ? `${field} like %${v.trim()}%`
        : `${field} ${comparison} ${v.trim()}`
    )
    .join(` ${join} `);
}
