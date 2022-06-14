import { constants } from "node:fs";
import { access } from "node:fs/promises";

export const checkPathExists = (filePath) => {
  return access(filePath, constants.F_OK)
    .then(() => true)
    .catch(() => false);
};
