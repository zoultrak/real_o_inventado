"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export function AppHeader() {
  const { data: session } = useSession();

  const initials = session?.user?.name
    ? session.user.name.slice(0, 2).toUpperCase()
    : "??";

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[rgba(14,14,14,0.82)] shadow-[0_4px_30px_rgba(199,153,255,0.08)] backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/temas"
          className="font-headline bg-gradient-to-r from-[var(--primary)] to-[var(--primary-strong)] bg-clip-text text-xl font-black italic tracking-[-0.06em] text-transparent sm:text-2xl"
        >
          ¿REAL O INVENTADO?
        </Link>

        <details className="relative">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-white/10 bg-[var(--surface-elevated)] text-sm font-bold text-white marker:content-none">
            {initials}
          </summary>

          <div className="absolute right-0 top-14 w-48 overflow-hidden rounded-[1.25rem] border border-white/8 bg-[rgba(26,26,26,0.94)] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
            {session?.user?.name && (
              <p className="px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {session.user.name}
              </p>
            )}
            <Link
              href="/perfil"
              className="block rounded-[0.9rem] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5 hover:text-[var(--secondary)]"
            >
              Ver perfil
            </Link>
            {session?.user?.role === "admin" && (
              <Link
                href="/gestion"
                className="block rounded-[0.9rem] px-4 py-3 text-sm font-semibold text-[var(--primary)] transition-colors hover:bg-white/5"
              >
                Gestión
              </Link>
            )}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="block w-full rounded-[0.9rem] px-4 py-3 text-left text-sm font-semibold text-[rgb(255,178,185)] transition-colors hover:bg-[rgba(167,1,56,0.18)]"
            >
              Cerrar sesion
            </button>
          </div>
        </details>
      </div>

      <div className="h-4 w-full bg-gradient-to-b from-[var(--surface)] to-transparent" />
    </header>
  );
}