type GAParams = Record<string, string | number | boolean>;

export function trackEvent(eventName: string, params: GAParams = {}) {
  if (typeof window === "undefined") return;
  if (!(window as any).gtag) return;

  (window as any).gtag("event", eventName, params);
}
