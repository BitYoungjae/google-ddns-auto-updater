export const HOST_NAME = process.env["HOST_NAME"];

export const USER_NAME = process.env["USER_NAME"];

export const PASSWORD = process.env["PASSWORD"];

export const INTERVAL = process.env["INTERVAL"]
  ? parseInt(process.env["INTERVAL"])
  : 30 * 60 * 1000;

export const MINIMUN_UPDATE_INTERVAL = process.env["MINIMUN_UPDATE_INTERVAL"]
  ? parseInt(process.env["MINIMUN_UPDATE_INTERVAL"])
  : 3 * 60 * 60 * 1000;
