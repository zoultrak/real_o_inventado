import { test, expect } from "@playwright/test";

async function loginAdmin(page: any) {
  await page.goto("/");
  await page.getByLabel("Usuario o Email").fill("yo");
  await page.getByLabel("Contraseña").fill("rootroot");
  await page.getByRole("button", { name: "Entrar" }).click();
  await page.waitForURL("/temas");
}

test.describe("Gestión de preguntas", () => {
  test("admin puede acceder a /gestion", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/gestion");
    await expect(page.getByRole("heading", { name: "GESTION DE PREGUNTAS" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Añadir pregunta" })).toBeVisible();
  });

  test("muestra el listado de preguntas", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/gestion");
    await expect(page.locator("article").first()).toBeVisible();
  });

  test("puede navegar a crear nueva pregunta", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/gestion");
    await page.getByRole("link", { name: "Añadir pregunta" }).click();
    await expect(page).toHaveURL("/gestion/nueva");
    await expect(page.getByText("Crear pregunta y respuestas")).toBeVisible();
  });

  test("puede crear una nueva pregunta", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/gestion/nueva");
    await page.waitForSelector("textarea[name='statement']");

    await page.locator("textarea[name='statement']").fill("Test: Esta es una pregunta de prueba creada por Playwright.");
    await page.locator("textarea[name='explanation']").fill("Explicación de prueba para el test automatizado.");
    await page.locator("select[name='correct']").selectOption("Real");
    await page.getByRole("button", { name: "Guardar" }).click();

    await expect(page).toHaveURL("/gestion");
    await expect(page.getByText("Test: Esta es una pregunta de prueba")).toBeVisible();
  });

  test("puede editar una pregunta existente", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/gestion");
    await page.getByRole("link", { name: "Editar" }).first().click();
    // FIX: usar expect(page).toHaveURL() en lugar de expect(page.url())
    // para esperar la navegación correctamente
    await expect(page).toHaveURL(/\/gestion\/editar\//);
    await expect(page.getByText("Editar pregunta y respuestas")).toBeVisible();
  });

  test("puede eliminar una pregunta", async ({ page }) => {
    await loginAdmin(page);
    await page.goto("/gestion");
    const antes = await page.locator("article").count();

    page.on("dialog", (dialog) => dialog.accept());
    await page.locator("button:has-text('Eliminar')").first().click();

    await page.waitForTimeout(1500);
    const despues = await page.locator("article").count();
    expect(despues).toBeLessThan(antes);
  });
});