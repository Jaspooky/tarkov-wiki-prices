import { hookElement } from "./lib/hookElement";
import { fetchItemStats } from "./lib/fetchItemStats";
import { findRelevantContentAnchors } from "./lib/findRelevantContentAnchors";

export const main = async () => {
  const itemStats = await fetchItemStats();

  findRelevantContentAnchors(document).forEach((link) => {
    hookElement(link, itemStats[link.href]);
  });

  const header = document.getElementById("firstHeading");

  if (header) {
    hookElement(header, itemStats[location.href]);
  }

  Array.from(document.querySelectorAll(".selflink")).forEach((selfLink) => {
    if (!(selfLink instanceof HTMLElement)) {
      return;
    }

    hookElement(selfLink, itemStats[location.href]);
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
