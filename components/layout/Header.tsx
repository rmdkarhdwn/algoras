import Link from "next/link";

type HeaderProps = {
  locale: "ko" | "en";
  labels: {
    home: string;
    algorithms: string;
    dataStructures: string;
  };
};

export function Header({ locale, labels }: HeaderProps) {
  const items = [
    { href: `/${locale}`, label: labels.home },
    { href: `/${locale}/algorithms`, label: labels.algorithms },
    { href: `/${locale}/data-structures`, label: labels.dataStructures },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-white/60 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link href={`/${locale}`} className="text-lg font-bold tracking-[0.18em] text-accent-strong">
          ALGORAS
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-muted">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
