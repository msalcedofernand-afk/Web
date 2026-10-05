import React, { useState, useMemo } from 'react';
import { Dish, CategoryId } from '../../types/restaurant';
import { DishArtwork } from '../DishArtwork';
import { Search, Plus, Trash2, Edit2, Check, X, Eye, EyeOff, Sparkles } from 'lucide-react';

interface MenuItemsViewProps {
  dishes: Dish[];
  onToggleAvailability: (id: string) => void;
  onUpdatePrice: (id: string, newPrice: number) => void;
  onDeleteDish: (id: string) => void;
  onOpenAddModal: () => void;
}

export const MenuItemsView: React.FC<MenuItemsViewProps> = ({
  dishes,
  onToggleAvailability,
  onUpdatePrice,
  onDeleteDish,
  onOpenAddModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryId | 'all'>('all');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<string>('');

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const matchesCategory = categoryFilter === 'all' || dish.category === categoryFilter;
      const matchesSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.japaneseName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [dishes, categoryFilter, searchQuery]);

  const handleStartEditPrice = (dish: Dish) => {
    setEditingPriceId(dish.id);
    setTempPrice(dish.price.toString());
  };

  const handleSavePrice = (id: string) => {
    const val = parseFloat(tempPrice);
    if (!isNaN(val) && val > 0) {
      onUpdatePrice(id, val);
    }
    setEditingPriceId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Actions */}
      <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-2xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar plato por nombre o transcripción japonesa..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-lg text-[#1C1918] placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#4B6B38]"
          />
        </div>

        {/* Category Filter tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {(
            [
              { id: 'all', label: 'Todos' },
              { id: 'entradas', label: 'Entradas' },
              { id: 'makis', label: 'Makis' },
              { id: 'fuertes', label: 'Fuertes' },
              { id: 'bebidas', label: 'Bebidas' },
              { id: 'postres', label: 'Postres' },
            ] as const
          ).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-[#1C1918] text-white shadow-2xs'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Primary Save/Add Button in Matcha Green */}
        <button
          onClick={onOpenAddModal}
          className="px-4 py-2 bg-[#4B6B38] hover:bg-[#3F5A2F] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Nuevo Plato</span>
        </button>

      </div>

      {/* Menu Data Grid Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-2xs overflow-hidden">
        
        <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50/50 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-semibold text-[#1C1918]">
              Catálogo de Platos en Servicio
            </h2>
            <p className="text-xs text-neutral-500">
              {filteredDishes.length} recetas en carta. Haz clic en el precio para editarlo en vivo.
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            {dishes.filter((d) => d.isAvailable).length} Disponibles / {dishes.length} Totales
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-neutral-500 font-medium">
                <th className="py-3 px-4 uppercase tracking-wider text-[10px]">Plato &amp; Kanbun</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[10px]">Categoría</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[10px]">Precio (€)</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[10px]">Porción</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[10px]">Estado Stock</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[10px] text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/70">
              {filteredDishes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-neutral-400">
                    No se encontraron platos en esta categoría.
                  </td>
                </tr>
              ) : (
                filteredDishes.map((dish) => {
                  const isEditingPrice = editingPriceId === dish.id;

                  return (
                    <tr
                      key={dish.id}
                      className={`hover:bg-neutral-50/80 transition-colors ${
                        !dish.isAvailable ? 'opacity-60 bg-neutral-50/30' : ''
                      }`}
                    >
                      {/* Name & Artwork indicator */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-md overflow-hidden bg-neutral-900 shrink-0 border border-neutral-300">
                            <DishArtwork
                              artworkType={dish.artworkType}
                              title={dish.name}
                              className="w-full h-full"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-neutral-900 text-xs">
                                {dish.name}
                              </span>
                              {dish.isSpecial && (
                                <Sparkles className="w-3 h-3 text-[#C05041]" />
                              )}
                            </div>
                            <span className="font-serif text-[11px] text-[#C05041] block">
                              {dish.japaneseName}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 font-medium text-neutral-600 capitalize">
                        {dish.category}
                      </td>

                      {/* Price with inline quick editing */}
                      <td className="py-3.5 px-4">
                        {isEditingPrice ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              step="0.5"
                              value={tempPrice}
                              onChange={(e) => setTempPrice(e.target.value)}
                              className="w-20 px-2 py-1 border border-neutral-300 rounded text-xs font-mono font-bold"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSavePrice(dish.id)}
                              className="p-1 bg-[#4B6B38] text-white rounded cursor-pointer"
                              title="Guardar"
                            >
                              <Check className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => setEditingPriceId(null)}
                              className="p-1 bg-[#C05041] text-white rounded cursor-pointer"
                              title="Cancelar"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleStartEditPrice(dish)}
                            className="group flex items-center gap-1 font-serif text-sm font-bold text-[#4B6B38] hover:underline tabular-nums cursor-pointer"
                            title="Haz clic para modificar precio"
                          >
                            <span>{dish.price.toFixed(2)} €</span>
                            <Edit2 className="w-3 h-3 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        )}
                      </td>

                      {/* Pieces */}
                      <td className="py-3.5 px-4 text-neutral-600 text-[11px]">
                        {dish.pieces || '—'}
                      </td>

                      {/* Availability Toggle */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => onToggleAvailability(dish.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                            dish.isAvailable
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
                          }`}
                        >
                          {dish.isAvailable ? (
                            <>
                              <Eye className="w-3 h-3 text-emerald-600" />
                              <span>En Carta</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3 text-neutral-500" />
                              <span>Agotado</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions: Danger Delete Button in Terracotta Red */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              if (confirm(`¿Eliminar ${dish.name} de la carta de Ayuki?`)) {
                                onDeleteDish(dish.id);
                              }
                            }}
                            className="p-1.5 text-neutral-400 hover:text-white hover:bg-[#C05041] rounded-md transition-colors cursor-pointer"
                            title="Eliminar plato (Danger)"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
