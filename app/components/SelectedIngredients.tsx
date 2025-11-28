import {motion} from 'framer-motion';
import { INGREDIENTS } from '../lib/consts/ingredients';

interface Props {
    selectedIngredients: Array<typeof INGREDIENTS[0]>;
}

export const SelectedIngredients = ({selectedIngredients}: Props) => {

    return (
        <motion.div
              className="flex gap-2 flex-wrap max-w-[300px] md:max-w-[600px] z-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              {selectedIngredients.map((ing) => (
                <motion.img
                  key={ing.id}
                  src={ing.image}
                  alt={ing.name}
                  className="w-15 h-15 object-contain bg-white rounded-full shadow-md border border-orange-200"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                />
              ))}
            </motion.div>
    )
}
