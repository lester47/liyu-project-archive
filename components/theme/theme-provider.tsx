"use client";

import { useEffect } from "react";
import { DEFAULT_THEME, themes, type ThemeId } from "@/data/themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const saved = localStorage.getItem("liyu-theme");
    const theme = saved && saved in themes ? saved as ThemeId : DEFAULT_THEME;
    document.documentElement.dataset.theme = theme;
  }, []);

  return children;
}
