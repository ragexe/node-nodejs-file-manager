import { Transform } from "stream";

export const getLoggerOperator = ({ path }) =>
  new Transform({
    transform: (_, __, callback) => {
      console.log(`You are currently in ${path.current}`);
      callback(null, _);
    },
  });
