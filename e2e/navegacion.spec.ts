import { test, expect } from "@playwright/test";

async function login(page: any) {
  await page.goto("/");
  await page.getByLabel("Usuario o Email").fill("yo");
  await page.getByLabel("Contraseña").fill("rootroot");
  await page.getByRole("button", { name: "Entrar" }).click();
  await page.waitForURL("/temas");
}

test.describe("Navegación", () => {
  test("bottom nav muestra los 3 links correctos", async ({ page }) => {
    await login(page);
    await page.goto("/temas");
    await expect(page.getByRole("link", { name: /Jugar/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Temas/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Records/ })).toBeVisible();
  });

  test("navega a /records desde el bottom nav", async ({ page }) => {
    await login(page);
    await page.goto("/temas");
    await page.getByRole("link", { name: /Records/ }).click();
    await expect(page).toHaveURL("/records");
    // FIX: usar getByRole("heading") para evitar ambigüedad con el link del nav
    await expect(page.getByRole("heading", { name: "RECORDS" })).toBeVisible();
  });

  test("navega a /perfil desde el header", async ({ page }) => {
    await login(page);
    await page.goto("/temas");
    await page.locator("details summary").click();
    await page.getByRole("link", { name: "Ver perfil" }).click();
    await expect(page).toHaveURL("/perfil");
    await expect(page.getByRole("heading", { name: "TU PERFIL" })).toBeVisible();
  });

  test("cerrar sesión redirige a la página de login", async ({ page }) => {
    await login(page);
    await page.goto("/temas");
    await page.locator("details summary").click();
    await page.getByRole("button", { name: "Cerrar sesion" }).click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("Perfil", () => {
  test("muestra los datos del usuario", async ({ page }) => {
    await login(page);
    await page.goto("/perfil");
    await expect(page.getByRole("heading", { name: "TU PERFIL" })).toBeVisible();
    await expect(page.getByText("Actualizar usuario")).toBeVisible();
    await expect(page.getByText("Eliminar usuario")).toBeVisible();
  });
});