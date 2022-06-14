import { Transform } from "stream";

export const getLoggerOperator = ({ path }) =>
  new Transform({
    transform: (_, __, callback) => {
      console.log(
        "\x1b[2m%s\x1b[34m%s\x1b[0m",
        `You are currently in ${path.current} `,
        path.current === path.root ? "(home)" : ""
      );

      callback(null, _);
    },
  });
