export function formatGs(value: number) {
  // Formato: 15000 -> 15.000
  const s = Math.round(value).toString();
  const withDots = s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${withDots} Gs`;
}

export function clampImages(images: string[]) {
  return (images ?? []).filter(Boolean).slice(0, 5);
}

export function initials(name: string) {
  const parts = (name || "").trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + last).toUpperCase();
}

export function normalizePathname(path: string) {
  if (!path) return "/";
  // quitamos trailing slash salvo root
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

export function normalizeEmbedUrl(url: string) {
  return url
    .replaceAll("&amp;", "&")
    .replaceAll("&#39;", "%27")
    .replaceAll("&apos;", "%27")
    .trim();
}
