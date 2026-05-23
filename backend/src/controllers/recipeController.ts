import { Request, Response } from "express";
import recipesData from "../data/recipes.json";
import { Recipe } from "../models/Recipe";

const recipes = recipesData as Recipe[];

export function getRecipes(req: Request, res: Response) {
  const { difficulty, skill, search } = req.query;
  let result = recipes;

  if (typeof difficulty === "string") {
    const value = difficulty.toLowerCase();
    result = result.filter(
      (recipe) => recipe.difficulty.toLowerCase() === value
    );
  }

  if (typeof skill === "string") {
    const value = skill.toLowerCase();
    result = result.filter((recipe) =>
      recipe.skills.some((s) => s.toLowerCase().includes(value))
    );
  }

  if (typeof search === "string") {
    const value = search.toLowerCase();
    result = result.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(value) ||
        recipe.description.toLowerCase().includes(value) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(value)
        )
    );
  }

  res.json(result);
}
