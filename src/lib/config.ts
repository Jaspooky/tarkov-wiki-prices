/** Root URL for fetching item stats. */
export const tarkovPriceApiUrl = "https://tarkov-tools.com/graphql";

/** Maps currency abbreviations to the corresponding symbol */
export const currencySymbols = <const>{
  RUB: "₽",
  EUR: "€",
  USD: "$",
};

/** Checks whether a string is a recognised currency abbreviation. */
export const isRecognisedCurrency = (
  value: string
): value is keyof typeof currencySymbols => value in currencySymbols;

/** GraphQL query to retrieve item stats data. */
export const itemStatsQuery = `{
  itemsByType(type: any) {
    wikiLink,
    avg24hPrice,
    changeLast48hPercent,
    buyFor {
      source,
      price,
      currency,
      requirements {
        type,
        value
      }
    }
  }
}`;
