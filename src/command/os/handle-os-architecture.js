import { arch } from "node:os";

export const handleOsArchitecture = () => {
  console.log("\x1b[36m%s\x1b[0m", arch());
};
