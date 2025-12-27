import fs from "fs";
import path from "path";

// getDate helper
const getDate = () => new Date().toISOString().split("T")[0];

// getTime helper
const getTime = () => {
  const d = new Date();
  let hours = d.getHours();
  const minutes = d.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;
  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");

  return `${hh}:${mm} ${ampm}`;
};

// get next log file number
const getNextLogNumber = (logDir, apiName) => {
  if (!fs.existsSync(logDir)) return 1;

  const files = fs.readdirSync(logDir).filter(f => f.startsWith(apiName) && f.endsWith(".log"));
  const numbers = files.map(f => {
    const match = f.match(/-(\d+)\.log$/);
    return match ? parseInt(match[1], 10) : 0;
  });

  return numbers.length ? Math.max(...numbers) + 1 : 1;
};

// create logger function
export const createLogger = (apiName, version = "v1") => {
  const date = getDate();
  const baseDir = path.resolve();

  // versioned log directory
  const logDir = path.join(baseDir, "logs", version, date, apiName);

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const fileNumber = getNextLogNumber(logDir, apiName);
  const logFile = path.join(logDir, `${apiName}-${fileNumber}.log`);

  return (message, type = "info") => {
    const time = getTime();

    try {
      if (type instanceof Error) {
        fs.appendFileSync(logFile, `[${time}] ERROR: ${message}\n`);
        fs.appendFileSync(logFile, `[${time}] ERROR: ${type.stack || type.message}\n`);
        return;
      }

      if (type === "warn") {
        fs.appendFileSync(logFile, `[${time}] WARN: ${message}\n`);
      } else if (type === "error") {
        fs.appendFileSync(logFile, `[${time}] ERROR: ${message}\n`);
      } else {
        fs.appendFileSync(logFile, `[${time}] INFO: ${message}\n`);
      }
    } catch (err) {
      console.error("LOGGER FAILED", err.message);
    }
  };
};

