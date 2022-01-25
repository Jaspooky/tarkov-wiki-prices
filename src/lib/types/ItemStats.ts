/** Stats describing the trade requirements to obtain an item. */
export type ItemTradeRequirements = {
  type: string;
  value: number;
};

/** Stats describing a trade. */
export type ItemTrade = {
  source: string;
  price: number;
  currency: string;
  requirements: ItemTradeRequirements[];
};

/** Raw item stats content as returned from the items API. */
export type ItemStats = {
  avg24hPrice: number;
  changeLast48hPercent: number;
  wikiLink: string;
  buyFor: ItemTrade[];
};
