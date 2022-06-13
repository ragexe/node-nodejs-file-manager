import { createReadStream } from "fs";

import { validatePath } from "../../utils/validate-path.js";

const read = async (sourceFilePath) => {
  const readStream = createReadStream(sourceFilePath, { flags: "r" });

  const promise = new Promise((resolve, reject) => {
    readStream
      .on("data", (chunk) => console.log("\x1b[40m%s\x1b[0m", chunk.toString()))
      .on("close", () => {
        resolve(void 0);
      })
      .on("error", (error) => {
        reject(error);
      });
  });

  return promise;
};

export const handleCat = ({ path }, input) => {
  const [_, sourcePath] = input.split("cat ");
  const validatedSourcePath = validatePath(sourcePath, { path });

  return read(validatedSourcePath);
};
