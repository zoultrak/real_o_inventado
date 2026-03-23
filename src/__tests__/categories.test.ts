import { getCategories } from "../app/actions/categories";
import { prisma } from "../../lib/prisma";

// Mock de Prisma para no tocar la DB real en tests unitarios
jest.mock("../../lib/prisma", () => ({
  prisma: {
    category: {
      findMany: jest.fn(),
    },
  },
}));

const prismaMock = prisma as jest.Mocked<typeof prisma>;

describe("getCategories", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("devuelve lista de categorías activas", async () => {
    const mockCategories = [
      { id: 1, name: "Ciencia", description: "Datos científicos", is_active: true, created_at: new Date() },
      { id: 2, name: "Historia", description: "Eventos históricos", is_active: true, created_at: new Date() },
    ];

    (prismaMock.category.findMany as jest.Mock).mockResolvedValue(mockCategories);

    const result = await getCategories();

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("Ciencia");
    expect(result[1].name).toBe("Historia");
  });

  it("llama a findMany con filtro is_active true", async () => {
    (prismaMock.category.findMany as jest.Mock).mockResolvedValue([]);

    await getCategories();

    expect(prismaMock.category.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { is_active: true },
      })
    );
  });

  it("devuelve array vacío si no hay categorías", async () => {
    (prismaMock.category.findMany as jest.Mock).mockResolvedValue([]);

    const result = await getCategories();

    expect(result).toHaveLength(0);
    expect(Array.isArray(result)).toBe(true);
  });

  it("lanza error si la base de datos falla", async () => {
    (prismaMock.category.findMany as jest.Mock).mockRejectedValue(
      new Error("DB connection failed")
    );

    await expect(getCategories()).rejects.toThrow("DB connection failed");
  });
});