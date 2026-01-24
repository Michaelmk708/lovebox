import { motion } from 'framer-motion';

// Add the new categories to the Type definition here too
type Category = 'all' | 'budget' | 'hampers' | 'digital' | 'Wines' | 'Services' | 'packages' | 'keepsakes' | 'flowers' | 'teddy_bears';

interface FilterButtonsProps {
  activeFilter: Category;
  onFilterChange: (category: Category) => void;
}

const FilterButtons = ({ activeFilter, onFilterChange }: FilterButtonsProps) => {
  // Define your buttons here. The 'id' must match the Category type exactly.
  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'All Gifts' },
    { id: 'budget', label: 'Budget (<500)' },
    { id: 'packages', label: 'Packages' },
    { id: 'hampers', label: 'Hampers' },
    { id: 'flowers', label: '🌹 Flowers' },         // <-- NEW BUTTON
    { id: 'teddy_bears', label: '🧸 Teddies' },      // <-- NEW BUTTON
    { id: 'Wines', label: 'Wines' },
    { id: 'keepsakes', label: 'Keepsakes' },
    { id: 'digital', label: 'Digital' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onFilterChange(category.id)}
          className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeFilter === category.id
              ? 'text-white shadow-lg shadow-rose-200'
              : 'text-gray-600 hover:bg-rose-50 hover:text-rose-600 bg-white border border-gray-100'
          }`}
        >
          {activeFilter === category.id && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-rose-600 rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{category.label}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;