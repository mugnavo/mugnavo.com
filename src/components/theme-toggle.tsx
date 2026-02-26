import { Button } from "@/components/ui/button";
import { RiMoonLine, RiSunLine } from "@remixicon/react";

export function ThemeToggle() {
  function toggleTheme() {
    if (
      document.documentElement.classList.contains("dark") ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      type="button"
      onClick={toggleTheme}
      className="rounded-xl"
    >
      <RiSunLine className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <RiMoonLine className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
