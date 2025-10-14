// src/components/TOC.tsx
import type { MarkdownHeading } from "astro";
import React, { useEffect, useMemo, useState, type HTMLAttributes } from "react";

import { cn, throttle } from "@/utils";

const TopHeadingLevel = 1;

interface Props {
  headings: MarkdownHeading[];
  minDepth?: number;
}

interface Heading extends MarkdownHeading {
  isActive: boolean;
  number: string;
}

function findPath(headings: MarkdownHeading[], index: number): number[] {
  const path: number[] = [index];
  let currentDepth = headings[index].depth;

  for (let i = index - 1; i >= 0; i--) {
    const h = headings[i];
    if (h.depth < currentDepth) {
      path.unshift(i); // insert at the front, keeping the order from root to parent
      // continue searching upward for a shallower parent heading
      currentDepth = h.depth;
    }
  }

  return path;
}

export default function TOC({
  headings,
  minDepth = 2,
  className,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) {
  const [items, setItems] = useState<Heading[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navbar");
      const navbarHeight = navbar?.offsetHeight || 0;
      console.log(navbarHeight);
      const offsets = headings
        .map((h) => {
          const el = document.getElementById(h.slug);
          if (!el) return null;
          const top = el.getBoundingClientRect().top - navbarHeight;
          return { id: h.slug, top };
        })
        .filter(Boolean)
        .sort((a, b) => Math.abs(a!.top) - Math.abs(b!.top)); // the one closest to the top

      if (offsets.length > 0) {
        const activeId = offsets[0]!.id;
        const activeIndex = headings.findIndex((h) => h.slug === activeId);
        const newItems: Heading[] = [];
        if (activeIndex !== -1) {
          const path = findPath(headings, activeIndex);
          const numbers = [];
          let depth = TopHeadingLevel;
          for (let i = 0; i < headings.length; i++) {
            if (headings[i].depth === 1) {
              // start a new part
              depth = 1;
              numbers.length = 0;
              newItems.push({
                ...headings[i],
                isActive: false,
                number: "",
              });
              continue;
            }
            if (path.includes(i)) {
              // if the heading is on the path, expand to the next depth
              while (depth < headings[i].depth) {
                depth++;
                numbers.push(0);
              }
              numbers[numbers.length - 1]++;
              newItems.push({
                ...headings[i],
                isActive: true,
                number: numbers.join("."),
              });
              if (i !== headings.length - 1) {
                while (depth < headings[i + 1].depth) {
                  depth++;
                  numbers.push(0);
                }
              }
            } else if (depth < headings[i].depth && headings[i].depth <= minDepth) {
              // if the heading depth meets the minimum depth, expand to the current depth
              while (depth < headings[i].depth) {
                depth++;
                numbers.push(0);
              }
              numbers[numbers.length - 1]++;
              newItems.push({
                ...headings[i],
                isActive: false,
                number: numbers.join("."),
              });
            } else if (headings[i].depth === depth) {
              // show headings at the same depth
              numbers[numbers.length - 1]++;
              newItems.push({
                ...headings[i],
                isActive: false,
                number: numbers.join("."),
              });
            } else if (headings[i].depth < depth) {
              // backtrack
              while (depth > headings[i].depth) {
                depth--;
                numbers.pop();
              }
              numbers[numbers.length - 1]++;
              newItems.push({
                ...headings[i],
                isActive: false,
                number: numbers.join("."),
              });
            }
          }
        }
        setItems(newItems);
      }
    };
    const throttledHandleScroll = throttle(handleScroll, 100);

    throttledHandleScroll(); // initial activation
    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [headings, minDepth]);

  return useMemo(
    () => (
      // h-min is needed here to make sticky work
      <nav {...props} className={cn("sticky top-24 ml-6 h-min max-w-72 text-sm", className)}>
        <ul className="space-y-1">
          <strong>本章目录</strong>
          {items.map((h) => (
            <li
              key={h.slug}
              className="flex items-center"
              style={{
                paddingLeft: `calc(var(--spacing) * ${(h.depth - 2) * 2})`,
              }}
            >
              {h.depth === TopHeadingLevel ? (
                <a href={`#${h.slug}`} className="my-1 mt-2 block">
                  {h.text}
                </a>
              ) : (
                <a
                  href={`#${h.slug}`}
                  className={cn("block transition-colors", {
                    "font-bold text-blue-600": h.isActive,
                    "text-gray-600": !h.isActive,
                  })}
                >
                  <span className="">{h.number}. </span>
                  <span>{h.text}</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    ),
    [className, items, props],
  );
}
