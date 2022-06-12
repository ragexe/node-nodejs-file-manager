import { homedir } from "node:os";
import process from "node:process";
import { Readable, Transform } from "stream";

import { parseArgs } from "./src/cli/args.js";
import { handleExit } from "./src/command/handle-exit.js";
import { getCommandOperator } from "./src/operators/exit-operator.js";
import { getLoggerOperator } from "./src/operators/logger-operator.js";
import { capitalize } from "./src/text/capitalize.js";
import { concatStreams } from "./src/utils/concat-streams.js";

const store = {
  username: capitalize(parseArgs().username || "anonymous"),
  path: {
    root: homedir(),
    current: homedir(),
  },
};

await (async () => {
  const { stdout, stdin } = process;
  const merged = await concatStreams([
    Readable.from("").pipe(
      new Transform({
        transform: (_, __, callback) => {
          console.log(`\nWelcome to the File Manager, ${store.username}!\n`);
          callback(null, _);
        },
      })
    ),
    stdin,
  ]);

  Readable.from(merged)
    .pipe(getLoggerOperator(store))
    .pipe(getCommandOperator(store));

  process
    .on("SIGINT", () => handleExit(store))
    .on("SIGQUIT", () => handleExit(store));
})();
