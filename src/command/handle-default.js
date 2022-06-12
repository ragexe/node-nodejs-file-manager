export const handleDefault = () => {
  console.log("\x1b[33m%s\x1b[0m", "Invalid input");
};

export const handleError = (error) => {
  console.log("\x1b[31m%s\x1b[0m", "Operation failed", error && error.message);
};
