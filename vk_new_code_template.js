/**
 * This following code does work in browser console
 * Implement it in ext & script sources
 * Remove `|| "подписаться"` if you don't need that feature on
 */
const links = document.querySelectorAll("span.vkuiButton__content");

links.forEach((link) => {
  const linkTextContentPrepared = link.textContent.toLowerCase();
  if (
    linkTextContentPrepared === "добавить" ||
    linkTextContentPrepared === "подписаться"
  ) {
    console.info("clicking: ", link);
    link.click();
  }
});
