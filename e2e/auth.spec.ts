import { test, expect } from "@playwright/test";

test.describe("Autenticación", () => {
  test("muestra la pantalla de login correctamente", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("¿REAL O INVENTADO?")).toBeVisible();
    await expect(page.getByLabel("Usuario o Email")).toBeVisible();
    await expect(page.getByLabel("Contraseña")).toBeVisible();
    await expect(page.getByRole("button", { name: "Entrar" })).toBeVisible();
  });

  test("muestra error con credenciales incorrectas", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Usuario o Email").fill("usuario_falso");
    await page.getByLabel("Contraseña").fill("password_falso");
    await page.getByRole("button", { name: "Entrar" }).click();
    await expect(page.getByText("Usuario o contraseña incorrectos")).toBeVisible();
  });

  test("login exitoso redirige a /temas", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Usuario o Email").fill("yo");
    await page.getByLabel("Contraseña").fill("rootroot");
    await page.getByRole("button", { name: "Entrar" }).click();
    await expect(page).toHaveURL("/temas");
    await expect(page.getByText("EXPLORA LA DUDA")).toBeVisible();
  });

  test("redirige a login si no está autenticado", async ({ page }) => {
    await page.goto("/temas");
    await expect(page).toHaveURL("/");
  });

  test("muestra la página de registro", async ({ page }) => {
    await page.goto("/registro");
    await expect(page.getByText("REGISTRO")).toBeVisible();
    await expect(page.getByLabel("Usuario")).toBeVisible();
    await expect(page.getByLabel("Correo")).toBeVisible();
    await expect(page.getByLabel("Contraseña")).toBeVisible();
  });
});