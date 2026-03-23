import Link from "next/link";
import { AppHeader } from "../components/AppHeader";
import { getQuestions } from "../actions/questions-admin";
import { getCategories } from "../actions/categories";
import { DeleteButton } from "./DeleteButton";

export default async function GestionPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; categoria?: string }>;
}) {
  const { search, categoria } = await searchParams;
  const [questions, categories] = await Promise.all([
    getQuestions(search, categoria),
    getCategories(),
  ]);

  return (
    <main className="grid-pattern relative min-h-screen overflow-x-hidden bg-[var(--background)] text-white">
      <div className="ambient-orb ambient-orb--primary" />
      <div className="ambient-orb ambient-orb--secondary" />
      <AppHeader />

      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-32 pt-28">
        <header className="mb-10 space-y-6">
          <div className="flex justify-end">
            <Link
              href="/gestion/nueva"
              className="btn-primary font-headline flex items-center justify-center rounded-md px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em]"
            >
              Añadir pregunta
            </Link>
          </div>

          <div className="w-full">
            <h2 className="font-headline bg-gradient-to-r from-[var(--primary)] to-[var(--primary-strong)] bg-clip-text text-4xl font-black italic tracking-[-0.06em] text-transparent">
              GESTION DE PREGUNTAS
            </h2>
            <p className="mt-2 max-w-3xl text-sm font-medium uppercase tracking-[0.2em] text-[var(--text-muted)] opacity-80">
              Lista, filtra y administra preguntas y respuestas.
            </p>
          </div>

          <form className="glass-panel rounded-[1.5rem] p-4">
            <div className="grid gap-3 lg:grid-cols-[1.8fr_1.1fr_0.7fr]">
              <div className="field-shell surface-elevated rounded-xl p-1">
                <input
                  name="search"
                  type="text"
                  defaultValue={search}
                  placeholder="Busca por enunciado"
                  className="w-full rounded-md border-none bg-transparent px-4 py-4 text-sm text-white outline-none placeholder:text-white/35"
                />
              </div>

              <div className="field-shell surface-elevated rounded-xl p-1">
                <select
                  name="categoria"
                  defaultValue={categoria ?? "todas"}
                  className="w-full rounded-md border-none bg-transparent px-4 py-4 text-sm text-white outline-none"
                >
                  <option value="todas" className="bg-[#161616]">
                    Todas las categorias
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={String(cat.id)} className="bg-[#161616]">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="rounded-md border border-[rgba(199,153,255,0.22)] bg-[rgba(199,153,255,0.12)] px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-[var(--primary)]"
              >
                Buscar
              </button>
            </div>
          </form>
        </header>

        <section className="glass-panel rounded-[1.75rem] p-6 sm:p-8">
          <div className="mb-5 grid gap-3 rounded-[1.25rem] border border-white/8 bg-[var(--surface-elevated)] px-4 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)] sm:grid-cols-[0.75fr_1.2fr_2fr_0.8fr_1.1fr]">
            <span>ID</span>
            <span>Categoria</span>
            <span>Pregunta</span>
            <span>Estado</span>
            <span>Acciones</span>
          </div>

          {questions.length === 0 ? (
            <p className="py-12 text-center text-sm text-[var(--text-muted)]">
              No hay preguntas todavía.{" "}
              <Link href="/gestion/nueva" className="text-[var(--primary)] underline">
                Crea la primera
              </Link>
            </p>
          ) : (
            <div className="space-y-4">
              {questions.map((question) => {
                const correctAnswer = question.answers.find((a) => a.is_correct);
                const status = question.is_active ? "Activa" : "Borrador";

                return (
                  <article
                    key={question.id}
                    className="grid gap-4 rounded-[1.25rem] border border-white/8 bg-[var(--surface-elevated)] px-4 py-5 sm:grid-cols-[0.75fr_1.2fr_2fr_0.8fr_1.1fr] sm:items-center"
                  >
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)] sm:hidden">ID</p>
                      <p className="text-sm font-bold text-[var(--primary)]">Q-{question.id}</p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)] sm:hidden">Categoria</p>
                      <p className="text-sm font-semibold text-white">{question.category?.name ?? "—"}</p>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)] sm:hidden">Pregunta</p>
                      <p className="text-sm leading-relaxed text-white">{question.statement}</p>
                      {correctAnswer && (
                        <span className="mt-2 inline-block rounded-full bg-[rgba(74,248,227,0.12)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--secondary)]">
                          Correcta: {correctAnswer.answer_text}
                        </span>
                      )}
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)] sm:hidden">Estado</p>
                      <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${
                        status === "Activa"
                          ? "bg-[rgba(74,248,227,0.12)] text-[var(--secondary)]"
                          : "bg-[rgba(255,235,147,0.12)] text-[var(--tertiary)]"
                      }`}>
                        {status}
                      </span>
                    </div>

                    <div className="grid gap-2">
                      <Link
                        href={`/gestion/editar/${question.id}`}
                        className="rounded-md border border-[rgba(199,153,255,0.22)] bg-[rgba(199,153,255,0.12)] px-4 py-3 text-center text-[11px] font-black uppercase tracking-[0.18em] text-[var(--primary)]"
                      >
                        Editar
                      </Link>
                      <DeleteButton id={question.id} />
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}