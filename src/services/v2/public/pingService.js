// ping service
export const ping = (log) => {
  const result = {
    version: "v2",
    time: new Date().toISOString(),
  };
  log(`Result: ${JSON.stringify(result)}`);
  return result;
};