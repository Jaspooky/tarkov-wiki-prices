import { ItemStats } from "./ItemStats";

/** A map to look up items by their corresponding wiki link. */
export type ItemStatsLinkMap = Record<string, Omit<ItemStats, "wikiLink">>;
