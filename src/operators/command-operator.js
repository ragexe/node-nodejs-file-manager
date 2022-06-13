import { Transform } from "stream";

import { handleAdd } from "../command/file-ops/handle-add.js";
import { handleCat } from "../command/file-ops/handle-cat.js";
import { handleCp } from "../command/file-ops/handle-cp.js";
import { handleMv } from "../command/file-ops/handle-mv.js";
import { handleRm } from "../command/file-ops/handle-rm.js";
import { handleRn } from "../command/file-ops/handle-rn.js";
import { handleDefault, handleError } from "../command/handle-default.js";
import { handleExit } from "../command/handle-exit.js";
import { handleHash } from "../command/handle-hash.js";
import { handleCd } from "../command/navigation/handle-cd.js";
import { handleLs } from "../command/navigation/handle-ls.js";
import { handleOsArchitecture } from "../command/os/handle-os-architecture.js";
import { handleOsCpus } from "../command/os/handle-os-cpus.js";
import { handleOsEol } from "../command/os/handle-os-eol.js";
import { handleOsHomedir } from "../command/os/handle-os-homedir.js";
import { handleOsUsername } from "../command/os/handle-os-username.js";
import { handleCompress } from "../command/zip/handle-compress.js";
import { handleDecompress } from "../command/zip/handle-decompress.js";

export const getCommandOperator = (store) =>
  new Transform({
    transform: async (chunk, _, callback) => {
      const input = chunk.toString().trim();
      const [inputCommand] = input.toLowerCase().split(" ");

      try {
        switch (true) {
          case inputCommand === ".exit":
            handleExit(store);
            return;

          case inputCommand === "up":
            await handleCd(store, "cd ./..");
            break;
          case inputCommand === "cd":
            await handleCd(store, input);
            break;
          case inputCommand === "ls":
            await handleLs(store);
            break;

          case inputCommand === "cat":
            await handleCat(store, input);
            break;
          case inputCommand === "add":
            await handleAdd(store, input);
            break;
          case inputCommand === "rn":
            await handleRn(store, input);
            break;
          case inputCommand === "cp":
            await handleCp(store, input);
            break;
          case inputCommand === "mv":
            await handleMv(store, input);
            break;
          case inputCommand === "rm":
            await handleRm(store, input);
            break;

          case inputCommand === "os --eol":
            handleOsEol(store);
            break;
          case inputCommand === "os --cpus":
            handleOsCpus(store);
            break;
          case inputCommand === "os --homedir":
            handleOsHomedir(store);
            break;
          case inputCommand === "os --username":
            handleOsUsername(store);
            break;
          case inputCommand === "os --architecture":
            handleOsArchitecture(store);
            break;

          case inputCommand === "hash":
            await handleHash(store, input);
            break;

          case inputCommand === "compress":
            await handleCompress(store, input);
            break;
          case inputCommand === "decompress":
            await handleDecompress(store, input);
            break;

          default:
            handleDefault();
            break;
        }
      } catch (error) {
        handleError(error);
      } finally {
        callback(null, chunk);
      }
    },
  });
