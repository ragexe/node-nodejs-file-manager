import { rm } from "node:fs/promises";

import { validatePath } from "../../utils/validate-path.js";

export const remove = async (path) => {
  try {
    await rm(path, { force: false });

    return Promise.resolve(void 0);
  } catch (error) {
    if (error && ["ENOENT", "ERR_FS_EISDIR"].includes(error.code)) {
      throw new Error("FS operation failed");
    }

    throw error;
  }
};

export const handleRm = ({ path }, input) => {
  const [_, targetPath] = input.split("rm ");
  const validatedTargetPath = validatePath(targetPath, { path });

  return remove(validatedTargetPath);
};
