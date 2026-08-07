"use client";

import { useEffect, useState } from "react";
import { DEFAULT_THEME, themes } from "@/data/themes";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<string>(DEFAULT_THEME);

  useEffect(() => {
    const savedTheme = document.documentElement.dataset.theme ?? DEFAULT_THEME;
    queueMicrotask(() => setTheme(savedTheme));
  }, []);

  function updateTheme(value: string) {
    setTheme(value);
    document.documentElement.dataset.theme = value;
    localStorage.setItem("liyu-theme", value);
  }

  return (
    <label className="relative">
      <span className="sr-only">網站配色</span>
      <select
        aria-label="切換網站配色"
        className="max-w-28 rounded-full border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink sm:max-w-none"
        value={theme}
        onChange={(event) => updateTheme(event.target.value)}
      >
        {Object.entries(themes).map(([value, option]) => (
          <option key={value} value={value}>{option.name}</option>
        ))}
      </select>
    </label>
  );
}
