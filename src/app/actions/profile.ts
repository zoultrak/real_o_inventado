"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) redirect("/registro");

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const data: Record<string, string> = {};
  if (name?.trim()) data.name = name.trim();
  if (email?.trim()) data.email = email.trim();
  if (password?.trim()) {
    data.password = await hash(password.trim(), 10);
  }

  await prisma.user.update({
    where: { email: session.user.email },
    data,
  });

  redirect("/perfil");
}

export async function deleteAccount() {
  const session = await auth();
  if (!session?.user?.email) redirect("/registro");

  await prisma.user.delete({
    where: { email: session.user.email },
  });

  redirect("/registro");
}