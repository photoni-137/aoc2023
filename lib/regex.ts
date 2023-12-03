export const regexUnion = (...patterns: string[]) =>
  new RegExp(`\(${patterns.join("|")}\)`, "g");
