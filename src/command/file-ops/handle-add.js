import { writeFile } from "node:fs/promises";

import { validatePath } from "../../utils/validate-path.js";

const create = async (filePath, fileContent = "") => {
  try {
    await writeFile(filePath, fileContent, { flag: "ax" });

    return Promise.resolve(void 0);
  } catch (error) {
    if (error && error.code === "EEXIST") {
      throw new Error("FS operation failed");
    }

    throw error;
  }
};

export const handleAdd = async ({ path }, input) => {
  const [_, targetPath] = input.split("add ");

  const validatedTargetPath = validatePath(targetPath, { path });

  return create(validatedTargetPath);
};
