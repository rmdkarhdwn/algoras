import type { Metadata } from "next";
import type { AppLocale } from "@/lib/site";
import { absoluteUrl, siteConfig, withLocalePath } from "@/lib/site";

type MetadataInput = {
  locale: AppLocale;
  title: string;
  description: string;
  keywords: string[];
  pathname?: string;
};

const OG_LOCALE: Record<AppLocale, string> = {
  ko: "ko_KR",
  en: "en_US",
};

export function buildPageMetadata({
  locale,
  title,
  description,
  keywords,
  pathname = "",
}: MetadataInput): Metadata {
  const localizedPath = withLocalePath(locale, pathname);
  const canonicalUrl = absoluteUrl(localizedPath);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ko: absoluteUrl(withLocalePath("ko", pathname)),
        en: absoluteUrl(withLocalePath("en", pathname)),
      },
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      url: canonicalUrl,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: absoluteUrl(siteConfig.ogImagePath),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} Open Graph Image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(siteConfig.ogImagePath)],
    },
  };
}
