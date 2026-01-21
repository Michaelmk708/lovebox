import { motion } from 'framer-motion';

type Category = 'all' | 'budget' | 'hampers' | 'digital' | 'Wines' | 'Services' | 'packages'| 'keepsakes';

interface FilterButtonsProps {
  activeFilter: Category;
  onFilterChange: (filter: Category) => void;
}

const filters: { id: Category; label: string }[] = [
  { id: 'all', label: 'All Gifts' },
  { id: 'budget', label: 'Under 500' },
  { id: 'hampers', label: 'Hampers' },
  { id: 'digital', label: 'Digital Gifts' },
  { id: 'Wines', label: 'Wines' },
  { id: 'Services', label: 'Services' },
  { id: 'packages', label: 'Packages' },
  { id: 'keepsakes', label: 'Keepsakes' },
];

const FilterButtons = ({ activeFilter, onFilterChange }: FilterButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`relative btn-touch px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
            activeFilter === filter.id
              ? 'text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground bg-secondary hover:bg-secondary/80'
          }`}
        >
          {activeFilter === filter.id && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-primary rounded-full"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{filter.label}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
