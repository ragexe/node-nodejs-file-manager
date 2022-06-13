import { cp } from "node:fs/promises";
import * as nodePath from "node:path";

import { validatePath } from "../../utils/validate-path.js";
import { remove } from "./handle-rm.js";

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

export const handleMv = async ({ path }, input) => {
  const [_, names] = input.split("mv ");

  if (!names) throw new Error("No provided arguments for move");

  const argNames = names
    .replaceAll("'", '"')
    .match(/(?:[^\s"]+|"[^"]*")+/g)
    .map((arg) => arg.replaceAll('"', "").trim());

  const [sourcePath, targetFolderPath] = argNames;
  if (!sourcePath || !targetFolderPath)
    throw new Error("No provided previousName for rename");

  const targetFileName = nodePath.basename(sourcePath);

  const validatedSourcePath = validatePath(sourcePath, { path });
  const validatedTargetPath = validatePath(
    nodePath.join(targetFolderPath, targetFileName),
    { path }
  );

  return copy(validatedSourcePath, validatedTargetPath).then(() =>
    remove(validatedSourcePath)
  );
};
