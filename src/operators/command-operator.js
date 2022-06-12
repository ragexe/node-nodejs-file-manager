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
import { handleUp } from "../command/navigation/handle-up.js";
import { handleOsArchitecture } from "../command/os/handle-os-architecture.js";
import { handleOsCpus } from "../command/os/handle-os-cpus.js";
import { handleOsEol } from "../command/os/handle-os-eol.js";
import { handleOsHomedir } from "../command/os/handle-os-homedir.js";
import { handleOsUsername } from "../command/os/handle-os-username.js";
import { handleCompress } from "../command/zip/handle-compress.js";
import { handleDecompress } from "../command/zip/handle-decompress.js";

export const getCommandOperator = (store) =>
  new Transform({
    transform: (chunk, _, callback) => {
      const input = chunk.toString().trim().toLowerCase();

      try {
        switch (true) {
          case input === ".exit":
            handleExit(store);
            return;

          case input === "up":
            handleUp(store);
            break;
          case input.startsWith("cd"):
            handleCd(store);
            break;
          case input === "ls":
            handleLs(store);
            break;

          case input.startsWith("cat"):
            handleCat(store);
            break;
          case input.startsWith("add"):
            handleAdd(store);
            break;
          case input.startsWith("rn"):
            handleRn(store);
            break;
          case input.startsWith("cp"):
            handleCp(store);
            break;
          case input.startsWith("mv"):
            handleMv(store);
            break;
          case input.startsWith("rm"):
            handleRm(store);
            break;

          case input === "os --eol":
            handleOsEol(store);
            break;
          case input === "os --cpus":
            handleOsCpus(store);
            break;
          case input === "os --homedir":
            handleOsHomedir(store);
            break;
          case input === "os --username":
            handleOsUsername(store);
            break;
          case input === "os --architecture":
            handleOsArchitecture(store);
            break;

          case input.startsWith("hash"):
            handleHash(store);
            break;

          case input.startsWith("compress"):
            handleCompress(store);
            break;
          case input.startsWith("decompress"):
            handleDecompress(store);
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
