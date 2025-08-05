
import updateCompanyCache from "./downloadCompanyBDD.js"


const TWO_DAYS = 2 * 24 * 60 * 60 * 1000;
const UPDATE_INTERVAL = 2 * 60 * 1000;

export function startCompanyCacheScheduler() {
  updateCompanyCache();
  setInterval(updateCompanyCache, TWO_DAYS);
}