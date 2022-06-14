import { createWriteStream } from "fs";
import { pipeline } from "node:stream/promises";
import { Readable } from "stream";

import { validatePath } from "../../utils/validate-path.js";

export const write = async (targetFilePath, fileContent = "") => {
  return new Promise((resolve, reject) => {
    const readableStream = Readable.from(fileContent);
    const writableStream = createWriteStream(targetFilePath, { flags: "ax" });

    return pipeline(readableStream, writableStream)
      .then(() => {
        resolve(void 0);
      })
      .catch((error) => reject(error));
  });

  return promise;
};

export const handleAdd = async ({ path }, input) => {
  const [_, commandParams] = input.split("add ");

  if (!commandParams) throw new Error("No provided arguments for create file");

  const argNames = commandParams
    .replaceAll("'", '"')
    .match(/(?:[^\s"]+|"[^"]*")+/g)
    .map((arg) => arg.replaceAll('"', "").trim());

  const [targetPath, fileContent = ""] = argNames;

  const validatedTargetPath = validatePath(targetPath, { path });

  return write(validatedTargetPath, fileContent);
};
