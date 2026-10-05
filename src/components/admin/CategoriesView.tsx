import React from 'react';
import { Category, Dish } from '../../types/restaurant';
import { Layers, Utensils, Sparkles } from 'lucide-react';

interface CategoriesViewProps {
  categories: Category[];
  dishes: Dish[];
  onSelectCategoryFilter: (categoryId: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  categories,
  dishes,
  onSelectCategoryFilter,
}) => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-2xs">
        <h2 className="font-serif text-lg font-semibold text-[#1C1918]">
          Categorías Gastronómicas de Ayuki
        </h2>
        <p className="text-xs text-neutral-500 mt-0.5">
          Estructura de la carta para organizar los tiempos y maridajes en el servicio de mesa.
        </p>
      </div>

      {/* Categories Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => {
          const catDishes = dishes.filter((d) => d.category === cat.id);
          const prices = catDishes.map((d) => d.price);
          const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
          const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

          return (
            <div
              key={cat.id}
              className="bg-white p-5 rounded-xl border border-neutral-200 shadow-2xs hover:border-[#1C1918]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-serif text-xs font-semibold tracking-wider text-[#C05041] uppercase">
                    {cat.japaneseName}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#4B6B38] px-2 py-0.5 bg-emerald-50 rounded-md">
                    {catDishes.length} recetas
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#1C1918]">
                  {cat.name}
                </h3>

                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-neutral-400 block uppercase">Rango de Precio</span>
                  <span className="font-mono font-semibold text-neutral-800">
                    {minPrice.toFixed(2)} € — {maxPrice.toFixed(2)} €
                  </span>
                </div>

                <button
                  onClick={() => onSelectCategoryFilter(cat.id)}
                  className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium rounded-md transition-colors cursor-pointer"
                >
                  Ver Platos
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
