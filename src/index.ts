import { hookAnchor } from "./lib/hookAnchor";
import { fetchItemStats } from "./lib/fetchItemStats";
import { findNonImageContentAnchors } from "./lib/findNonImageContentAnchors";

export const main = async () => {
  const itemStats = await fetchItemStats();

  findNonImageContentAnchors(document).forEach((link) => {
    const item = itemStats[link.href];

    if (!item) {
      return;
    }

    hookAnchor(link, item.avg24hPrice, item.changeLast48hPercent);
  });
};

main();
