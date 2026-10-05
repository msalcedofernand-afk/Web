import React, { useState } from 'react';
import { Dish, CategoryId, DietaryTag } from '../../types/restaurant';
import { X, Plus, AlertCircle } from 'lucide-react';

interface AddDishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDish: (dish: Omit<Dish, 'id'>) => void;
}

export const AddDishModal: React.FC<AddDishModalProps> = ({
  isOpen,
  onClose,
  onAddDish,
}) => {
  const [name, setName] = useState('');
  const [japaneseName, setJapaneseName] = useState('');
  const [category, setCategory] = useState<CategoryId>('makis');
  const [price, setPrice] = useState('24.00');
  const [description, setDescription] = useState('');
  const [pieces, setPieces] = useState('8 piezas');
  const [artworkType, setArtworkType] = useState<Dish['artworkType']>('maki');
  const [isSpecial, setIsSpecial] = useState(false);
  const [selectedTags, setSelectedTags] = useState<DietaryTag[]>(['Chef Selection']);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const toggleTag = (tag: DietaryTag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const numericPrice = parseFloat(price);
    if (!name.trim()) {
      setError('Introduce el nombre del plato.');
      return;
    }
    if (isNaN(numericPrice) || numericPrice <= 0) {
      setError('Introduce un precio válido.');
      return;
    }

    onAddDish({
      name: name.trim(),
      japaneseName: japaneseName.trim() || name.trim(),
      category,
      price: numericPrice,
      description: description.trim() || 'Plato exclusivo preparado según la tradición del Maestro Kenji.',
      pieces,
      tags: selectedTags,
      artworkType,
      isAvailable: true,
      isSpecial,
    });

    onClose();
    // Reset form
    setName('');
    setJapaneseName('');
    setPrice('24.00');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
          <div>
            <span className="text-[10px] font-mono text-[#AAB384] font-bold uppercase tracking-widest block">
              Carta Ayuki · Nueva Receta
            </span>
            <h3 className="font-serif text-xl font-bold text-[#1C1918]">
              Agregar Nuevo Plato o Maki
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-700"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Nombre Comercial *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Spicy Hamachi Crunch"
                className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4B6B38]"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Nombre en Japonés</label>
              <input
                type="text"
                value={japaneseName}
                onChange={(e) => setJapaneseName(e.target.value)}
                placeholder="Ej. ハマチ巻き"
                className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4B6B38]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryId)}
                className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4B6B38]"
              >
                <option value="entradas">Entradas</option>
                <option value="makis">Makis de Autor</option>
                <option value="fuertes">Platos Fuertes</option>
                <option value="bebidas">Bebidas &amp; Sake</option>
                <option value="postres">Postres</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Precio (€) *</label>
              <input
                type="number"
                step="0.5"
                min="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4B6B38] font-mono"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Porción / Piezas</label>
              <input
                type="text"
                value={pieces}
                onChange={(e) => setPieces(e.target.value)}
                placeholder="8 piezas"
                className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4B6B38]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1">Descripción y Cortes</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ingredientes clave, salsa de acompañamiento y procedencia..."
              className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4B6B38]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Estilo Visual (Arte en Pizarra)</label>
              <select
                value={artworkType}
                onChange={(e) => setArtworkType(e.target.value as any)}
                className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4B6B38]"
              >
                <option value="dragon">Dragon Roll / Anguila</option>
                <option value="maki">Maki Sushi Clásico</option>
                <option value="nigiri">Nigiri de Ventresca</option>
                <option value="tartare">Tartar / Carpaccio</option>
                <option value="wagyu">Wagyu Robata</option>
                <option value="ramen">Ramen / Caldo</option>
                <option value="sake">Sake / Licor</option>
                <option value="matcha">Matcha Bowl</option>
                <option value="mochi">Mochi Trilogía</option>
                <option value="gyoza">Gyozas Artesanas</option>
              </select>
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSpecial}
                  onChange={(e) => setIsSpecial(e.target.checked)}
                  className="rounded text-[#4B6B38] focus:ring-[#4B6B38]"
                />
                <span className="font-semibold text-neutral-800">Plato Estrella / Firma</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-1.5">Etiquetas Dietéticas</label>
            <div className="flex items-center gap-2 flex-wrap">
              {(['Chef Selection', 'Gluten Free', 'Picante', 'Vegetariano', 'Nuevo'] as DietaryTag[]).map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                    selectedTags.includes(tag)
                      ? 'bg-[#1C1918] text-white shadow-2xs'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons: Matcha Green for Save, Terracotta Red for Cancel */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#C05041] hover:bg-[#A84234] text-white rounded-md font-semibold cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#4B6B38] hover:bg-[#3F5A2F] text-white rounded-md font-semibold cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Guardar Plato</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
