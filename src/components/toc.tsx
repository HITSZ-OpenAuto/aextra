// src/components/TOC.tsx
import type { MarkdownHeading } from "astro";
import React, { useEffect, useMemo, useState, type HTMLAttributes } from "react";

import { cn, throttle } from "../utils.ts";

interface Props {
  headings: MarkdownHeading[];
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
  className,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) {
  const [activeId, setActiveId] = useState<string>("");
  const [items, setItems] = useState<Heading[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const offsets = headings
        .map((h) => {
          const el = document.getElementById(h.slug);
          if (!el) return null;
          const top = el.getBoundingClientRect().top;
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
          let depth = 0;
          for (let i = 0; i < headings.length; i++) {
            if (path.includes(i)) {
              // continue expanding downwards for those within the path
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
              depth++;
              numbers.push(0);
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
        setActiveId(activeId);
        setItems(newItems);
      }
    };
    const throttledHandleScroll = throttle(handleScroll, 100);

    throttledHandleScroll(); // initial activation
    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [headings]);

  return useMemo(
    () => (
      // h-min is needed here to make sticky work
      <div {...props} className={cn("text-sm sticky top-24 max-w-72 h-min ml-6", className)}>
        <ul className="space-y-1">
          <strong>本章目录</strong>
          {items.map((h) => (
            <li
              key={h.slug}
              className="flex items-center"
              style={{
                paddingLeft: `calc(var(--spacing) * ${(h.depth - 1) * 2})`,
              }}
            >
              <a
                href={`#${h.slug}`}
                className={cn("block transition-colors", {
                  "text-blue-600 font-bold": h.isActive,
                  "text-gray-600": !h.isActive,
                })}
              >
                <span className="">{h.number}. </span>
                <span>{h.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    ),
    [activeId, items],
  );
}
