
export interface Recipe {
    title: string;
    description: string;
    steps: string[];
}

export interface CookingResult {
    success: boolean; // true = recipe, false = explosion
    data?: Recipe;
    insult?: string;
}

export type CookingState = "idle" | "cooking" | "success" | "exploded";
