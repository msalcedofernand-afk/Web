import React, { useState } from 'react';
import { Customer } from '../../types/restaurant';
import { Search, Star, Phone, Mail, Award, Clock } from 'lucide-react';

interface CustomersViewProps {
  customers: Customer[];
}

export const CustomersView: React.FC<CustomersViewProps> = ({ customers }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-lg font-semibold text-[#1C1918]">
            Directorio de Clientes &amp; Comensales VIP
          </h2>
          <p className="text-xs text-neutral-500">
            Registro de preferencias, alergias y fidelidad para atención personalizada.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar comensal..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-[#1C1918] placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#4B6B38]"
          />
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-neutral-500 font-medium">
                <th className="py-3 px-4 uppercase tracking-wider text-[10px]">Cliente</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[10px]">Contacto</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[10px]">Visitas</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[10px]">Gasto Total</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[10px]">Plato Favorito</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[10px]">Notas de Servicio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/70">
              {filtered.map((cust) => (
                <tr key={cust.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-neutral-900">{cust.name}</span>
                      {cust.isVip && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span>VIP</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono">{cust.id}</span>
                  </td>

                  <td className="py-3.5 px-4 text-neutral-600">
                    <p className="font-mono text-[11px]">{cust.phone}</p>
                    <p className="text-[10px] text-neutral-400">{cust.email}</p>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-neutral-800">
                    {cust.visits} visitas
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-[#4B6B38]">
                    {cust.totalSpent.toFixed(2)} €
                  </td>

                  <td className="py-3.5 px-4 text-neutral-700">
                    {cust.favoriteDish}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-neutral-600 bg-neutral-100 px-2 py-1 rounded text-[11px] block max-w-xs truncate">
                      {cust.notes}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
