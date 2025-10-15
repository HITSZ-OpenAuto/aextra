import { theme as themeStore } from "@/stores";
import { cn } from "@/utils.ts";
import { useStore } from "@nanostores/react";
import { Contrast, Moon, Sun } from "lucide-react";
import { useCallback, type HTMLAttributes, type JSX } from "react";

const themeIconMap: Record<string, JSX.Element> = {
  system: <Contrast />,
  light: <Sun />,
  dark: <Moon />,
};

export default function ThemeSwitcher({ className, ...props }: HTMLAttributes<HTMLButtonElement>) {
  const theme = useStore(themeStore);
  const switchTheme = useCallback(() => {
    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // define theme cycle
    const cycle: Record<string, string> = {
      system: isSystemDark ? "light" : "dark",
      light: isSystemDark ? "dark" : "system",
      dark: isSystemDark ? "system" : "light",
    };

    const nextTheme = cycle[theme] || "system";

    // update theme
    const effectiveTheme = nextTheme === "system" ? (isSystemDark ? "dark" : "light") : nextTheme;

    document.documentElement.setAttribute("data-theme", effectiveTheme);
    themeStore.set(nextTheme);
  }, [theme]);

  return (
    <button {...props} className={cn("size-6", "rounded-full", className)} onClick={switchTheme}>
      {themeIconMap[theme]}
    </button>
  );
}
