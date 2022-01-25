import { hookAnchor } from "./lib/hookAnchor";
import { fetchItemStats } from "./lib/fetchItemStats";
import { findRelevantContentAnchors } from "./lib/findRelevantContentAnchors";

export const main = async () => {
  const itemStats = await fetchItemStats();

  findRelevantContentAnchors(document).forEach((link) => {
    const item = itemStats[link.href];

    if (!item) {
      return;
    }

    hookAnchor(link, item);
  });

  // Nice visual effect to have tooltips follow the cursor
  const tooltips = Array.from(
    document.querySelectorAll(".twp-container__tooltip")
  ).filter((node) => node instanceof HTMLDivElement) as HTMLDivElement[];

  window.addEventListener("mousemove", (e) => {
    tooltips.forEach((tooltip) => {
      tooltip.style.top = e.clientY + 24 + "px";
      tooltip.style.left = e.clientX + "px";
    });
  });
};

main();
