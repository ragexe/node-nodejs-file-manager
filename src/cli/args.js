const PROP_PREFIX = "--";

export const parseArgs = () => {
  const myArgsMap = process.argv
    .slice(2)
    .reduce((reducedArgs, value, index, array) => {
      if (!value.startsWith(PROP_PREFIX)) return reducedArgs;

      const [varKey, varValue] = value.split("=");
      const prefixRemovedKey = varKey.substring(PROP_PREFIX.length);

      if (!prefixRemovedKey || !varValue) return reducedArgs;

      reducedArgs[prefixRemovedKey] = varValue;

      return reducedArgs;
    }, []);

  return myArgsMap;
};
