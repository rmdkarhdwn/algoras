export const siteConfig = {
  name: "Algoras",
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://algoras.vercel.app").replace(/\/$/, ""),
  locales: ["ko", "en"] as const,
  defaultLocale: "ko" as const,
  ogImagePath: "/opengraph-image",
};

export type AppLocale = (typeof siteConfig.locales)[number];

export function isValidLocale(locale: string): locale is AppLocale {
  return siteConfig.locales.includes(locale as AppLocale);
}

export function withLocalePath(locale: AppLocale, pathname = "") {
  if (!pathname || pathname === "/") {
    return `/${locale}`;
  }

  return `/${locale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export function absoluteUrl(pathname = "") {
  return new URL(pathname || "/", `${siteConfig.siteUrl}/`).toString();
}

