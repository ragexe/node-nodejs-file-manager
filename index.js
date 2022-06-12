import { homedir } from "node:os";
import process from "node:process";
import { Readable, Transform } from "stream";

import { parseArgs } from "./src/cli/args.js";
import { handleExit } from "./src/command/handle-exit.js";
import { Store } from "./src/models/store.js";
import { getCommandOperator } from "./src/operators/command-operator.js";
import { getLoggerOperator } from "./src/operators/logger-operator.js";
import { capitalize } from "./src/text/capitalize.js";
import { concatStreams } from "./src/utils/concat-streams.js";

const store = new Store({
  username: capitalize(parseArgs().username || "anonymous"),
  path: {
    root: homedir(),
    current: homedir(),
  },
});

await (async () => {
  const { stdin } = process;
  const start$ = await concatStreams([
    Readable.from("_start")
      .pipe(
        new Transform({
          transform: (chunk, __, callback) => {
            console.log(`\nWelcome to the File Manager, ${store.username}!\n`);
            callback(null, chunk);
          },
        })
      )
      .pipe(getLoggerOperator(store))
      .pipe(
        new Transform({
          transform: (_, __, callback) => {
            callback(null, null);
          },
        })
      ),
    stdin,
  ]);

  Readable.from(start$)
    .pipe(getCommandOperator(store))
    .pipe(getLoggerOperator(store));

  process
    .on("SIGINT", () => handleExit(store))
    .on("SIGQUIT", () => handleExit(store));
})();
