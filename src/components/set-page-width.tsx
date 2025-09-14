import { pageWidth } from "@/stores";
import { useStore } from "@nanostores/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { cn } from "@/utils";
import ExpandDark from "@/assets/icon/expand-dark.svg";
import Expand from "@/assets/icon/expand.svg";

interface Props {
  normal: string;
  expand: string;
}

export default function SetPageWidth({ normal, expand }: Props) {
  const [loaded, setLoaded] = useState<boolean>(false);
  const width = useStore(pageWidth);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    // set CSS variable --page-width
    document.documentElement.style.setProperty("--page-width", width);
  }, [width]);

  const setPageWidth = useCallback(() => {
    if (width === normal) pageWidth.set(expand);
    else pageWidth.set(normal);
  }, [width]);

  const content = useMemo(
    () => (
      <>
        <img className="block dark:hidden" src={Expand.src} width="20" alt="" />
        <img className="hidden dark:block" src={ExpandDark.src} width="20" alt="" />
        <span className="sr-only">Adjust Width</span>
      </>
    ),
    [],
  );

  return useMemo(
    () =>
      loaded ? (
        <button
          onClick={setPageWidth}
          className={cn(
            "hidden p-2 text-current transition-all duration-300 md:block",
            width === normal ? "opacity-50 hover:opacity-100" : "opacity-100 hover:opacity-50",
          )}
        >
          {content}
        </button>
      ) : (
        <button className="hidden p-2 text-current opacity-50 transition-all duration-300 hover:opacity-100 md:block">
          {content}
        </button>
      ),
    [content, loaded, width, setPageWidth],
  );
}
