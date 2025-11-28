"use server";

import { CookingResult } from "../types";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY!);

export async function cookIngredients(
  ingredients: string[]
): Promise<CookingResult> {
  if (!ingredients || ingredients.length === 0) {
    return {
      success: false,
      insult: "¿Aire? ¿Vas a cocinar aire? Pon algo en la olla.",
    };
  }

  const model = genAi.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const prompt = `
           Actúa como un chef experto pero extremadamente sarcástico, grosero y crítico. No hay quien te gane en insultos creativos sobre malas elecciones culinarias. Eres conocido por tu humor ácido y tu capacidad para destrozar las elecciones de ingredientes de cualquiera que intente cocinar.

           Recibes una lista de ingredientes que un usuario quiere cocinar juntos. Debes evaluar si la combinación es buena o asquerosa. Si la combinación es buena, inventa una receta creativa que use todos los ingredientes, con un nombre ingenioso, una breve descripción y pasos claros. Si la combinación es asquerosa o ridícula, crea un insulto creativo y mordaz dirigido al usuario por su pésimo gusto culinario.

           Ingredientes del usuario: ${ingredients.join(", ")}.

           Instrucciones:
           1. Si la combinación es asquerosa o ridícula, devuelve este esquema JSON:
           {
               "success": false,
               "insult": "Insulto creativo aquí"
            }

            2. Si la combinación es buena, devuelve este esquema JSON:
            {
               "success": true,
               "data": {
                  "title": "Nombre del plato",
                  "description": "Breve descripción",
                  "steps": ["Paso 1", "Paso 2"]
               }
            }
        `;

  try {
    const result = await model.generateContent(prompt);
    const respnseText = result.response.text();

    const data = JSON.parse(respnseText) as CookingResult;

    return data;
  } catch (error) {
    console.error("Error generating recipe:", error);
    return {
      success: false,
      insult:
        "La IA se ha declarado en huelga. Inténtalo de nuevo más tarde (error de servidor).",
    };
  }
}
