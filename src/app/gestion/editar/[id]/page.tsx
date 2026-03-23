"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateQuestion, getQuestionById } from "../../../actions/questions-admin";

const categories = [
  { id: 1, name: "Ciencia" },
  { id: 2, name: "Tecnología" },
  { id: 3, name: "Historia" },
  { id: 4, name: "Entretenimiento" },
];

export default function EditarPreguntaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [question, setQuestion] = useState<Awaited<ReturnType<typeof getQuestionById>>>(null);

  useEffect(() => {
    params.then(({ id }) => {
      getQuestionById(parseInt(id)).then(setQuestion);
    });
  }, [params]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!question) return;
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      category_id: parseInt((form.elements.namedItem("category_id") as HTMLSelectElement).value),
      statement: (form.elements.namedItem("statement") as HTMLTextAreaElement).value,
      explanation: (form.elements.namedItem("explanation") as HTMLTextAreaElement).value,
      correct: (form.elements.namedItem("correct") as HTMLSelectElement).value as "Real" | "Inventado",
      is_active: (form.elements.namedItem("status") as HTMLSelectElement).value === "Activa",
    };

    try {
      await updateQuestion(question.id, data);
      router.push("/gestion");
    } catch {
      setError("Error al actualizar la pregunta.");
      setLoading(false);
    }
  }

  if (!question) {
    return (
      <main className="grid-pattern relative flex min-h-screen items-center justify-center bg-[var(--background)] text-white">
        <p className="text-[var(--text-muted)]">Cargando...</p>
      </main>
    );
  }

  const correctAnswer = question.answers.find((a) => a.is_correct)?.answer_text ?? "Real";

  return (
    <main className="grid-pattern relative min-h-screen overflow-x-hidden bg-[var(--background)] text-white">
      <div className="ambient-orb ambient-orb--primary" />
      <div className="ambient-orb ambient-orb--secondary" />

      <header className="fixed inset-x-0 top-0 z-50 bg-[rgba(14,14,14,0.82)] shadow-[0_4px_30px_rgba(199,153,255,0.08)] backdrop-blur-2xl">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/gestion"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[var(--surface-elevated)] text-sm font-bold"
            >
              ←
            </Link>
            <h1 className="font-headline bg-gradient-to-r from-[var(--primary)] to-[var(--primary-strong)] bg-clip-text text-xl font-black italic tracking-[-0.06em] text-transparent">
              Editar Q-{question.id}
            </h1>
          </div>
          <Link
            href="/gestion"
            className="rounded-full border border-white/10 bg-[var(--surface-elevated)] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--secondary)]"
          >
            Listado
          </Link>
        </div>
      </header>

      <section className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 pb-24 pt-28">
        <article className="glass-panel rounded-[1.75rem] p-8">
          <h2 className="mb-6 text-xs font-black uppercase tracking-[0.22em] text-[var(--secondary)]">
            Editar pregunta y respuestas
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="block px-1 text-xs font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
                  Categoria
                </label>
                <div className="field-shell surface-elevated rounded-xl p-1">
                  <select
                    name="category_id"
                    defaultValue={question.category_id ?? 1}
                    className="w-full rounded-md border-none bg-transparent px-4 py-4 text-white outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id} className="bg-[#161616]">
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block px-1 text-xs font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
                  Estado
                </label>
                <div className="field-shell surface-elevated rounded-xl p-1">
                  <select
                    name="status"
                    defaultValue={question.is_active ? "Activa" : "Borrador"}
                    className="w-full rounded-md border-none bg-transparent px-4 py-4 text-white outline-none"
                  >
                    <option value="Activa" className="bg-[#161616]">Activa</option>
                    <option value="Borrador" className="bg-[#161616]">Borrador</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block px-1 text-xs font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
                Enunciado
              </label>
              <div className="field-shell surface-elevated rounded-xl p-1">
                <textarea
                  name="statement"
                  rows={5}
                  defaultValue={question.statement}
                  className="w-full resize-none rounded-md border-none bg-transparent px-4 py-4 text-white outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block px-1 text-xs font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
                Explicacion
              </label>
              <div className="field-shell surface-elevated rounded-xl p-1">
                <textarea
                  name="explanation"
                  rows={3}
                  defaultValue={question.explanation ?? ""}
                  className="w-full resize-none rounded-md border-none bg-transparent px-4 py-4 text-white outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block px-1 text-xs font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
                Respuesta correcta
              </label>
              <div className="field-shell surface-elevated rounded-xl p-1">
                <select
                  name="correct"
                  defaultValue={correctAnswer}
                  className="w-full rounded-md border-none bg-transparent px-4 py-4 text-white outline-none"
                >
                  <option value="Real" className="bg-[#161616]">Real</option>
                  <option value="Inventado" className="bg-[#161616]">Inventado</option>
                </select>
              </div>
            </div>

            {error && (
              <p className="rounded-lg bg-[rgba(167,1,56,0.22)] px-4 py-3 text-sm font-semibold text-[rgb(255,178,185)]">
                {error}
              </p>
            )}

            <div className="grid gap-4 pt-2 sm:grid-cols-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary font-headline flex items-center justify-center rounded-md py-4 text-lg font-extrabold disabled:opacity-60"
              >
                {loading ? "Guardando..." : "Guardar"}
              </button>
              <Link
                href="/gestion"
                className="flex items-center justify-center rounded-md border border-white/10 bg-[var(--surface-elevated)] py-4 text-lg font-black uppercase tracking-[0.18em] text-white"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </article>
      </section>
    </main>
  );
}