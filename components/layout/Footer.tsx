type FooterProps = {
  locale: "ko" | "en";
  tagline: string;
};

export function Footer({ tagline }: FooterProps) {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 text-sm text-muted md:px-10">
        <p className="font-semibold tracking-[0.12em] text-accent">ALGORAS</p>
        <p>{tagline}</p>
      </div>
    </footer>
  );
}
