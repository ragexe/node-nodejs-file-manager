import { readFile } from "node:fs/promises";
import * as nodePath from "node:path";

const read = async (sourceFilePath) => {
  try {
    const contentBuffer = await readFile(sourceFilePath, { flag: "r" });
    console.log("\x1b[40m%s\x1b[0m", contentBuffer.toString());

    return Promise.resolve(void 0);
  } catch (error) {
    if (error && error.code === "ENOENT") {
      throw new Error("FS operation failed");
    }

    throw error;
  }
};

export const handleCat = ({ path }, input) => {
  const [_, sourcePath] = input.split("cat ");

  if (!sourcePath) throw new Error("Invalid source path");

  const validatedSourcePath = nodePath.resolve(
    `${path.current}${nodePath.sep}${sourcePath}`
  );

  if (!validatedSourcePath.startsWith(path.root))
    throw new Error("Don't leave your home");

  return read(validatedSourcePath);
};
