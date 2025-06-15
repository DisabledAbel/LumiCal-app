
import React, { useEffect, useState } from "react";
import { Moon, Sun, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

const THEMES = [
  { name: "Light", className: "" },
  { name: "Dark", className: "dark" },
  { name: "Blue", className: "theme-blue" },
  { name: "Pink", className: "theme-pink" },
  { name: "Purple", className: "theme-purple" }
] as const;

const LOCAL_KEY = "theme-color-mode";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(LOCAL_KEY) || "";
    }
    return "";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    // Remove all custom theme classes
    root.classList.remove("dark", "theme-blue", "theme-pink", "theme-purple");
    // Add new class if not default
    if (theme && theme !== "Light") {
      if (theme === "Dark") {
        root.classList.add("dark");
      } else {
        const found = THEMES.find(t => t.name === theme);
        if (found && found.className) {
          root.classList.add(found.className);
        }
      }
    }
    localStorage.setItem(LOCAL_KEY, theme);
  }, [theme]);

  return (
    <div className="flex gap-1">
      {THEMES.map(({ name }) => (
        <Button
          key={name}
          variant={theme === name ? "default" : "ghost"}
          size="sm"
          aria-label={name + " mode"}
          className="px-2"
          onClick={() => setTheme(name)}
        >
          {name === "Light" ? <Sun className="w-4 h-4" /> : null}
          {name === "Dark" ? <Moon className="w-4 h-4" /> : null}
          {name === "Blue" ? (
            <span className="w-4 h-4 inline-block rounded-full bg-blue-500 border border-blue-300 mr-1" />
          ) : null}
          {name === "Pink" ? (
            <span className="w-4 h-4 inline-block rounded-full bg-pink-500 border border-pink-300 mr-1" />
          ) : null}
          {name === "Purple" ? (
            <span className="w-4 h-4 inline-block rounded-full bg-purple-500 border border-purple-300 mr-1" />
          ) : null}
        </Button>
      ))}
    </div>
  );
}
