/* eslint-disable @next/next/no-img-element */
import { INGREDIENTS } from "../lib/consts/ingredients";

interface Props {
    id: string;
    isSelected: boolean;
    isIdle: boolean;
    onClick: (ingredient: (typeof INGREDIENTS)[0]) => void;
}

export const IngredientButton = ({id, isSelected, isIdle, onClick}: Props) => {
    const ingredient = INGREDIENTS.find((ing) => ing.id === id);
    if (!ingredient) return null;

    return (
        <button
              key={ingredient.id}
              onClick={() => onClick(ingredient)}
              disabled={!!isSelected || !isIdle}
              className={`p-2 transition-all cursor-pointer ${
                isSelected
                  ? "border-gray-300 opacity-40 grayscale"
                  : "border-orange-200 hover:border-orange-400 hover:scale-105"
              }`}
            >
              <img
                src={ingredient.image}
                alt={ingredient.name}
                className="w-full h-20 object-contain drop-shadow-lg"
              />
            </button>
    )
}
