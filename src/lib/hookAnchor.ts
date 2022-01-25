import { capitalize } from "./capitalize";
import { currencySymbols, isRecognisedCurrency } from "./config";
import { ItemTrade } from "./types/ItemStats";
import { ItemStatsLinkMap } from "./types/ItemStatsLinkMap";

const getPriceDeltaRow = (delta: number) => `
  <tr>
    <td>Current Trend:</td>
    <td>${delta > 0 ? `+${delta}` : delta}% in past 2 days</td>
  </tr>
`;

const getTradeRow = (trade: ItemTrade) => {
  const llRequirement = trade.requirements.find(
    (r) => r.type === "loyaltyLevel"
  );

  if (!llRequirement) {
    return "";
  }

  const traderName = capitalize(trade.source);
  const localizedPrice = trade.price.toLocaleString();
  const currencySymbol = isRecognisedCurrency(trade.currency)
    ? currencySymbols[trade.currency]
    : "?";
  const requiresQuest =
    trade.requirements.filter((r) => r.type === "questCompleted").length > 0;
  const loyaltyLevel = llRequirement.value;

  return `
    <tr>
      <td>
      ${traderName}
      (${requiresQuest ? "After quest" : `LL ${loyaltyLevel}`}):</td>
      <td>
        ${localizedPrice}
        (${currencySymbol})
      </td>
    </tr>
  `;
};

/** Attaches addon content to anchor element, such as price and price trend. */
export const hookAnchor = async (
  a: HTMLAnchorElement,
  item: ItemStatsLinkMap[string]
) => {
  const { avg24hPrice, buyFor, changeLast48hPercent } = item;

  // Create a wrapper span to put the original link into
  const linkWrapperSpan = document.createElement("span");
  linkWrapperSpan.append(a.cloneNode(true));

  // Create a little div to contain information after link without content
  // having the same href.
  const additionalContentDiv = document.createElement("div");
  additionalContentDiv.classList.add("twp-container");
  linkWrapperSpan.append(additionalContentDiv);

  // Display the current flea market price.
  const priceSpan = document.createElement("span");
  priceSpan.classList.add("twp-container__current-price");
  priceSpan.innerText =
    avg24hPrice > 0 ? `₽${avg24hPrice.toLocaleString()}` : "N/A";
  additionalContentDiv.append(priceSpan);

  // If the item has a flea price, display how this price has changed over time.
  if (avg24hPrice > 0) {
    const priceChangeDiv = document.createElement("div");
    priceChangeDiv.classList.add("twp-container__price-trend");
    priceChangeDiv.setAttribute(
      "data-twp-trending",
      changeLast48hPercent < 0 ? "down" : "up"
    );

    additionalContentDiv.append(priceChangeDiv);
  }

  const tooltipDiv = document.createElement("div");
  tooltipDiv.classList.add("twp-container__tooltip");
  additionalContentDiv.append(tooltipDiv);

  const fleaMarketPrice =
    avg24hPrice > 0
      ? `₽${avg24hPrice.toLocaleString()}`
      : "Cannot trade on Flea";

  const vendorTrades = buyFor.filter((offer) => offer.source !== "fleaMarket");

  tooltipDiv.innerHTML = `
    <table>
      <tr>
        <td>Flea Price:</td>
        <td>${fleaMarketPrice}</td>
      </tr>
      ${avg24hPrice > 0 ? getPriceDeltaRow(changeLast48hPercent) : ""}
      ${vendorTrades.map(getTradeRow).join("")}     
    </table>
  `;

  a.replaceWith(linkWrapperSpan);
};
