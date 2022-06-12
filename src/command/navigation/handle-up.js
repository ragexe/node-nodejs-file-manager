import * as path from "path";

export const handleUp = ({ path: { current, root } }) => {
  console.log(`handle up works`);
  if (current === root) return;
};
