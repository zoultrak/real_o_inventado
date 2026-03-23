import { createQuestion, deleteQuestion, updateQuestion, getQuestionById } from "../app/actions/questions-admin";
import { prisma } from "../../lib/prisma";

jest.mock("../../lib/prisma", () => ({
  prisma: {
    question: {
      create: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    answer: {
      findMany: jest.fn(),
      update: jest.fn(),
    },
  },
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

const prismaMock = prisma as jest.Mocked<typeof prisma>;

describe("createQuestion", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("crea una pregunta con sus dos respuestas", async () => {
    const mockQuestion = { id: 1, statement: "Test", category_id: 1 };
    (prismaMock.question.create as jest.Mock).mockResolvedValue(mockQuestion);

    const result = await createQuestion({
      category_id: 1,
      statement: "Test pregunta",
      explanation: "Test explicación",
      correct: "Real",
      is_active: true,
    });

    expect(prismaMock.question.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          statement: "Test pregunta",
          explanation: "Test explicación",
          is_active: true,
          answers: {
            create: [
              { answer_text: "Real", is_correct: true },
              { answer_text: "Inventado", is_correct: false },
            ],
          },
        }),
      })
    );
    expect(result).toEqual(mockQuestion);
  });

  it("marca Inventado como correcta cuando se selecciona", async () => {
    (prismaMock.question.create as jest.Mock).mockResolvedValue({ id: 2 });

    await createQuestion({
      category_id: 1,
      statement: "Test",
      explanation: "Test",
      correct: "Inventado",
      is_active: true,
    });

    expect(prismaMock.question.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          answers: {
            create: [
              { answer_text: "Real", is_correct: false },
              { answer_text: "Inventado", is_correct: true },
            ],
          },
        }),
      })
    );
  });

  it("lanza error si la DB falla al crear", async () => {
    (prismaMock.question.create as jest.Mock).mockRejectedValue(
      new Error("DB error")
    );

    await expect(
      createQuestion({
        category_id: 1,
        statement: "Test",
        explanation: "Test",
        correct: "Real",
        is_active: true,
      })
    ).rejects.toThrow("DB error");
  });
});

describe("deleteQuestion", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("hace soft delete cambiando is_active a false", async () => {
    (prismaMock.question.update as jest.Mock).mockResolvedValue({ id: 1, is_active: false });

    await deleteQuestion(1);

    expect(prismaMock.question.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { is_active: false },
    });
  });

  it("llama con el id correcto", async () => {
    (prismaMock.question.update as jest.Mock).mockResolvedValue({ id: 42, is_active: false });

    await deleteQuestion(42);

    expect(prismaMock.question.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 42 } })
    );
  });
});

describe("getQuestionById", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("devuelve la pregunta con su categoría y respuestas", async () => {
    const mockQuestion = {
      id: 1,
      statement: "Test",
      category: { name: "Ciencia" },
      answers: [{ answer_text: "Real", is_correct: true }],
    };
    (prismaMock.question.findUnique as jest.Mock).mockResolvedValue(mockQuestion);

    const result = await getQuestionById(1);

    expect(prismaMock.question.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { category: true, answers: true },
    });
    expect(result).toEqual(mockQuestion);
  });

  it("devuelve null si la pregunta no existe", async () => {
    (prismaMock.question.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await getQuestionById(999);

    expect(result).toBeNull();
  });
});

describe("updateQuestion", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("actualiza los campos de la pregunta", async () => {
    (prismaMock.question.update as jest.Mock).mockResolvedValue({ id: 1 });
    (prismaMock.answer.findMany as jest.Mock).mockResolvedValue([
      { id: 1, answer_text: "Real" },
      { id: 2, answer_text: "Inventado" },
    ]);
    (prismaMock.answer.update as jest.Mock).mockResolvedValue({});

    await updateQuestion(1, {
      category_id: 2,
      statement: "Nuevo enunciado",
      explanation: "Nueva explicación",
      correct: "Inventado",
      is_active: true,
    });

    expect(prismaMock.question.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        category_id: 2,
        statement: "Nuevo enunciado",
        explanation: "Nueva explicación",
        is_active: true,
      },
    });
  });

  it("actualiza correctamente cuál respuesta es la correcta", async () => {
    (prismaMock.question.update as jest.Mock).mockResolvedValue({ id: 1 });
    (prismaMock.answer.findMany as jest.Mock).mockResolvedValue([
      { id: 1, answer_text: "Real" },
      { id: 2, answer_text: "Inventado" },
    ]);
    (prismaMock.answer.update as jest.Mock).mockResolvedValue({});

    await updateQuestion(1, {
      category_id: 1,
      statement: "Test",
      explanation: "Test",
      correct: "Inventado",
      is_active: true,
    });

    expect(prismaMock.answer.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { is_correct: false },
    });
    expect(prismaMock.answer.update).toHaveBeenCalledWith({
      where: { id: 2 },
      data: { is_correct: true },
    });
  });
});