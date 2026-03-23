import { test, expect } from "@playwright/test";

// Helper para iniciar sesión antes de cada test
async function login(page: any) {
  await page.goto("/");
  await page.getByLabel("Usuario o Email").fill("yo");
  await page.getByLabel("Contraseña").fill("rootroot");
  await page.getByRole("button", { name: "Entrar" }).click();
  await page.waitForURL("/temas");
}

test.describe("Temas", () => {
  test("muestra las categorías desde la base de datos", async ({ page }) => {
    await login(page);
    await expect(page.getByText("EXPLORA LA DUDA")).toBeVisible();
    await expect(page.getByText("Ciencia")).toBeVisible();
    await expect(page.getByText("Historia")).toBeVisible();
    await expect(page.getByText("Tecnología")).toBeVisible();
    await expect(page.getByText("Entretenimiento")).toBeVisible();
    await expect(page.getByText("Todas las Categorias")).toBeVisible();
  });

  test("navega a /jugar al seleccionar una categoría", async ({ page }) => {
    await login(page);
    await page.getByText("Historia").click();
    await expect(page).toHaveURL(/\/jugar/);
  });
});

test.describe("Jugar", () => {
  test("muestra una pregunta al entrar al juego", async ({ page }) => {
    await login(page);
    await page.goto("/jugar?categoria=todas&nombre=Todas+las+Categorias");
    await expect(page.getByText("Pregunta 1/")).toBeVisible();
    await expect(page.getByRole("button", { name: "REAL" })).toBeVisible();
    await expect(page.getByRole("button", { name: "INVENTADO" })).toBeVisible();
  });

  test("muestra feedback después de responder", async ({ page }) => {
    await login(page);
    await page.goto("/jugar?categoria=todas&nombre=Todas+las+Categorias");
    await page.waitForSelector("button:has-text('REAL')");
    await page.getByRole("button", { name: "REAL" }).click();
    // Debe mostrar feedback (acertaste o fallaste)
    const acerto = page.getByText("¡ACERTASTE!");
    const fallo = page.getByText("FALLASTE");
    await expect(acerto.or(fallo)).toBeVisible();
  });

  test("avanza a la siguiente pregunta con el botón Siguiente", async ({ page }) => {
    await login(page);
    await page.goto("/jugar?categoria=todas&nombre=Todas+las+Categorias");
    await page.waitForSelector("button:has-text('REAL')");
    await page.getByRole("button", { name: "REAL" }).click();
    await page.getByRole("button", { name: /Siguiente/i }).click();
    await expect(page.getByText("Pregunta 2/")).toBeVisible();
  });

  test("muestra pantalla final al terminar todas las preguntas", async ({ page }) => {
    await login(page);
    await page.goto("/jugar?categoria=todas&nombre=Todas+las+Categorias");

    // Responde todas las preguntas
    for (let i = 0; i < 5; i++) {
      await page.waitForSelector("button:has-text('REAL')");
      await page.getByRole("button", { name: "REAL" }).click();
      const nextBtn = page.getByRole("button", { name: /Siguiente|Ver resultado/i });
      await nextBtn.click();
    }

    await expect(page.getByText("¡COMPLETADO!")).toBeVisible();
    await expect(page.getByRole("button", { name: "Jugar de nuevo" })).toBeVisible();
  });
});