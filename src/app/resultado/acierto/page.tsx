"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AppHeader } from "../../components/AppHeader";
import { BottomNav } from "../../components/BottomNav";

export default function ResultadoAciertoPage() {
  const searchParams = useSearchParams();
  const aciertos = searchParams.get("aciertos") ?? "0";
  const total = searchParams.get("total") ?? "0";
  const fin = searchParams.get("fin") === "true";
  const categoria = searchParams.get("categoria") ?? "todas";
  const nombre = searchParams.get("nombre") ?? "General";
  const puntos = parseInt(aciertos) * 100;

  const stats = [
    { label: "Puntos", value: `+${puntos}`, tone: "text-white" },
    { label: "Aciertos", value: `${aciertos}/${total}`, tone: "text-[var(--tertiary)]" },
  ];

  return (
    <main className="grid-pattern relative min-h-screen overflow-x-hidden bg-[var(--background)] text-white">
      <div className="ambient-orb ambient-orb--primary" />
      <div className="ambient-orb ambient-orb--secondary" />
      <AppHeader />

      <section className="relative mx-auto flex min-h-screen w-full max-w-2xl flex-col px-6 pb-32 pt-28">
        <div className="relative mb-8 text-center">
          <div className="absolute -left-8 -top-12 h-44 w-44 rounded-full bg-[rgba(199,153,255,0.18)] blur-[80px]" />
          <div className="absolute -bottom-12 -right-8 h-44 w-44 rounded-full bg-[rgba(74,248,227,0.12)] blur-[80px]" />

          <div className="relative flex flex-col items-center space-y-3">
            {!fin && (
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(74,248,227,0.2)] bg-[rgba(74,248,227,0.1)] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--secondary)]">
                ✦ ¡Correcto!
              </span>
            )}
            {fin && (
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(74,248,227,0.2)] bg-[rgba(74,248,227,0.1)] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--secondary)]">
                ✦ Partida terminada
              </span>
            )}
            <h2 className="font-headline text-5xl font-black italic leading-none tracking-[-0.08em] sm:text-7xl">
              {fin ? "¡COMPLETADO!" : "¡ACERTASTE!"}
            </h2>
            <div className="h-2 w-24 rounded-full bg-gradient-to-r from-[var(--secondary)] to-transparent" />
          </div>
        </div>

        <section className="space-y-6">
          <div className="glass-panel rounded-[1.75rem] border-l-4 border-[var(--secondary)] p-8">
            <h3 className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[var(--secondary)]">
              {fin ? "Resultado final" : "¡Sigue así!"}
            </h3>
            <p className="text-sm font-medium leading-relaxed text-[var(--text-muted)]">
              {fin
                ? `Terminaste la partida con ${aciertos} de ${total} respuestas correctas. ¡Bien hecho!`
                : "Vas por buen camino. Siguiente pregunta cuando estés listo."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
            {fin ? (
              <>
                <Link
                  href={`/jugar?categoria=${categoria}&nombre=${encodeURIComponent(nombre)}`}
                  className="btn-primary font-headline flex items-center justify-center gap-3 rounded-md px-8 py-5 text-lg font-black uppercase tracking-[-0.03em]"
                >
                  Jugar de nuevo
                </Link>
                <Link
                  href="/temas"
                  className="flex items-center justify-center gap-3 rounded-md border border-white/10 bg-[var(--surface-elevated)] px-8 py-5 text-lg font-black uppercase tracking-[-0.03em] text-white"
                >
                  Cambiar tema
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={`/jugar?categoria=${categoria}&nombre=${encodeURIComponent(nombre)}`}
                  className="btn-primary font-headline flex items-center justify-center gap-3 rounded-md px-8 py-5 text-lg font-black uppercase tracking-[-0.03em]"
                >
                  <span>Siguiente</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/temas"
                  className="flex items-center justify-center gap-3 rounded-md border border-white/10 bg-[var(--surface-elevated)] px-8 py-5 text-lg font-black uppercase tracking-[-0.03em] text-white"
                >
                  Salir
                </Link>
              </>
            )}
          </div>
        </section>

        <section className="mt-12 flex items-center justify-center gap-6 opacity-70 sm:gap-8">
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex items-center gap-6 sm:gap-8">
              <div className="flex flex-col items-center">
                <span className={`text-2xl font-black ${stat.tone}`}>{stat.value}</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/55">
                  {stat.label}
                </span>
              </div>
              {index < stats.length - 1 ? <div className="h-8 w-px bg-white/10" /> : null}
            </div>
          ))}
        </section>
      </section>

      <BottomNav active="jugar" />
    </main>
  );
}