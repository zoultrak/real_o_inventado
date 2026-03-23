"use server";

import { prisma } from "@/lib/prisma";

export async function getQuestionsByCategory(categoryId: string, limit = 5) {
  const where =
    categoryId === "todas"
      ? { is_active: true }
      : { is_active: true, category_id: parseInt(categoryId) };

  const questions = await prisma.question.findMany({
    where,
    include: { answers: true, category: true },
  });

  // Mezclar aleatoriamente y tomar solo `limit`
  const shuffled = questions.sort(() => Math.random() - 0.5).slice(0, limit);
  return shuffled;
}