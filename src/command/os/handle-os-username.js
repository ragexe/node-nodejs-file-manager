import { userInfo } from "node:os";

export const handleOsUsername = () => {
  const systemUsername = userInfo().username;

  console.log("\x1b[36m%s\x1b[0m", systemUsername);
};
