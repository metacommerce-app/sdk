import pino from "pino";

const logger = pino({
  level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : "info",
});

export { logger as default };
