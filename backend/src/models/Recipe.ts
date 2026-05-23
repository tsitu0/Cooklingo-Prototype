export type Recipe = {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  estimatedTime: number;
  xpReward: number;
  imageUrl: string;
  skills: string[];
  ingredients: string[];
  steps: string[];
};
