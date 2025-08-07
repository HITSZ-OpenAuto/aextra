import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  wait: number,
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let lastTime = 0;
  return function (this: unknown, ...args: Parameters<T>): ReturnType<T> | undefined {
    const now = Date.now();
    if (now - lastTime >= wait) {
      lastTime = now;
      return fn.apply(this, args) as ReturnType<T>;
    }
  };
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
