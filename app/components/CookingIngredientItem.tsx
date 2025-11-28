"use client";

import { motion } from "framer-motion";
import { INGREDIENTS } from "../lib/consts/ingredients";

interface Props {
  id: string;
  index: number;
}

export const CookingIngredientItem = ({ id, index }: Props) => {
  const ingredient = INGREDIENTS.find((ing) => ing.id === id);
  if (!ingredient) return null;
  return (
    <motion.img
      key={id + "falling"}
      src={ingredient.image}
      alt={ingredient.name}
      className="absolute w-14 h-14 object-contain z-10"
      initial={{
        y: -400,
        x: (index - 1) * 40,
        opacity: 1,
        // eslint-disable-next-line react-hooks/purity
        rotate: Math.random() * 360,
      }}
      animate={{
        y: [-400, 40],
        scale: [1, 0.6],
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: "easeIn",
        times: [0, 1],
      }}
    />
  );
};
