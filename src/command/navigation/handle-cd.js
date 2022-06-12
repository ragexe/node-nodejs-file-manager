import { homedir } from "node:os";
import * as nodePath from "node:path";

export const handleCd = ({ path }, input) => {
  const [_, targetPath] = input.split("cd ");

  if (!targetPath) throw new Error("Invalid target path");

  const validatedTargetPath = nodePath.resolve(
    `${path.current}${nodePath.sep}${targetPath}`
  );

  if (!validatedTargetPath.startsWith(homedir()))
    throw new Error("Don't leave your home");

  path.current = validatedTargetPath;
};
