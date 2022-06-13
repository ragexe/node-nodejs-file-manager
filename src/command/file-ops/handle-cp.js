import { cp } from "node:fs/promises";
import * as nodePath from "node:path";

import { checkPathExists } from "../../utils/check-path-exists.js";
import { validatePath } from "../../utils/validate-path.js";

export const copy = async (sourcePath, targetPath) => {
  try {
    await cp(sourcePath, targetPath, {
      errorOnExist: true,
      recursive: true,
      force: false,
    });

    return Promise.resolve(void 0);
  } catch (error) {
    if (error && ["ERR_FS_CP_EEXIST", "ENOENT"].includes(error.code)) {
      throw new Error("FS operation failed");
    }

    throw error;
  }
};

export const handleCp = async ({ path }, input) => {
  const [_, names] = input.split("cp ");

  if (!names) throw new Error("No provided arguments for rename");

  const argNames = names
    .replaceAll("'", '"')
    .match(/(?:[^\s"]+|"[^"]*")+/g)
    .map((arg) => arg.replaceAll('"', "").trim());

  const [sourcePath, targetFolderPath = "."] = argNames;
  if (!sourcePath || !targetFolderPath)
    throw new Error("No provided previousName for rename");

  const targetFileName = nodePath.basename(sourcePath);
  const validatedSourcePath = validatePath(sourcePath, { path });

  let validatedTargetPath = validatePath(
    nodePath.join(targetFolderPath, targetFileName),
    { path }
  );
  let isExisting = await checkPathExists(validatedTargetPath);
  let uniqueFileName = targetFileName;
  let counter = 0;

  while (isExisting) {
    if (counter > 42) throw new Error("Too deep to nest copy");

    uniqueFileName = `copy_${uniqueFileName}`;
    validatedTargetPath = validatePath(
      nodePath.join(targetFolderPath, uniqueFileName),
      { path }
    );

    isExisting = await checkPathExists(validatedTargetPath);
    counter++;
  }

  return copy(validatedSourcePath, validatedTargetPath);
};
