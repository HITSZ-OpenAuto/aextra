import { useEffect } from "react";

function isDescendant(parent: HTMLElement, child: Node) {
  return parent && child && parent.contains(child);
}

function toggleMdTitle(mdTitle: HTMLElement, isNewlyClicked = false) {
  if (!mdTitle) return;

  if (isNewlyClicked) {
    mdTitle.style.setProperty("--md-after-opacity", "0.2");
    console.log("clicked style added");
  } else {
    mdTitle.style.removeProperty("--md-after-opacity");
    console.log("clicked style removed");
  }
}

function scrollToMdTitle(mdTitle: HTMLElement) {
  if (!mdTitle) {
    console.log("Markdown Title Not Found.");
    return;
  }

  const rect = mdTitle.getBoundingClientRect();
  const navBar = document.querySelector<HTMLElement>(".nav-bar");
  const navBarOffset = navBar ? navBar.offsetHeight : 0;
  const dist = rect.top + window.pageYOffset - navBarOffset - 10;
  window.scrollTo({ top: Math.max(0, dist), behavior: "smooth" });
}

export default function MdTitleEffect() {
  useEffect(() => {
    let currentMdTitle: HTMLElement | null = null;

    const handleClick = (e: PointerEvent) => {
      console.log("click event detected");
      const hs = document.querySelectorAll<HTMLElement>(".prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6");

      for (const h of hs) {
        if (isDescendant(h, e?.target as Node)) {
          if (h !== currentMdTitle) {
            toggleMdTitle(h, true);
            if (currentMdTitle) toggleMdTitle(currentMdTitle, false);
            currentMdTitle = h;
          }

          scrollToMdTitle(h);
          console.log("Title block clicked and scrolled into view");
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
