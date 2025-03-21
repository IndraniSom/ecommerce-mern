import fs from "fs";
import path from "path";

const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFilePath = path.join(logDir, "server.log");

const formatMessage = (level, ...args) => {
  const timestamp = new Date().toISOString();
  const message = args
    .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg))
    .join(" ");
  return `[${timestamp}] [${level}] ${message}`;
};

const writeToFile = (message) => {
  fs.appendFile(logFilePath, message + "\n", (err) => {
    if (err) console.error("Failed to write to log file:", err);
  });
};

const logger = {
  log: (...args) => {
    const message = formatMessage("LOG", ...args);
    console.log(message);
    writeToFile(message);
  },
  info: (...args) => {
    const message = formatMessage("INFO", ...args);
    console.info(message);
    writeToFile(message);
  },
  warn: (...args) => {
    const message = formatMessage("WARN", ...args);
    console.warn(message);
    writeToFile(message);
  },
  error: (...args) => {
    const message = formatMessage("ERROR", ...args);
    console.error(message);
    writeToFile(message);
  },
};

export default logger;
