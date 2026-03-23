export type ManagedQuestion = {
  id: string;
  category: string;
  statement: string;
  explanation: string;
  answers: { label: string; correct: boolean }[];
  status: "Activa" | "Borrador";
};

export const categoryOptions = [
  "Todas las categorias",
  "Ciencia Natural",
  "Historia",
  "Tecnologia",
  "Pueblos del Mundo",
  "Cine y TV",
  "Comidas Exoticas",
  "Datos Curiosos",
];

export const managedQuestions: ManagedQuestion[] = [
  {
    id: "Q-08",
    category: "Ciencia Natural",
    statement:
      "Las hormigas no duermen en el sentido tradicional, sino que toman miles de micro-siestas.",
    explanation:
      "Las hormigas distribuyen su descanso en pausas muy cortas a lo largo del dia.",
    answers: [
      { label: "Real", correct: true },
      { label: "Inventado", correct: false },
    ],
    status: "Activa",
  },
  {
    id: "Q-14",
    category: "Historia",
    statement:
      "Napoleon fue coronado emperador dentro de una piramide egipcia.",
    explanation:
      "La afirmacion mezcla hechos historicos reales con un escenario inventado.",
    answers: [
      { label: "Real", correct: false },
      { label: "Inventado", correct: true },
    ],
    status: "Activa",
  },
  {
    id: "Q-21",
    category: "Tecnologia",
    statement:
      "El primer correo electronico se envio antes de que existiera la web.",
    explanation:
      "El correo electronico antecede por varios anos a la World Wide Web.",
    answers: [
      { label: "Real", correct: true },
      { label: "Inventado", correct: false },
    ],
    status: "Borrador",
  },
];
