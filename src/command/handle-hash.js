import { createHash } from "crypto";
import { readFile } from "node:fs/promises";

import { validatePath } from "./../utils/validate-path.js";

export const calculateHash = async (sourceFilePath) => {
  try {
    const dataBuffer = await readFile(sourceFilePath, { flag: "r" });
    const sha256Hash = createHash("sha256").update(dataBuffer);
    const hexString = sha256Hash.digest("hex");

    console.log("\x1b[36m%s\x1b[0m", hexString);
    return Promise.resolve(void 0);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const handleHash = ({ path }, input) => {
  const [_, sourcePath] = input.split("hash ");
  const validatedSourcePath = validatePath(sourcePath, { path });

  return calculateHash(validatedSourcePath);
};
