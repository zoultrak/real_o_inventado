import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AppHeader } from "../components/AppHeader";
import { BottomNav } from "../components/BottomNav";
import { updateProfile, deleteAccount } from "../actions/profile";

export default async function PerfilPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/registro");
  }

  const { name, email, image } = session.user;

  // Genera iniciales para el avatar
  const initials = name
    ? name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : (email?.[0] ?? "?").toUpperCase();

  const accountStats = [
    { label: "Usuario", value: name ?? "—" },
    { label: "Correo", value: email ?? "—" },
    { label: "Estado", value: "Activo" },
  ];

  return (
    <main className="grid-pattern relative min-h-screen overflow-x-hidden bg-[var(--background)] text-white">
      <div className="ambient-orb ambient-orb--primary" />
      <div className="ambient-orb ambient-orb--secondary" />

      <AppHeader />

      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 pb-32 pt-28">
        <header className="mb-10 text-center">
          <h2 className="font-headline bg-gradient-to-r from-[var(--primary)] to-[var(--primary-strong)] bg-clip-text text-4xl font-black italic tracking-[-0.06em] text-transparent">
            TU PERFIL
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm font-medium uppercase tracking-[0.2em] text-[var(--text-muted)] opacity-80">
            Consulta tus datos, actualiza tu cuenta o elimina tu usuario.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_1.35fr]">
          {/* Tarjeta de info */}
          <article className="glass-panel relative overflow-hidden rounded-[1.75rem] p-8">
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-10 -translate-y-10 rounded-full bg-[rgba(199,153,255,0.1)] blur-xl" />

            <div className="relative z-10">
              <div className="mb-6 flex items-center gap-4">
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image}
                    alt={name ?? "Avatar"}
                    className="h-20 w-20 rounded-full border border-[rgba(199,153,255,0.25)] object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[rgba(199,153,255,0.25)] bg-[var(--surface-elevated)] text-2xl font-black text-[var(--primary)]">
                    {initials}
                  </div>
                )}
                <div>
                  <p className="font-headline text-2xl font-bold">
                    {name ?? "Sin nombre"}
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">Jugador</p>
                </div>
              </div>

              <div className="space-y-4">
                {accountStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1rem] border border-white/8 bg-[var(--surface-elevated)] px-4 py-4"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <div className="space-y-6">
            {/* Formulario de actualización */}
            <article className="glass-panel rounded-[1.75rem] p-8">
              <h3 className="mb-6 text-xs font-black uppercase tracking-[0.22em] text-[var(--secondary)]">
                Actualizar usuario
              </h3>

              <form action={updateProfile} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block px-1 text-xs font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
                      Nombre
                    </label>
                    <div className="field-shell surface-elevated rounded-xl p-1">
                      <input
                        type="text"
                        name="name"
                        defaultValue={name ?? ""}
                        className="w-full rounded-md border-none bg-transparent px-4 py-4 text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block px-1 text-xs font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
                      Correo
                    </label>
                    <div className="field-shell surface-elevated rounded-xl p-1">
                      <input
                        type="email"
                        name="email"
                        defaultValue={email ?? ""}
                        className="w-full rounded-md border-none bg-transparent px-4 py-4 text-white outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block px-1 text-xs font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
                    Nueva contraseña
                  </label>
                  <div className="field-shell surface-elevated rounded-xl p-1">
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className="w-full rounded-md border-none bg-transparent px-4 py-4 text-white outline-none placeholder:text-white/35"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary font-headline flex w-full items-center justify-center rounded-md py-4 text-lg font-extrabold"
                >
                  Guardar cambios
                </button>
              </form>
            </article>

            {/* Zona de peligro */}
            <article className="glass-panel rounded-[1.75rem] border-l-4 border-[rgb(255,178,185)] p-8">
              <h3 className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[rgb(255,178,185)]">
                Eliminar usuario
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-[var(--text-muted)]">
                Esta acción eliminará tu cuenta y todos sus datos asociados de
                forma permanente. No se puede deshacer.
              </p>

              <form action={deleteAccount}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <button
                    type="submit"
                    className="flex items-center justify-center rounded-md border border-[rgba(255,178,185,0.26)] bg-[rgba(167,1,56,0.24)] px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-[rgb(255,178,185)]"
                  >
                    Eliminar cuenta
                  </button>

                  <a
                    href="/temas"
                    className="flex items-center justify-center rounded-md border border-white/10 bg-[var(--surface-elevated)] px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-white"
                  >
                    Cancelar
                  </a>
                </div>
              </form>
            </article>
          </div>
        </section>
      </section>

      <BottomNav />
    </main>
  );
}