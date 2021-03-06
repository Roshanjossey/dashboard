import { HANDLE_NEW_LOG, SHOW_LOG_INDEX } from "./logStream.constants";

const levels = [
  "INFO",
  "SUCCESS",
  "WARNING",
  "ERROR",
  "CRITICAL",
  "DEBUG",
] as const;
export type Level = typeof levels[number];

export type RawLogLevel = {
  lastLog: number;
  levels: {
    [level in Level]: number;
  };
};
export type RawLog = {
  created: number;
  filename: string;
  funcName: string;
  levelname: Level;
  lineno: number;
  module: string;
  msg: string;
  name: string;
  pathname: string;
  process: number;
  processName: string;
  thread: number;
  threadName: string;
};

export type ProcessedLog = RawLog & {
  createdDate: Date;
  id: string;
  idx: number;
  unixTime: number;
  timestamp: Date;
  formattedTimestamp: string;
};

export type LogLevels = {
  [logLevel in Level]: number;
};

export type LogLevelOccurrences = {
  [timeStamp: number]: RawLogLevel;
};

export type LogStreamState = {
  logIndex: number;
  logLevelOccurrences: LogLevelOccurrences;
  logs: ProcessedLog[];
  logLevels: LogLevels;
  logSources: {
    [pea: string]: number;
  };
};

export type Message = {
  data: RawLog;
};

type PodPropertyType = "str" | "int" | "bool" | "SocketType" | "ReplicaType";
export type PodProperty = {
  name: string;
  type: PodPropertyType;
};

export type showLogAtIndexAction = {
  type: typeof SHOW_LOG_INDEX;
  payload: number;
};

export type handleNewLogAction = {
  type: typeof HANDLE_NEW_LOG;
  payload: Message;
};

export type LogStreamActionTypes = showLogAtIndexAction | handleNewLogAction;
