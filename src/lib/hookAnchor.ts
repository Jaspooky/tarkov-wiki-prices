/** Attaches addon content to anchor element, such as price and price trend. */
export const hookAnchor = async (
  a: HTMLAnchorElement,
  price: number,
  priceDelta48hrs: number
) => {
  const priceDiv = document.createElement("div");
  priceDiv.classList.add("twp-container");
  priceDiv.innerText = price > 0 ? `₽${price}` : "N/A";

  if (price > 0) {
    const changeDiv = document.createElement("div");
    changeDiv.classList.add("twp-container__trend-indicator");
    changeDiv.setAttribute(
      "data-twp-trending",
      priceDelta48hrs < 0 ? "down" : "up"
    );
    changeDiv.title = `${priceDelta48hrs}% in past 2 days`;

    priceDiv.append(changeDiv);
  }

  a.append(priceDiv);
};
