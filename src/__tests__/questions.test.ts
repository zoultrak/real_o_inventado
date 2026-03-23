import { getQuestionsByCategory } from "../app/actions/questions";
import { prisma } from "../../lib/prisma";

jest.mock("../../lib/prisma", () => ({
  prisma: {
    question: {
      findMany: jest.fn(),
    },
  },
}));

const prismaMock = prisma as jest.Mocked<typeof prisma>;

const mockQuestions = [
  {
    id: 1,
    statement: "Las hormigas toman micro-siestas.",
    explanation: "Descansan en pausas cortas.",
    category_id: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
    difficulty: "medium" as const,
    created_by: null,
    category: { id: 1, name: "Ciencia", description: null, is_active: true, created_at: new Date() },
    answers: [
      { id: 1, question_id: 1, answer_text: "Real", is_correct: true, created_at: new Date(), updated_at: new Date() },
      { id: 2, question_id: 1, answer_text: "Inventado", is_correct: false, created_at: new Date(), updated_at: new Date() },
    ],
  },
  {
    id: 2,
    statement: "Napoleón fue coronado en una pirámide.",
    explanation: "Fue en Notre Dame.",
    category_id: 3,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
    difficulty: "medium" as const,
    created_by: null,
    category: { id: 3, name: "Historia", description: null, is_active: true, created_at: new Date() },
    answers: [
      { id: 3, question_id: 2, answer_text: "Real", is_correct: false, created_at: new Date(), updated_at: new Date() },
      { id: 4, question_id: 2, answer_text: "Inventado", is_correct: true, created_at: new Date(), updated_at: new Date() },
    ],
  },
];

describe("getQuestionsByCategory", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("devuelve preguntas de todas las categorías cuando se pasa 'todas'", async () => {
    (prismaMock.question.findMany as jest.Mock).mockResolvedValue(mockQuestions);

    const result = await getQuestionsByCategory("todas");

    expect(prismaMock.question.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { is_active: true },
      })
    );
    expect(result.length).toBeGreaterThan(0);
  });

  it("filtra por category_id cuando se pasa un id específico", async () => {
    (prismaMock.question.findMany as jest.Mock).mockResolvedValue([mockQuestions[0]]);

    await getQuestionsByCategory("1");

    expect(prismaMock.question.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { is_active: true, category_id: 1 },
      })
    );
  });

  it("limita el número de preguntas al límite indicado", async () => {
    (prismaMock.question.findMany as jest.Mock).mockResolvedValue(mockQuestions);

    const result = await getQuestionsByCategory("todas", 1);

    expect(result.length).toBeLessThanOrEqual(1);
  });

  it("devuelve array vacío si no hay preguntas", async () => {
    (prismaMock.question.findMany as jest.Mock).mockResolvedValue([]);

    const result = await getQuestionsByCategory("todas");

    expect(result).toHaveLength(0);
  });

  it("incluye answers y category en el resultado", async () => {
    (prismaMock.question.findMany as jest.Mock).mockResolvedValue(mockQuestions);

    const result = await getQuestionsByCategory("todas", 10);

    expect(prismaMock.question.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        include: expect.objectContaining({
          answers: true,
          category: true,
        }),
      })
    );
  });
});