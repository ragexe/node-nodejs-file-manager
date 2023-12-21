import { homedir } from "node:os";

export const handleOsHomedir = () => {
  console.log("\x1b[36m%s\x1b[0m", homedir());
};
