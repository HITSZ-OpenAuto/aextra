import { useStore } from "@nanostores/react";
import React, { useCallback, useEffect, useMemo } from "react";

import ExpandDark from "@/assets/icon/expand-dark.svg";
import Expand from "@/assets/icon/expand.svg";

import { pageWidth } from "../stores";

export default function PageWidthCSSVar() {
  const width = useStore(pageWidth);

  useEffect(() => {
    // 设置 CSS 变量 --page-width
    document.documentElement.style.setProperty("--page-width", width);
  }, [width]);

  const setPageWidth = useCallback(() => {
    if (width === "1280px") pageWidth.set("1536px");
    else pageWidth.set("1280px");
  }, [width]);

  return useMemo(
    () => (
      <button
        onClick={setPageWidth}
        className="p-2 text-current hidden md:block opacity-50 hover:opacity-100 transition-all duration-300"
      >
        <img className="block dark:hidden" src={Expand.src} width="20" alt="set-page-width" />
        <img
          className="hidden dark:block"
          src={ExpandDark.src}
          width="20"
          alt="set-page-width-dark"
        />
        <span className="sr-only">Adjust Width</span>
      </button>
    ),
    [setPageWidth],
  );
}
