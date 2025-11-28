import { motion, AnimatePresence } from "framer-motion";
import { CookingState } from "../lib/types";

interface Props {
  cookingState: CookingState;
  setCookingState: (state: CookingState) => void;
}

export const Pot = ({ cookingState, setCookingState }: Props) => {
  return (
    <div className="relative w-72 h-72 flex justify-center items-end overflow-hidden rounded-b-[3rem]">
      {/* Pot Image */}
      <motion.img
        src="/pot.png"
        alt="Pot"
        className="w-full h-full object-contain relative z-20"
        animate={
          cookingState === "cooking"
            ? {
                x: [-2, 2, -1, 1, 0],
                rotate: [-1, 1, -2, 2, 0],
                y: [0, 3, 1, 2, 0],
              }
            : {
                x: 0,
                rotate: 0,
                y: 0,
              }
        }
        transition={{
          duration: 0.4,
          ease: "linear",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />

      {/* Explosion */}
      <AnimatePresence>
        {cookingState === "exploded" && (
          <motion.img
            src="/explosion.png"
            alt="BOOM"
            className="absolute w-[120%] h-[120%] object-contain z-30 -top-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.5, 1.2],
              opacity: [0, 1, 1],
              rotate: [-10, 10, 0],
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
            onAnimationComplete={() =>
              setTimeout(() => setCookingState("success"), 500)
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
};
