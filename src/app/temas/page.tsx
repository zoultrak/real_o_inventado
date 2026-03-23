import Link from "next/link";
import { AppHeader } from "../components/AppHeader";
import { BottomNav } from "../components/BottomNav";
import { getCategories } from "../actions/categories";

const accentByIndex = ["primary", "secondary", "tertiary", "primary", "secondary", "tertiary"];

const iconByIndex = ["◈", "⌘", "◉", "◌", "✦", "!"];

function getAccentClasses(accent: string) {
  if (accent === "secondary") {
    return {
      border: "border-[rgba(74,248,227,0.2)]",
      glow: "shadow-[0_0_15px_-3px_rgba(74,248,227,0.35)]",
      text: "text-[var(--secondary)]",
    };
  }
  if (accent === "tertiary") {
    return {
      border: "border-[rgba(255,235,147,0.2)]",
      glow: "shadow-[0_0_15px_-3px_rgba(255,235,147,0.3)]",
      text: "text-[var(--tertiary)]",
    };
  }
  return {
    border: "border-[rgba(199,153,255,0.2)]",
    glow: "shadow-[0_0_15px_-3px_rgba(199,153,255,0.35)]",
    text: "text-[var(--primary)]",
  };
}

export default async function TemasPage() {
  const categories = await getCategories();

  return (
    <main className="grid-pattern relative min-h-screen overflow-x-hidden bg-[var(--background)] text-white">
      <div className="ambient-orb ambient-orb--primary" />
      <div className="ambient-orb ambient-orb--secondary" />
      <AppHeader />

      <section className="mx-auto mb-32 mt-24 w-full max-w-5xl px-6">
        <header className="mb-10 text-center">
          <h2 className="font-headline bg-gradient-to-r from-[var(--primary)] to-[var(--primary-strong)] bg-clip-text text-4xl font-black italic tracking-[-0.06em] text-transparent">
            EXPLORA LA DUDA
          </h2>
          <p className="mx-auto mt-2 max-w-[280px] text-sm font-medium uppercase tracking-[0.2em] text-[var(--text-muted)] opacity-80">
            ¿Que tan facil es engañar a tu mente?
          </p>
        </header>

        <section className="grid auto-rows-fr grid-cols-2 gap-4">
          {categories.map((category, index) => {
            const accent = getAccentClasses(accentByIndex[index % accentByIndex.length]);
            const icon = iconByIndex[index % iconByIndex.length];

            return (
              <Link
                key={category.id}
                href={`/jugar?categoria=${category.id}&nombre=${encodeURIComponent(category.name)}`}
                className={`group relative flex overflow-hidden rounded-[1.5rem] border bg-[var(--surface-elevated)] p-6 transition-transform active:scale-[0.985] items-center text-center ${accent.border} ${accent.glow}`}
              >
                <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-white/5 blur-[60px]" />

                <div className="relative z-10 flex w-full flex-col items-center">
                  <span className={`mb-4 text-4xl ${accent.text}`}>{icon}</span>
                  <h3 className="font-headline text-base font-bold leading-tight text-white">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                      {category.description}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}

          {/* Tarjeta especial: Todas las categorías */}
          <Link
            href="/jugar?categoria=todas&nombre=Todas+las+Categorias"
            className="group relative col-span-2 flex overflow-hidden rounded-[1.5rem] border border-[rgba(74,248,227,0.2)] bg-[var(--surface-elevated)] p-8 shadow-[0_0_15px_-3px_rgba(74,248,227,0.35)] transition-transform active:scale-[0.985] items-start text-left"
          >
            <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-white/5 blur-[60px]" />

            <div className="relative z-10 flex w-full flex-col items-start">
              <span className="mb-4 text-4xl text-[var(--secondary)]">∞</span>
              <h3 className="font-headline text-2xl font-bold leading-tight text-white">
                Todas las Categorias
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Mezcla total
              </p>
            </div>

            <div className="absolute bottom-4 right-6 text-2xl opacity-20 transition-opacity group-hover:opacity-100">
              <span className="text-[var(--secondary)]">→</span>
            </div>
          </Link>
        </section>
      </section>

      <BottomNav active="temas" />
    </main>
  );
}