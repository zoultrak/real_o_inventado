"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { AppHeader } from "../components/AppHeader";
import { BottomNav } from "../components/BottomNav";
import { getQuestionsByCategory } from "../actions/questions";

type Answer = {
  id: number;
  answer_text: string;
  is_correct: boolean;
};

type Question = {
  id: number;
  statement: string;
  explanation: string | null;
  category: { name: string } | null;
  answers: Answer[];
};

type GameState = "playing" | "feedback" | "finished";

export default function JugarPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoriaId = searchParams.get("categoria") ?? "todas";
  const nombreCategoria = searchParams.get("nombre") ?? "General";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState<GameState>("playing");
  const [lastCorrect, setLastCorrect] = useState(false);

  useEffect(() => {
    getQuestionsByCategory(categoriaId, 5).then((data) => {
      setQuestions(data as Question[]);
      setLoading(false);
    });
  }, [categoriaId]);

  function handleAnswer(opcion: "Real" | "Inventado") {
    const current = questions[index];
    const correctAnswer = current.answers.find((a) => a.is_correct);
    const esAcierto = correctAnswer?.answer_text === opcion;

    if (esAcierto) setAciertos((prev) => prev + 1);
    setLastCorrect(esAcierto);
    setGameState("feedback");
  }

  function handleNext() {
    const siguiente = index + 1;
    if (siguiente >= questions.length) {
      setGameState("finished");
    } else {
      setIndex(siguiente);
      setGameState("playing");
    }
  }

  if (loading) {
    return (
      <main className="grid-pattern relative flex min-h-screen items-center justify-center bg-[var(--background)] text-white">
        <div className="text-center space-y-4">
          <div className="text-4xl animate-pulse text-[var(--primary)]">◌</div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Cargando preguntas...
          </p>
        </div>
      </main>
    );
  }

  if (questions.length === 0) {
    return (
      <main className="grid-pattern relative flex min-h-screen items-center justify-center bg-[var(--background)] text-white">
        <div className="text-center space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
            No hay preguntas para esta categoría.
          </p>
          <button
            onClick={() => router.push("/temas")}
            className="btn-primary rounded-md px-6 py-3 text-sm font-bold"
          >
            Volver a temas
          </button>
        </div>
      </main>
    );
  }

  // PANTALLA FINAL
  if (gameState === "finished") {
    const puntos = aciertos * 100;
    return (
      <main className="grid-pattern relative min-h-screen overflow-x-hidden bg-[var(--background)] text-white">
        <div className="ambient-orb ambient-orb--primary" />
        <div className="ambient-orb ambient-orb--secondary" />
        <AppHeader />

        <section className="relative mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center px-6 pb-32 pt-28">
          <div className="text-center space-y-4 mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(74,248,227,0.2)] bg-[rgba(74,248,227,0.1)] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--secondary)]">
              ✦ Partida terminada
            </span>
            <h2 className="font-headline text-5xl font-black italic leading-none tracking-[-0.08em]">
              ¡COMPLETADO!
            </h2>
          </div>

          <div className="glass-panel w-full rounded-[1.75rem] p-8 mb-8 text-center">
            <p className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-[0.2em] mb-2">
              Resultado final
            </p>
            <p className="font-headline text-6xl font-black text-white mb-2">
              {aciertos}/{questions.length}
            </p>
            <p className="text-[var(--secondary)] font-bold">+{puntos} puntos</p>
          </div>

          <div className="grid w-full grid-cols-2 gap-4">
            <button
              onClick={() => {
                setIndex(0);
                setAciertos(0);
                setGameState("playing");
                setLoading(true);
                getQuestionsByCategory(categoriaId, 5).then((data) => {
                  setQuestions(data as Question[]);
                  setLoading(false);
                });
              }}
              className="btn-primary font-headline flex items-center justify-center rounded-md py-5 text-lg font-black uppercase"
            >
              Jugar de nuevo
            </button>
            <button
              onClick={() => router.push("/temas")}
              className="flex items-center justify-center rounded-md border border-white/10 bg-[var(--surface-elevated)] py-5 text-lg font-black uppercase text-white"
            >
              Cambiar tema
            </button>
          </div>
        </section>

        <BottomNav active="jugar" />
      </main>
    );
  }

  const current = questions[index];
  const correctAnswer = current.answers.find((a) => a.is_correct);
  const total = questions.length;
  const progreso = Math.round((index / total) * 100);

  // PANTALLA DE FEEDBACK (después de responder)
  if (gameState === "feedback") {
    return (
      <main className="grid-pattern relative min-h-screen overflow-x-hidden bg-[var(--background)] text-white">
        <div className="ambient-orb ambient-orb--primary" />
        <div className="ambient-orb ambient-orb--secondary" />
        <AppHeader />

        <section className="relative mx-auto flex min-h-screen w-full max-w-lg flex-col justify-center px-6 pb-36 pt-28">
          <div className="text-center mb-8 space-y-3">
            {lastCorrect ? (
              <>
                <span className="inline-flex rounded-full border border-[rgba(74,248,227,0.2)] bg-[rgba(74,248,227,0.1)] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--secondary)]">
                  ✦ ¡Correcto!
                </span>
                <h2 className="font-headline text-5xl font-black italic tracking-[-0.08em] text-[var(--secondary)]">
                  ¡ACERTASTE!
                </h2>
              </>
            ) : (
              <>
                <span className="inline-flex rounded-full border border-[rgba(255,110,132,0.22)] bg-[rgba(255,110,132,0.1)] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[rgb(255,178,185)]">
                  ✦ Incorrecto
                </span>
                <h2 className="font-headline text-5xl font-black italic tracking-[-0.08em] text-[rgb(255,178,185)]">
                  FALLASTE
                </h2>
              </>
            )}
          </div>

          <div className={`glass-panel rounded-[1.75rem] border-l-4 p-8 mb-8 ${
            lastCorrect ? "border-[var(--secondary)]" : "border-[rgb(255,178,185)]"
          }`}>
            <p className={`text-xs font-black uppercase tracking-[0.22em] mb-3 ${
              lastCorrect ? "text-[var(--secondary)]" : "text-[rgb(255,178,185)]"
            }`}>
              La respuesta correcta era:{" "}
              <span className="text-white">{correctAnswer?.answer_text}</span>
            </p>
            {current.explanation && (
              <p className="text-sm font-medium leading-relaxed text-[var(--text-muted)]">
                {current.explanation}
              </p>
            )}
          </div>

          <button
            onClick={handleNext}
            className="btn-primary font-headline flex w-full items-center justify-center gap-3 rounded-md py-5 text-lg font-black uppercase"
          >
            {index + 1 >= total ? "Ver resultado final" : "Siguiente →"}
          </button>
        </section>

        <BottomNav active="jugar" />
      </main>
    );
  }

  // PANTALLA DE JUEGO
  return (
    <main className="grid-pattern relative min-h-screen overflow-x-hidden bg-[var(--background)] text-white">
      <div className="ambient-orb ambient-orb--primary" />
      <div className="ambient-orb ambient-orb--secondary" />
      <AppHeader />

      <section className="relative mx-auto flex min-h-screen w-full max-w-lg flex-col justify-center px-6 pb-36 pt-28">
        <div className="pointer-events-none absolute left-[-5rem] top-[24%] h-64 w-64 rounded-full bg-[rgba(199,153,255,0.1)] blur-[100px]" />
        <div className="pointer-events-none absolute bottom-[22%] right-[-5rem] h-64 w-64 rounded-full bg-[rgba(74,248,227,0.1)] blur-[100px]" />

        <div className="mb-4 text-center">
          <span className="inline-flex rounded-full border border-[rgba(199,153,255,0.2)] bg-[var(--surface-muted)] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--primary)]">
            {current.category?.name ?? nombreCategoria}
          </span>
        </div>

        <section className="mb-8 w-full">
          <div className="mb-3 flex items-end justify-between">
            <span className="font-headline text-sm font-bold tracking-[0.06em] text-[var(--primary)]">
              Pregunta {index + 1}/{total}
            </span>
            <span className="text-sm font-bold text-[var(--secondary)]">
              {aciertos} aciertos
            </span>
          </div>
          <div className="rounded-full bg-[var(--surface-strong)] p-0.5">
            <div className="h-2 rounded-full bg-[var(--surface-elevated)]">
              <div
                className="h-2 rounded-full bg-[var(--secondary)] shadow-[0_0_15px_rgba(74,248,227,0.45)] transition-all duration-500"
                style={{ width: `${progreso}%` }}
              />
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="absolute inset-0 translate-y-4 scale-95 rounded-[1.75rem] bg-[rgba(199,153,255,0.08)] blur-2xl" />
          <article className="glass-panel relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[1.75rem] p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(199,153,255,0.04)] via-transparent to-[rgba(74,248,227,0.04)]" />
            <div className="relative z-10">
              <h1 className="font-headline mt-2 text-2xl font-bold leading-tight tracking-[-0.03em] text-white sm:text-[2rem]">
                &quot;{current.statement}&quot;
              </h1>
            </div>
            <div className="relative z-10 mt-8 flex justify-end">
              <div className="flex h-24 w-24 items-end justify-end text-6xl text-[rgba(199,153,255,0.38)]">
                ◌
              </div>
            </div>
          </article>
        </section>

        <section className="mt-10 grid w-full grid-cols-2 gap-4">
          <button
            onClick={() => handleAnswer("Real")}
            className="group relative block h-24 cursor-pointer active:scale-[0.98]"
          >
            <div className="absolute inset-0 rounded-xl bg-[rgba(74,248,227,0.18)] opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
            <div className="relative flex h-full w-full flex-col items-center justify-center rounded-xl border border-[rgba(74,248,227,0.3)] bg-[rgba(0,106,96,0.42)]">
              <span className="font-headline text-xl font-black tracking-[-0.04em] text-[var(--secondary)]">
                REAL
              </span>
              <span className="mt-1 text-[var(--secondary)]/70">✓</span>
            </div>
          </button>

          <button
            onClick={() => handleAnswer("Inventado")}
            className="group relative block h-24 cursor-pointer active:scale-[0.98]"
          >
            <div className="absolute inset-0 rounded-xl bg-[rgba(255,110,132,0.18)] opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
            <div className="relative flex h-full w-full flex-col items-center justify-center rounded-xl border border-[rgba(255,110,132,0.28)] bg-[rgba(167,1,56,0.34)]">
              <span className="font-headline text-xl font-black tracking-[-0.04em] text-[rgb(255,178,185)]">
                INVENTADO
              </span>
              <span className="mt-1 text-[rgb(255,178,185)]/70">✦</span>
            </div>
          </button>
        </section>
      </section>

      <BottomNav active="jugar" />
    </main>
  );
}