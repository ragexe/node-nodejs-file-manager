import { rename as _rename } from "node:fs/promises";

import { validatePath } from "../../utils/validate-path.js";

const rename = async (sourceFilePath, targetFilePath) => {
  try {
    await _rename(sourceFilePath, targetFilePath);

    return Promise.resolve(void 0);
  } catch (error) {
    if (error) {
      throw new Error("FS operation failed");
    }
  }
};

export const handleRn = async ({ path }, input) => {
  const [_, names] = input.split("rn ");
  if (!names) throw new Error("No provided arguments for rename");

  const argNames = names
    .replaceAll("'", '"')
    .match(/(?:[^\s"]+|"[^"]*")+/g)
    .map((arg) => arg.replaceAll('"', ""));

  const [previousName, nextName] = argNames;
  if (!previousName || !nextName)
    throw new Error("No provided previousName and nextName for rename");

  const [validatedPreviousName, validatedNextName] = [
    previousName,
    nextName,
  ].map((filePath) => validatePath(filePath, { path }));

  return rename(validatedPreviousName, validatedNextName);
};
