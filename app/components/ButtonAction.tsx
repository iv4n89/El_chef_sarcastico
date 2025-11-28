import { motion } from "framer-motion";
import { CookingState } from "../lib/types";

interface Props {
  cookingState: CookingState;
  selectedIngredientsCount: number;
  handleCook: () => void;
}

export const ButtonAction = ({
  cookingState,
  selectedIngredientsCount,
  handleCook,
}: Props) => {
  return (
    <>
      <div className={cookingState === "idle" ? "h-16" : ""}>
        {" "}
        {/* Fixed height container to prevent jumps */}
        {cookingState === "idle" && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={handleCook}
            disabled={selectedIngredientsCount === 0}
            className="bg-orange-500 text-white px-8 py-3 rounded-full cursor-pointer font-bold text-xl shadow-lg disabled:opacity-50 disabled:shadow-none hover:bg-orange-600 hover:shadow-xl transition-all active:scale-95"
          >
            ¡A Cocinar! ({selectedIngredientsCount})
          </motion.button>
        )}
        {cookingState === "cooking" && (
          <p className="text-orange-600 font-bold text-xl animate-pulse">
            🔥 Cocinando...
          </p>
        )}
      </div>
    </>
  );
};
