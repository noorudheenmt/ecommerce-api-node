// ping service
export const ping = (log) => {
  const result = {
    version: "v1",
    time: new Date().toISOString(),
  };
  log(`Result: ${JSON.stringify(result)}`);
  return result;
};