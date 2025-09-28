import { useEffect } from "react";

export default function MdTitleEffect() {
  useEffect(() => {
    let curSharp: HTMLElement | null = null;

    const hs = document.querySelectorAll<HTMLElement>(
      ".prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6",
    );

    // insert a label after every title
    for (const h of hs) {
      const a = document.createElement("a");
      const path = window.location.pathname.replace(/\/$/, ""); // remove trailing slash
      a.href = `${path}/#${h.id}`;
      a.className = "md-anchor";
      h.insertAdjacentElement("beforeend", a);
    }

    const parentNode = document.querySelector(".prose");
    if (!parentNode) return;

    parentNode.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;

      if (target.classList.contains("md-anchor")) {
        if (target != curSharp) {
          curSharp?.classList.remove("active");
          target.classList.add("active");
          curSharp = target;
        }
      }
    });

    return () => {
      parentNode.removeEventListener("click", () => {});
    };
  }, []);

  return null;
}
