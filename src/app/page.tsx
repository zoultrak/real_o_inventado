"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const utilityLinks = [
  { label: "Ayuda", icon: "?" },
  { label: "ES", icon: "◎" },
];

export default function Home() {
  const router = useRouter();
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      identity,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Usuario o contraseña incorrectos.");
    } else {
      router.push("/temas");
    }
  }

  return (
    <main className="grid-pattern relative flex min-h-screen flex-1 items-center justify-center overflow-x-hidden px-6 py-6">
      <div className="ambient-orb ambient-orb--primary" />
      <div className="ambient-orb ambient-orb--secondary" />

      <div className="fixed top-20 right-[15%] hidden opacity-20 lg:block">
        <div className="outline-panel flex h-24 w-24 rotate-12 items-center justify-center rounded-[1.75rem]">
          <span className="font-headline text-4xl font-bold text-[var(--secondary)]">?</span>
        </div>
      </div>

      <div className="fixed bottom-20 left-[15%] hidden opacity-20 lg:block">
        <div className="outline-panel outline-panel--primary flex h-32 w-32 -rotate-12 items-center justify-center rounded-[1.75rem]">
          <span className="font-headline text-5xl font-bold text-[var(--primary)]">!</span>
        </div>
      </div>

      <section className="w-full max-w-md space-y-12">
        <header className="space-y-4 text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-[color:rgba(199,153,255,0.2)] blur-2xl" />
            <h1 className="font-headline relative bg-gradient-to-r from-[var(--primary)] to-[var(--primary-strong)] bg-clip-text py-2 text-5xl font-black italic tracking-[-0.06em] text-transparent sm:text-6xl">
              ¿REAL O INVENTADO?
            </h1>
          </div>
          <p className="text-muted text-sm font-medium uppercase tracking-[0.22em]">
            Pon a prueba tu intuicion
          </p>
        </header>

        <section className="glass-panel relative overflow-hidden rounded-2xl p-8">
          <div className="absolute right-0 top-0 h-32 w-32 translate-x-16 -translate-y-16 rotate-[-45deg] rounded-full bg-[color:rgba(74,248,227,0.05)]" />

          <form onSubmit={handleLogin} className="relative z-10 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="identity"
                  className="block px-1 text-xs font-bold uppercase tracking-[0.28em] text-[var(--primary)]"
                >
                  Usuario o Email
                </label>
                <div className="field-shell surface-elevated rounded-xl p-1">
                  <input
                    id="identity"
                    type="text"
                    placeholder="maestro_trivia"
                    value={identity}
                    onChange={(e) => setIdentity(e.target.value)}
                    className="w-full rounded-md border-none bg-transparent px-4 py-4 text-white outline-none placeholder:text-white/35"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block px-1 text-xs font-bold uppercase tracking-[0.28em] text-[var(--primary)]"
                >
                  Contraseña
                </label>
                <div className="field-shell surface-elevated rounded-xl p-1">
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border-none bg-transparent px-4 py-4 text-white outline-none placeholder:text-white/35"
                    required
                  />
                </div>
              </div>
            </div>

            {error && (
              <p className="rounded-lg bg-[rgba(167,1,56,0.22)] px-4 py-3 text-sm font-semibold text-[rgb(255,178,185)]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary font-headline flex w-full items-center justify-center rounded-md py-4 text-lg font-extrabold active:scale-[0.985] disabled:opacity-60"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </section>

        <footer className="space-y-6 text-center">
          <p className="text-muted text-sm">
            ¿No tienes cuenta?{" "}
            <a
              href="/registro"
              className="font-bold text-[var(--secondary)] underline decoration-[rgba(74,248,227,0.28)] underline-offset-4"
            >
              Registrate ahora
            </a>
          </p>

          <div className="flex items-center justify-center gap-8">
            {utilityLinks.map((link) => (
              <a
                key={link.label}
                href="#"
                className="soft-action inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-white/45"
              >
                <span className="text-base">{link.icon}</span>
                {link.label}
              </a>
            ))}
          </div>
        </footer>
      </section>
    </main>
  );
}