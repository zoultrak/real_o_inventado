import { AppHeader } from "../components/AppHeader";
import { BottomNav } from "../components/BottomNav";

const topPlayers = [
  { name: "Laura Trivia", score: "12,450", streak: "x11" },
  { name: "Ana Curiosa", score: "11,980", streak: "x9" },
  { name: "Diego Quiz", score: "10,740", streak: "x7" },
];

const recentRuns = [
  { category: "Tecnologia", score: "+420", result: "8/10" },
  { category: "Historia", score: "+360", result: "7/10" },
  { category: "Todas las Categorias", score: "+510", result: "9/10" },
];

export default function RecordsPage() {
  return (
    <main className="grid-pattern relative min-h-screen overflow-x-hidden bg-[var(--background)] text-white">
      <div className="ambient-orb ambient-orb--primary" />
      <div className="ambient-orb ambient-orb--secondary" />
      <AppHeader />

      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 pb-32 pt-28">
        <header className="mb-10 text-center">
          <h2 className="font-headline bg-gradient-to-r from-[var(--primary)] to-[var(--primary-strong)] bg-clip-text text-4xl font-black italic tracking-[-0.06em] text-transparent">
            RECORDS
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm font-medium uppercase tracking-[0.2em] text-[var(--text-muted)] opacity-80">
            Consulta las mejores marcas y tus resultados mas recientes.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="glass-panel rounded-[1.75rem] p-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-[0.22em] text-[var(--secondary)]">
                Top jugadores
              </h3>
              <span className="rounded-full border border-white/10 bg-[var(--surface-elevated)] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
                Temporada actual
              </span>
            </div>

            <div className="space-y-4">
              {topPlayers.map((player, index) => (
                <div
                  key={player.name}
                  className="grid items-center gap-4 rounded-[1.25rem] border border-white/8 bg-[var(--surface-elevated)] px-4 py-4 sm:grid-cols-[0.4fr_1.5fr_1fr_0.7fr]"
                >
                  <span className="font-headline text-2xl font-black text-[var(--primary)]">
                    #{index + 1}
                  </span>
                  <span className="font-semibold text-white">{player.name}</span>
                  <span className="text-sm font-bold text-[var(--secondary)]">
                    {player.score} pts
                  </span>
                  <span className="text-sm font-bold text-[var(--tertiary)]">
                    {player.streak}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <div className="space-y-6">
            <article className="glass-panel rounded-[1.75rem] p-8">
              <h3 className="mb-6 text-xs font-black uppercase tracking-[0.22em] text-[var(--secondary)]">
                Tu mejor marca
              </h3>

              <div className="rounded-[1.5rem] border border-[rgba(74,248,227,0.14)] bg-[rgba(74,248,227,0.08)] p-6">
                <p className="font-headline text-5xl font-black text-white">12,450</p>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  Puntos acumulados
                </p>
              </div>
            </article>

            <article className="glass-panel rounded-[1.75rem] p-8">
              <h3 className="mb-6 text-xs font-black uppercase tracking-[0.22em] text-[var(--primary)]">
                Resultados recientes
              </h3>

              <div className="space-y-4">
                {recentRuns.map((run) => (
                  <div
                    key={`${run.category}-${run.score}`}
                    className="rounded-[1.25rem] border border-white/8 bg-[var(--surface-elevated)] px-4 py-4"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                      {run.category}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-headline text-lg font-bold text-white">
                        {run.score}
                      </span>
                      <span className="text-sm font-semibold text-[var(--secondary)]">
                        {run.result}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      </section>

      <BottomNav active="records" />
    </main>
  );
}
