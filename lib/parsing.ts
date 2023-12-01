export const parseFile = async (filename: string) =>
  Deno.readTextFile(filename);

export const getNonEmptyLines = async (filename: string) => {
  const content = await parseFile(filename);
  const lines = content.split("\n");
  return lines.filter((line) => line.length > 0);
};
