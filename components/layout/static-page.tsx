export function StaticPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children?: React.ReactNode }) {
  return <section className="page-shell py-12 sm:py-16"><p className="eyebrow">{eyebrow}</p><h1 className="page-title mt-3">{title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{intro}</p>{children}</section>;
}
