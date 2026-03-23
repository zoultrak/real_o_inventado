"use client";

import { deleteQuestion } from "../actions/questions-admin";

export function DeleteButton({ id }: { id: number }) {
  async function handleDelete() {
    if (!confirm("¿Seguro que quieres eliminar esta pregunta?")) return;
    await deleteQuestion(id);
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-md border border-[rgba(255,178,185,0.24)] bg-[rgba(167,1,56,0.22)] px-4 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-[rgb(255,178,185)]"
    >
      Eliminar
    </button>
  );
}