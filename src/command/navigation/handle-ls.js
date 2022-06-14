import { readdir } from "node:fs/promises";

const list = async (sourceFolderPath) => {
  try {
    const files = await readdir(sourceFolderPath, { withFileTypes: true });

    files.forEach(({ name: fileName }) => {
      console.log("\x1b[36m%s\x1b[0m", fileName);
    });

    return Promise.resolve(void 0);
  } catch (error) {
    if (error && error.code === "ENOENT") {
      throw new Error("FS operation failed");
    }

    throw error;
  }
};

export const handleLs = async ({ path }) => {
  await list(path.current);
};
