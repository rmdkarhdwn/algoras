import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import enMessages from "@/messages/en.json";
import koMessages from "@/messages/ko.json";
import { notFound } from "next/navigation";

const dictionaries = {
  en: enMessages,
  ko: koMessages,
} as const;

type Locale = keyof typeof dictionaries;

export function generateStaticParams() {
  return Object.keys(dictionaries).map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!(locale in dictionaries)) {
    notFound();
  }

  const dictionary = dictionaries[locale as Locale];

  return (
    <div className="min-h-screen">
      <Header locale={locale as Locale} labels={dictionary.navigation} />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-10 md:px-10">
        {children}
      </main>
      <Footer locale={locale as Locale} />
    </div>
  );
}
