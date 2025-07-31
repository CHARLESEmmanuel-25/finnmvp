
import companyCache from "./cacheExpire.js"


const TWO_DAYS = 2 * 24 * 60 * 60 * 1000;

export function startCompanyCacheScheduler() {
  companyCache();
  setInterval(companyCache, TWO_DAYS);
}