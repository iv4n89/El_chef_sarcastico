/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cookIngredients } from "../lib/actions/actions";
import { INGREDIENTS } from "../lib/consts/ingredients";
import { CookingState } from "../lib/types";
import { ButtonAction } from "./ButtonAction";
import { IngredientButton } from "./IngredientButton";
import { NoMoreIngredients } from "./NoMoreIngredients";
import { Pot } from "./Pot";
import { Result } from "./Result";
import { SelectedIngredients } from "./SelectedIngredients";

export default function CookingApp() {
  const [selectedIngredients, setSelectedIngredients] = useState<
    typeof INGREDIENTS
  >([]);
  const [seenIds, setSeenIds] = useState<string[]>([]);
  const [currentOptions, setCurrentOptions] = useState<typeof INGREDIENTS>([]);
  const [cookingState, setCookingState] = useState<CookingState>("idle");
  const [result, setResult] = useState<any>(null);

  const pickOptions = (currentSeen: string[]) => {
    const available = INGREDIENTS.filter((i) => !currentSeen.includes(i.id));
    if (available.length === 0) {
      setCurrentOptions([]);
      return;
    }
    const shuffled = [...available].sort(() => 0.5 - Math.random());
    setCurrentOptions(shuffled.slice(0, 3));
  };

  useEffect(() => {
    const timer = setTimeout(() => pickOptions([]), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (ingredient: (typeof INGREDIENTS)[0]) => {
    if (cookingState !== "idle") return;

    // Add to selected
    const newSelected = [...selectedIngredients, ingredient];
    setSelectedIngredients(newSelected);

    // Mark current options as seen (so they don't appear again)
    const currentIds = currentOptions.map((i) => i.id);
    const newSeen = [...seenIds, ...currentIds];
    setSeenIds(newSeen);

    // Pick new options
    pickOptions(newSeen);
  };

  const handleCook = async () => {
    if (selectedIngredients.length === 0) return;
    setCookingState("cooking");
    setResult(null);

    const ingredientIds = selectedIngredients.map((ing) => ing.id);

    try {
      const cookResult = await cookIngredients(ingredientIds);
      if (cookResult.success) {
        setCookingState("success");
        setResult(cookResult);
      } else {
        setCookingState("exploded");
        setResult(cookResult);
      }
    } catch {
      setCookingState("exploded");
      setResult({
        success: false,
        insult: "Error al cocinar los ingredientes.",
      });
    }
  };

  const reset = () => {
    setCookingState("idle");
    setResult(null);
    setSelectedIngredients([]);
    setSeenIds([]);
    pickOptions([]);
  };

  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-amber-50 overflow-x-hidden">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        El Chef Sarcástico
      </h1>

      {/* --- INGREDIENT SELECTION --- */}
      <div className="flex gap-4 relative z-50 min-h-[100px]">
        <AnimatePresence mode="wait">
          {currentOptions.length > 0 ? (
            currentOptions.map((ing) => (
              <motion.div
                key={ing.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <IngredientButton
                  id={ing.id}
                  isSelected={false}
                  isIdle={cookingState === "idle"}
                  onClick={handleSelect}
                />
              </motion.div>
            ))
          ) : (
            <NoMoreIngredients />
          )}
        </AnimatePresence>
      </div>

      <Pot cookingState={cookingState} setCookingState={setCookingState} />

      {/* --- Selected Ingredients --- */}
      <div className="mb-6">
        <AnimatePresence>
          {selectedIngredients.length > 0 && (
            <SelectedIngredients selectedIngredients={selectedIngredients} />
          )}
        </AnimatePresence>
      </div>

      {/* --- Action Button --- */}
      <ButtonAction
        cookingState={cookingState}
        selectedIngredientsCount={selectedIngredients.length}
        handleCook={handleCook}
      />

      {/* --- RESULT --- */}
      <Result
        cookingState={cookingState}
        reset={reset}
        result={result}
        selectedIngredients={selectedIngredients}
      />
    </div>
  );
}
