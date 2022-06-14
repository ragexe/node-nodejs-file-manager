import { EOL } from "node:os";

export const handleOsEol = () => {
  console.log("\x1b[36m%s\x1b[0m", JSON.stringify(EOL));
};
