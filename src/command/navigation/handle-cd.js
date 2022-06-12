import { homedir } from 'node:os';
import * as nodePath from 'node:path';

import { checkPathExists } from '../../utils/check-path-exists.js';

export const handleCd = async ({ path }, input) => {
  const [_, targetPath] = input.split("cd ");

  if (!targetPath) throw new Error("Invalid target path");

  const validatedTargetPath = nodePath.resolve(
    `${path.current}${nodePath.sep}${targetPath}`
  );

  const isExisting = await checkPathExists(validatedTargetPath);
  if (!isExisting) throw new Error("Doesn't exist");

  if (!validatedTargetPath.startsWith(homedir()))
    throw new Error("Don't leave your home");

  path.current = validatedTargetPath;
};
