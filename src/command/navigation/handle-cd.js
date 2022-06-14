import { checkPathExists } from "../../utils/check-path-exists.js";
import { validatePath } from "../../utils/validate-path.js";

export const handleCd = async ({ path }, input) => {
  const [_, targetPath] = input.split("cd ");
  const validatedTargetPath = validatePath(targetPath, { path });

  const isExisting = await checkPathExists(validatedTargetPath);
  if (!isExisting) throw new Error("Doesn't exist");

  path.current = validatedTargetPath;
};
