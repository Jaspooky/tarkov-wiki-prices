import { itemStatsQuery, tarkovPriceApiUrl } from "./config";
import type { ItemStatsLinkMap } from "./types/ItemStatsLinkMap";
import type { ItemStats } from "./types/ItemStats";

/** Fetches price data for all items (~360kb at time of writing), with data
 * stored against the wiki URL for each item to make it simpler finding which
 * data to add to a link. */
export const fetchItemStats = async () => {
  const statsResponse = await fetch(tarkovPriceApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: itemStatsQuery }),
  });

  if (!statsResponse.ok) {
    throw new Error(`Failed to get stats: ${statsResponse.statusText}`);
  }

  const data = (await statsResponse.json()).data.itemsByType as ItemStats[];

  if (!data) {
    throw new Error(`No item stats: ${statsResponse.statusText}`);
  }

  return data.reduce<ItemStatsLinkMap>((acc, { wikiLink, ...rest }) => {
    acc[wikiLink] = rest;
    return acc;
  }, {});
};
