"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegistroPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Error al registrar.");
    } else {
      router.push("/");
    }
  }

  return (
    <main className="grid-pattern relative flex min-h-screen flex-1 items-center justify-center overflow-x-hidden px-6 py-6">
      <div className="ambient-orb ambient-orb--primary" />
      <div className="ambient-orb ambient-orb--secondary" />

      <section className="w-full max-w-md space-y-12">
        <header className="space-y-4 text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 rounded-full bg-[color:rgba(199,153,255,0.2)] blur-2xl" />
            <h1 className="font-headline relative bg-gradient-to-r from-[var(--primary)] to-[var(--primary-strong)] bg-clip-text py-2 text-5xl font-black italic tracking-[-0.06em] text-transparent sm:text-6xl">
              REGISTRO
            </h1>
          </div>
          <p className="text-muted text-sm font-medium uppercase tracking-[0.22em]">
            Crea tu cuenta gratis
          </p>
        </header>

        <section className="glass-panel relative overflow-hidden rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block px-1 text-xs font-bold uppercase tracking-[0.28em] text-[var(--primary)]"
                >
                  Usuario
                </label>
                <div className="field-shell surface-elevated rounded-xl p-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="maestro_trivia"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full rounded-md border-none bg-transparent px-4 py-4 text-white outline-none placeholder:text-white/35"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block px-1 text-xs font-bold uppercase tracking-[0.28em] text-[var(--primary)]"
                >
                  Correo
                </label>
                <div className="field-shell surface-elevated rounded-xl p-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@correo.com"
                    value={form.email}
                    onChange={handleChange}
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
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full rounded-md border-none bg-transparent px-4 py-4 text-white outline-none placeholder:text-white/35"
                    required
                    minLength={6}
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
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>
        </section>

        <footer className="text-center">
          <p className="text-muted text-sm">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/"
              className="font-bold text-[var(--secondary)] underline decoration-[rgba(74,248,227,0.28)] underline-offset-4"
            >
              Inicia sesion
            </Link>
          </p>
        </footer>
      </section>
    </main>
  );
}