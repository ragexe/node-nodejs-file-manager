import * as path from "path";
import { pipeline, Transform } from "stream";

export const getLoggerOperator = ({ path: { current: currentPath } }) =>
  new Transform({
    transform: (_, __, callback) => {
      console.log(`You are currently in ${currentPath}`);
      callback(null, _);
    },
  });

// const SOURCE_FILE_NAME = "fileToCompress.txt";
// const TARGET_FILE_NAME = "archive.gz";

// const [SOURCE_FILE_PATH, TARGET_FILE_PATH] = [
//   SOURCE_FILE_NAME,
//   TARGET_FILE_NAME,
// ].map((fileName) => path.join(path.resolve(), "src", "zip", "files", fileName));

// export const compress = async () => {
//   const readableStream = createReadStream(SOURCE_FILE_PATH);
//   const writableStream = createWriteStream(TARGET_FILE_PATH);

//   return pipeline(readableStream, createBrotliCompress(), writableStream);
// };
