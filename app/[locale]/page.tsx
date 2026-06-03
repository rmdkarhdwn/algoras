import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/Card";
import { HeroSection } from "@/components/ui/HeroSection";
import enMessages from "@/messages/en.json";
import koMessages from "@/messages/ko.json";
import { notFound } from "next/navigation";

const dictionaries = {
  en: enMessages,
  ko: koMessages,
} as const;

type Locale = keyof typeof dictionaries;

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(locale in dictionaries)) {
    notFound();
  }

  const dictionary = dictionaries[locale as Locale];

  return (
    <>
      {/* Hero — bleeds to container edges by negating main padding */}
      <div className="-mx-6 -mt-10 md:-mx-10">
        <HeroSection
          locale={locale}
          heading={dictionary.home.title}
          description={dictionary.home.description}
          primaryCta={dictionary.home.primaryCta}
          badge={dictionary.home.badge}
        />
      </div>

      {/* Feature cards */}
      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {dictionary.home.sections.map((section) => (
          <Card key={section.title}>
            <CardContent className="space-y-3 p-6">
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
