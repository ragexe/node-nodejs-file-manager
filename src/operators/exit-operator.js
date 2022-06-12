import { Transform } from "stream";

import { handleExit } from "../command/handle-exit.js";

export const getCommandOperator = (store) =>
  new Transform({
    transform: (chunk, _, callback) => {
      const input = chunk.toString().trim().toLowerCase();

      switch (input) {
        case ".exit":
          handleExit({ username });
          return;
        case "up":
          handleUp({ path });
        default:
          callback(null, chunk);
      }
    },
  });
