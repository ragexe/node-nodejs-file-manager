import * as nodePath from "node:path";

export const validatePath = (pathToValidate, { path }) => {
  if (!pathToValidate) throw new Error("Invalid source path");

  const validatedPath = nodePath.isAbsolute(pathToValidate)
    ? nodePath.resolve(pathToValidate)
    : nodePath.resolve(`${path.current}${nodePath.sep}${pathToValidate}`);

  if (!validatedPath.startsWith(path.root)) throw new Error("Forbidden");

  return validatedPath;
};
