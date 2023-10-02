import {Named, RefKey} from "../shared/types";

export interface Meal extends Named {
   ingredients: Ingredient[];
}

export type MealResponse = Meal & RefKey;

export interface Ingredient {
   ingredient: string;
   calories: number;
}
