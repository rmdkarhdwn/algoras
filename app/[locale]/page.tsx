import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/Card";
import enMessages from "@/messages/en.json";
import koMessages from "@/messages/ko.json";
import Link from "next/link";
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
    <section className="space-y-8">
      <Badge>{dictionary.home.badge}</Badge>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <Card className="overflow-hidden">
          <CardContent className="space-y-6 p-8 md:p-10">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-accent-strong">
              {dictionary.home.kicker}
            </p>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
                {dictionary.home.title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted">
                {dictionary.home.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/algorithms`}
                className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90"
              >
                {dictionary.home.primaryCta}
              </Link>
              <Link
                href={`/${locale}/data-structures`}
                className="rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent"
              >
                {dictionary.home.secondaryCta}
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-accent-strong text-white">
          <CardContent className="space-y-5 p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-white/70">
              {dictionary.home.sideLabel}
            </p>
            <div className="space-y-3">
              {dictionary.home.highlights.map((highlight) => (
                <div key={highlight.title} className="rounded-3xl bg-white/10 p-4">
                  <p className="text-sm text-white/70">{highlight.title}</p>
                  <p className="mt-1 text-lg font-semibold">{highlight.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {dictionary.home.sections.map((section) => (
          <Card key={section.title}>
            <CardContent className="space-y-3 p-6">
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
