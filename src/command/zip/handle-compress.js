import { createReadStream, createWriteStream } from 'fs';
import * as nodePath from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createBrotliCompress } from 'zlib';

import { checkPathExists } from '../../utils/check-path-exists.js';
import { validatePath } from '../../utils/validate-path.js';

export const compress = async (sourceFilePath, targetFilePath) => {
  return new Promise((resolve, reject) => {
    const readableStream = createReadStream(sourceFilePath);
    const writableStream = createWriteStream(targetFilePath);

    return pipeline(readableStream, createBrotliCompress(), writableStream)
      .then(() => {
        resolve(void 0);
      })
      .catch((error) => reject(error));
  });
};

export const handleCompress = async ({ path }, input) => {
  const [_, names] = input.split("compress ");

  if (!names) throw new Error("No provided arguments for compress");

  const argNames = names
    .replaceAll("'", '"')
    .match(/(?:[^\s"]+|"[^"]*")+/g)
    .map((arg) => arg.replaceAll('"', "").trim());

  const [sourcePath, targetFolderPath = "."] = argNames;
  if (!sourcePath || !targetFolderPath)
    throw new Error("No provided source for compress");

  const validatedSourcePath = validatePath(sourcePath, { path });
  const targetFileName = `${nodePath.basename(validatedSourcePath)}.gz`;
  const validatedTargetPath = validatePath(
    nodePath.join(targetFolderPath, targetFileName),
    { path }
  );

  const sourcePathExists = await checkPathExists(validatedSourcePath);
  const targetPathExists = await checkPathExists(validatedTargetPath);

  if (!sourcePathExists) throw new Error("Source doesn't exist");
  if (targetPathExists) throw new Error("Compressed file does exist");

  return compress(validatedSourcePath, validatedTargetPath);
};
