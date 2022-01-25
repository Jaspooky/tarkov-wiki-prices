/** Finds all <a> tags within the "content" element that are not wrapping an
 * image. We only want to add the price attributes to plain text links. */
export const findRelevantContentAnchors = (document: Document) => {
  const contentDiv = document.getElementById("content");

  if (!contentDiv) {
    return [];
  }

  const contentLinks = contentDiv.querySelectorAll("a");

  return Array.from(contentLinks).filter(
    (link) =>
      !link.classList.contains("image") &&
      !link.classList.contains("unified-search__result__title") &&
      !link.querySelector("img") &&
      !!link.href
  );
};
