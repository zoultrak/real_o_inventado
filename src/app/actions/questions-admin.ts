"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getQuestions(search?: string, categoryId?: string) {
  const questions = await prisma.question.findMany({
    where: {
      is_active: true,
      ...(categoryId && categoryId !== "todas"
        ? { category_id: parseInt(categoryId) }
        : {}),
      ...(search
        ? {
            OR: [
              { statement: { contains: search } },
            ],
          }
        : {}),
    },
    include: {
      category: true,
      answers: true,
    },
    orderBy: { created_at: "desc" },
  });
  return questions;
}

export async function getQuestionById(id: number) {
  return await prisma.question.findUnique({
    where: { id },
    include: {
      category: true,
      answers: true,
    },
  });
}

export async function createQuestion(data: {
  category_id: number;
  statement: string;
  explanation: string;
  correct: "Real" | "Inventado";
  is_active: boolean;
}) {
  const question = await prisma.question.create({
    data: {
      category_id: data.category_id,
      statement: data.statement,
      explanation: data.explanation,
      is_active: data.is_active,
      answers: {
        create: [
          { answer_text: "Real", is_correct: data.correct === "Real" },
          { answer_text: "Inventado", is_correct: data.correct === "Inventado" },
        ],
      },
    },
  });
  revalidatePath("/gestion");
  return question;
}

export async function updateQuestion(
  id: number,
  data: {
    category_id: number;
    statement: string;
    explanation: string;
    correct: "Real" | "Inventado";
    is_active: boolean;
  }
) {
  // Actualizar la pregunta
  await prisma.question.update({
    where: { id },
    data: {
      category_id: data.category_id,
      statement: data.statement,
      explanation: data.explanation,
      is_active: data.is_active,
    },
  });

  // Actualizar cuál respuesta es correcta
  const answers = await prisma.answer.findMany({
    where: { question_id: id },
  });

  for (const answer of answers) {
    await prisma.answer.update({
      where: { id: answer.id },
      data: { is_correct: answer.answer_text === data.correct },
    });
  }

  revalidatePath("/gestion");
  revalidatePath(`/gestion/editar/${id}`);
}

export async function deleteQuestion(id: number) {
  await prisma.question.update({
    where: { id },
    data: { is_active: false },
  });
  revalidatePath("/gestion");
}