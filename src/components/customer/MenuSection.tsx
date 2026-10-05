import React, { useState, useMemo } from 'react';
import { Dish, CategoryId, DietaryTag } from '../../types/restaurant';
import { DishArtwork } from '../DishArtwork';
import { Search, Plus, Check, Sparkles, Filter } from 'lucide-react';

interface MenuSectionProps {
  dishes: Dish[];
  onSelectDish: (dish: Dish) => void;
  onAddToCart: (dish: Dish) => void;
  cartDishIds: string[];
}

const CATEGORIES: { id: CategoryId | 'todos'; label: string; japanese: string }[] = [
  { id: 'todos', label: 'Toda La Carta', japanese: '全品' },
  { id: 'entradas', label: 'Entradas & Otsumami', japanese: '前菜' },
  { id: 'makis', label: 'Makis de Autor', japanese: '巻き寿司' },
  { id: 'fuertes', label: 'Platos Fuertes & Robata', japanese: '主菜' },
  { id: 'bebidas', label: 'Sakes & Cócteles', japanese: '日本酒' },
  { id: 'postres', label: 'Postres & Wagashi', japanese: '甘味' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  dishes,
  onSelectDish,
  onAddToCart,
  cartDishIds,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'todos'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<DietaryTag | 'all'>('all');

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const matchesCategory = activeCategory === 'todos' || dish.category === activeCategory;
      const matchesTag = activeTag === 'all' || dish.tags.includes(activeTag);
      const matchesSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.japaneseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [dishes, activeCategory, activeTag, searchQuery]);

  return (
    <section id="menu" className="relative py-20 bg-[#EEDBC5] border-t border-[#1C1918]/10">
      {/* Background Japanese pattern */}
      <div className="absolute inset-0 bg-seigaiha opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#C05041] uppercase">
            <span>Menú Gastronómico</span>
            <span aria-hidden="true" className="text-[#CA8A8C]">·</span>
            <span className="font-serif">お品書き</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1918] tracking-tight">
            La Carta de Temporada
          </h2>

          <p className="text-sm sm:text-base text-[#1C1918]/75 leading-relaxed text-balance">
            Cada plato es concebido como una obra efímera: cortes milimétricos, pescados frescos de captura salvaje y sakes seleccionados por nuestro sommelier.
          </p>
        </div>

        {/* Category Navigation Bar (Segmented Interactive Controls) */}
        <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-4 gap-2 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-md text-xs sm:text-sm font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#1C1918] text-[#EEDBC5] shadow-sm'
                    : 'bg-[#FAF6EE]/70 hover:bg-[#FAF6EE] text-[#1C1918]/80 border border-[#1C1918]/10'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] ${isActive ? 'text-[#CA8A8C]' : 'text-[#1C1918]/40'}`}>
                  {cat.japanese}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-6 mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-3 bg-[#FAF6EE]/80 rounded-xl border border-[#1C1918]/10">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#1C1918]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por plato, ingrediente o nombre japonés..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-transparent placeholder-[#1C1918]/40 text-[#1C1918] focus:outline-none focus:ring-1 focus:ring-[#C05041] rounded-md"
            />
          </div>

          {/* Dietary Filter Segmented Controls */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar text-xs">
            <span className="text-[#1C1918]/50 flex items-center gap-1 mr-1 hidden sm:flex">
              <Filter className="w-3.5 h-3.5" />
              <span>Filtro:</span>
            </span>
            {(['all', 'Chef Selection', 'Gluten Free', 'Picante', 'Vegetariano'] as const).map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-2.5 py-1.5 rounded-md whitespace-nowrap font-medium transition-colors cursor-pointer ${
                  activeTag === tag
                    ? 'bg-[#C05041] text-white'
                    : 'text-[#1C1918]/70 hover:bg-[#EEDBC5]/60'
                }`}
              >
                {tag === 'all' ? 'Todos' : tag}
              </button>
            ))}
          </div>

        </div>

        {/* Grid Layout of Dishes */}
        {filteredDishes.length === 0 ? (
          <div className="text-center py-16 bg-[#FAF6EE]/40 rounded-xl border border-dashed border-[#1C1918]/20">
            <p className="font-serif text-xl text-[#1C1918]/70">No se encontraron platos en esta selección.</p>
            <p className="text-xs text-[#1C1918]/50 mt-1">Prueba a limpiar la búsqueda o cambiar de categoría.</p>
            <button
              onClick={() => {
                setActiveCategory('todos');
                setActiveTag('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#1C1918] text-[#EEDBC5] text-xs uppercase tracking-wider rounded-md"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDishes.map((dish) => {
              const inCart = cartDishIds.includes(dish.id);

              return (
                <article
                  key={dish.id}
                  className="group bg-[#FAF6EE] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 border border-[#1C1918]/10 flex flex-col justify-between"
                >
                  {/* Dish Artwork / Image */}
                  <div
                    onClick={() => onSelectDish(dish)}
                    className="cursor-pointer relative overflow-hidden"
                  >
                    <DishArtwork
                      artworkType={dish.artworkType}
                      title={dish.name}
                      className="h-48 w-full group-hover:scale-[1.02] transition-transform duration-300"
                      isSpecial={dish.isSpecial}
                    />

                    {/* Pieces / Portion metadata */}
                    {dish.pieces && (
                      <span className="absolute bottom-2 right-2 bg-[#1C1918]/80 text-[#FAF6EE] text-[10px] px-2 py-0.5 rounded-xs tracking-wider backdrop-blur-xs">
                        {dish.pieces}
                      </span>
                    )}
                  </div>

                  {/* Dish Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Quiet Unboxed Metadata (Tags) with typographic separators */}
                      <div className="flex items-center gap-2 text-xs text-[#1C1918]/60 mb-1.5 flex-wrap">
                        <span className="font-serif text-[#C05041] font-medium tracking-wide">
                          {dish.japaneseName}
                        </span>
                        {dish.tags.length > 0 && <span aria-hidden="true">·</span>}
                        {dish.tags.map((tag, idx) => (
                          <React.Fragment key={tag}>
                            <span className={tag === 'Chef Selection' ? 'text-[#C05041] font-medium' : tag === 'Picante' ? 'text-[#C05041]' : 'text-[#486333]'}>
                              {tag}
                            </span>
                            {idx < dish.tags.length - 1 && <span aria-hidden="true">·</span>}
                          </React.Fragment>
                        ))}
                      </div>

                      {/* Dish Title */}
                      <h3
                        onClick={() => onSelectDish(dish)}
                        className="font-serif text-lg font-semibold text-[#1C1918] group-hover:text-[#C05041] transition-colors cursor-pointer leading-snug"
                      >
                        {dish.name}
                      </h3>

                      {/* Description */}
                      <p className="mt-2 text-xs text-[#1C1918]/70 leading-relaxed line-clamp-2">
                        {dish.description}
                      </p>
                    </div>

                    {/* Bottom Row: Price in Matcha Green + Quick Add Action */}
                    <div className="mt-5 pt-3 border-t border-[#1C1918]/8 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#1C1918]/50 block uppercase tracking-wider">
                          Precio
                        </span>
                        {/* Matcha Green Price with high legibility */}
                        <span className="font-serif text-xl font-bold text-[#4B6B38] tabular-nums">
                          {dish.price.toFixed(2)} €
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectDish(dish)}
                          className="px-2.5 py-1.5 text-xs text-[#1C1918]/70 hover:text-[#1C1918] transition-colors"
                        >
                          Detalles
                        </button>

                        <button
                          onClick={() => onAddToCart(dish)}
                          disabled={!dish.isAvailable}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-wide uppercase transition-colors flex items-center gap-1.5 cursor-pointer ${
                            !dish.isAvailable
                              ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                              : inCart
                              ? 'bg-[#4B6B38] text-white'
                              : 'bg-[#C05041] hover:bg-[#A84234] text-white shadow-xs'
                          }`}
                        >
                          {inCart ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Añadido</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Comanda</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Seasonal Tasting Experience Callout */}
        <div className="mt-16 p-8 bg-[#171514] rounded-2xl border border-[#2D2826] text-[#FAF6EE] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#C05041]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold text-[#AAB384] tracking-widest uppercase">
                <Sparkles className="w-4 h-4 text-[#CA8A8C]" />
                <span>Experiencia Omakase Privada</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white">
                El Menú Degustación del Maestro Kenji
              </h3>
              <p className="text-xs sm:text-sm text-[#EEDBC5]/75 max-w-xl">
                12 pases a puerta cerrada en la Barra de Hinoki: nigiris de pescado madurado, mariscos vivos traídos por aire de Galicia y Japón, y maridaje de sakes raros.
              </p>
            </div>

            <div className="text-center md:text-right shrink-0">
              <span className="text-xs text-[#CA8A8C] block uppercase tracking-wider">Menú Completo</span>
              <span className="font-serif text-3xl font-bold text-[#AAB384] tabular-nums block">
                120.00 €
              </span>
              <span className="text-[11px] text-[#EEDBC5]/60">Por comensal · Reserva previa</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
