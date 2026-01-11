import fs from "node:fs/promises";
import path from "node:path";
import type { Locale } from "./i18n";

export async function getCafeContent(locale: Locale) {
  const base = path.join(process.cwd(), "src", "locale");
  const file = path.join(base, `${locale}.json`);
  const raw = await fs.readFile(file, "utf-8");
  return JSON.parse(raw);
}

export async function getCafeTheme() {
  const base = path.join(process.cwd(), "src");
  const raw = await fs.readFile(path.join(base, "theme.json"), "utf-8");
  return JSON.parse(raw);
}
