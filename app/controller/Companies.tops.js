// controllers/companiesCaps.controller.js
import getCategorizedCompanies from "../../utils/functions/updateCache.js";

let cachedTopCaps = [];
let cachedSmallCaps = [];
let cachedTopMovers = [];
let lastUpdated = null;

async function updateCache() {
  const { topCaps, smallCaps, topMovers, updatedAt } = await getCategorizedCompanies();
  cachedTopCaps = topCaps;
  cachedSmallCaps = smallCaps;
  cachedTopMovers = topMovers;
  lastUpdated = updatedAt;
}

updateCache();
setInterval(updateCache, 30_000);

const companiesCaps = {
  topcapitalisation: async (req, res) => {
    if (!cachedTopCaps.length) {
      return res.status(503).json({ error: "Cache top cap non prêt." });
    }
    return res.status(200).json({ updatedAt: lastUpdated, data: cachedTopCaps });
  },

  smallcapitalisation: async (req, res) => {
    if (!cachedSmallCaps.length) {
      return res.status(503).json({ error: "Cache small cap non prêt." });
    }
    return res.status(200).json({ updatedAt: lastUpdated, data: cachedSmallCaps });
  },

  topmouvements: async (req, res) => {
    if (!cachedTopMovers.length) {
      return res.status(503).json({ error: "Cache top mouvements non prêt." });
    }
    return res.status(200).json({ updatedAt: lastUpdated, data: cachedTopMovers });
  }
};

export default companiesCaps;
