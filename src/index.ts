import { pino } from "pino";
import pretty from "pino-pretty";
import { getCurrentIP, getElapsedTime, updateDNS } from "./utils";
import {
  HOST_NAME,
  USER_NAME,
  PASSWORD,
  MINIMUN_UPDATE_INTERVAL,
  INTERVAL,
} from "./env";

const logger = pino(pretty({ sync: true }));

interface State {
  lastIP?: string;
  updatedAt: Date;
}

let state: State = { updatedAt: new Date() };

async function main() {
  if (!HOST_NAME || !USER_NAME || !PASSWORD) {
    logger.error(
      "Missing required environment variables(HOST_NAME, USER_NAME, PASSSWORD). Update stopped."
    );
    return;
  }

  try {
    const now = new Date();
    const currentIP = await getCurrentIP();
    const elapsed = getElapsedTime(state.updatedAt, now);

    if (state.lastIP === currentIP && elapsed < MINIMUN_UPDATE_INTERVAL) {
      logger.info("No IP change detected. Skipping DDNS update.");
      return;
    }

    const { code, arg } = await updateDNS(
      HOST_NAME,
      USER_NAME,
      PASSWORD,
      currentIP
    );

    switch (code) {
      case "good":
        logger.info(`DDNS update successful. New IP ${currentIP} registered.`);
        state = { lastIP: currentIP, updatedAt: now };
        break;
      case "nochg":
        logger.info(`The same IP is already registered with DDNS.`);
        state = { lastIP: currentIP, updatedAt: now };
        break;
      default:
        logger.warn(`[${code}/${arg}] caused the update to fail.`);
    }
  } catch (e: unknown) {
    logger.error(e);
  } finally {
    logger.info("Pausing, then trying again..");
    setTimeout(main, INTERVAL);
  }
}

main();
