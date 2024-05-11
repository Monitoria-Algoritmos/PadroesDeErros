type ChallengeType = {
  id: number;
  title: string;
  description: string;
  code: string;
  alternatives: string[];
  answer_alternative: number;
  answer_description: string;
  difficulty: "Fácil" | "Médio" | "Difícil";
  type: "Léxico" | "Sintático" | "Semântico";
};
