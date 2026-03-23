import Link from "next/link";

type NavKey = "jugar" | "temas" | "records";

const items: { key: NavKey; label: string; icon: string; href: string }[] = [
  { key: "jugar", label: "Jugar", icon: "▶", href: "/jugar" },
  { key: "temas", label: "Temas", icon: "◫", href: "/temas" },
  { key: "records", label: "Records", icon: "★", href: "/records" },
];

export function BottomNav({ active }: { active?: NavKey }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 bg-[rgba(26,26,26,0.82)] backdrop-blur-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="mx-auto flex h-24 w-full max-w-3xl items-center justify-around rounded-t-[2.5rem] px-4">
        {items.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={
              item.key === active
                ? "flex flex-col items-center justify-center rounded-2xl bg-[rgba(74,248,227,0.1)] px-5 py-2 text-[var(--secondary)]"
                : "flex flex-col items-center justify-center text-neutral-400 opacity-60 transition-colors hover:text-[var(--primary)]"
            }
          >
            <span className="mb-1">{item.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.22em]">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
