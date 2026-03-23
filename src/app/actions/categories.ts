"use server";

import { prisma } from "@/lib/prisma";

export async function getCategories() {
  const categories = await prisma.category.findMany({
    where: { is_active: true },
    orderBy: { name: "asc" },
  });
  return categories;
}