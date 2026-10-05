import React from 'react';
import { Dish } from '../../types/restaurant';
import { DishArtwork } from '../DishArtwork';
import { X, Plus, Check } from 'lucide-react';

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
  onAddToCart: (dish: Dish) => void;
  isInCart: boolean;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onAddToCart,
  isInCart,
}) => {
  if (!dish) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1918]/70 backdrop-blur-xs">
      <div
        className="bg-[#FAF6EE] text-[#1C1918] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#1C1918]/15 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
      >
        {/* Header Artwork */}
        <div className="relative">
          <DishArtwork
            artworkType={dish.artworkType}
            title={dish.name}
            className="h-56 w-full"
            isSpecial={dish.isSpecial}
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-[#1C1918]/70 text-white hover:bg-[#1C1918] transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#C05041] font-semibold uppercase tracking-wider mb-1">
              <span>{dish.japaneseName}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#1C1918]/50 capitalize">{dish.category}</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1C1918] leading-tight">
              {dish.name}
            </h3>
          </div>

          <p className="text-sm text-[#1C1918]/80 leading-relaxed">
            {dish.description}
          </p>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap pt-2">
            {dish.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-sm bg-[#EEDBC5] text-[#1C1918] font-medium"
              >
                {tag}
              </span>
            ))}
            {dish.pieces && (
              <span className="text-xs px-2.5 py-1 rounded-sm bg-[#1C1918]/10 text-[#1C1918]/80">
                {dish.pieces}
              </span>
            )}
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-[#1C1918]/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#1C1918]/50 block uppercase tracking-wider">
                Precio
              </span>
              <span className="font-serif text-2xl font-bold text-[#4B6B38] tabular-nums">
                {dish.price.toFixed(2)} €
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs text-[#1C1918]/70 hover:text-[#1C1918]"
              >
                Volver
              </button>

              <button
                onClick={() => {
                  onAddToCart(dish);
                  onClose();
                }}
                disabled={!dish.isAvailable}
                className={`px-5 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer ${
                  !dish.isAvailable
                    ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    : isInCart
                    ? 'bg-[#4B6B38] text-white'
                    : 'bg-[#C05041] hover:bg-[#A84234] text-white'
                }`}
              >
                {isInCart ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{isInCart ? 'En la Comanda' : 'Añadir a Comanda'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
