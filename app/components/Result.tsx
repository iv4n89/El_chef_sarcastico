import { motion, AnimatePresence } from "framer-motion"
import { CookingResult, CookingState } from "../lib/types";
import { INGREDIENTS } from "../lib/consts/ingredients";
import ReactMarkdown from "react-markdown";

interface Props {
    result: CookingResult | null;
    cookingState: CookingState;
    reset: () => void;
    selectedIngredients: Array<typeof INGREDIENTS[0]>;
}

export const Result = ({ result, cookingState, reset, selectedIngredients }: Props) => {
    return (
        <AnimatePresence mode="wait">
        {result && cookingState === "success" && (
          <motion.div
            key={result.success ? "success" : "fail"}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`p-8 rounded-3xl max-w-md md:max-w-2xl text-center shadow-2xl border-4 ${
              result.success
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            {result.success ? (
              <>
                <h2 className="text-3xl font-bold text-green-700 mb-2">
                  ¡Receta Comestible!
                </h2>
                <div className="bg-white p-4 rounded-xl shadow-inner mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {result?.data?.title}
                  </h3>
                  <p className="text-gray-600 italic">
                    {result?.data?.description}
                  </p>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-red-700 mb-4">
                  🤢 Crimen Culinario
                </h2>
                <p className="text-lg font-black text-red-600 italic leading-tight">
                  {result.insult}
                </p>
              </>
            )}
            <button
              onClick={reset}
              className="mt-6 bg-gray-800 cursor-pointer text-white px-6 py-3 rounded-full font-bold hover:bg-gray-900 hover:scale-105 transition-all"
            >
              Intentar de nuevo
            </button>
            {/* --- View recipe steps --- */}
            {result.success && (
              <div className="mt-6 text-left">
                <h3 className="text-2xl font-bold mb-4">Ingredientes:</h3>
                <ul className="list-disc list-inside mb-6">
                  {selectedIngredients.map((ing) => (
                    <li key={ing.id} className="text-gray-700">
                      {ing.name}
                    </li>
                  ))}
                </ul>
                <h3 className="text-2xl font-bold mb-4">Pasos a seguir:</h3>
                <ol className="list-decimal list-inside space-y-2">
                  {result?.data?.steps.map((step: string, index: number) => (
                    <li key={index} className="text-gray-700">
                      <ReactMarkdown>{step}</ReactMarkdown>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    )
}
