import { cpus } from "node:os";

export const handleOsCpus = () => {
  const cpuList = cpus() || [];

  console.log("\x1b[36m%s\x1b[0m", JSON.stringify(cpuList, null, 2));
};
