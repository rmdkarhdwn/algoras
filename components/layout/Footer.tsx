type FooterProps = {
  locale: "ko" | "en";
};

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="border-t border-border bg-white/40">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 text-sm text-muted md:px-10">
        <p>Algoras</p>
        <p>
          {locale === "ko"
            ? "알고리즘을 눈으로 이해하는 학습 공간"
            : "A visual learning space for algorithms"}
        </p>
      </div>
    </footer>
  );
}
