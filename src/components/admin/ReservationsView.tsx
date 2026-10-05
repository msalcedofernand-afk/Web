import React, { useState, useMemo } from 'react';
import { Reservation, ReservationStatus, SeatingArea } from '../../types/restaurant';
import {
  Calendar,
  Clock,
  Users,
  Search,
  Check,
  X,
  Filter,
  Plus,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info,
} from 'lucide-react';

interface ReservationsViewProps {
  reservations: Reservation[];
  onUpdateStatus: (id: string, newStatus: ReservationStatus) => void;
  onAddManualReservation: (reservation: Omit<Reservation, 'id' | 'createdAt'>) => string;
}

export const ReservationsView: React.FC<ReservationsViewProps> = ({
  reservations,
  onUpdateStatus,
  onAddManualReservation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | 'all'>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [areaFilter, setAreaFilter] = useState<string>('all');

  // Manual booking modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalName, setModalName] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [modalPhone, setModalPhone] = useState('');
  const [modalGuests, setModalGuests] = useState(2);
  const [modalDate, setModalDate] = useState('2026-09-30');
  const [modalTime, setModalTime] = useState('21:00');
  const [modalArea, setModalArea] = useState<SeatingArea>('Barra Omakase');
  const [modalNotes, setModalNotes] = useState('');

  // Selected reservation details drawer/modal
  const [activeReservationNotes, setActiveReservationNotes] = useState<Reservation | null>(null);

  // Compute metrics
  const stats = useMemo(() => {
    const total = reservations.length;
    const pending = reservations.filter((r) => r.status === 'pending').length;
    const confirmed = reservations.filter((r) => r.status === 'confirmed').length;
    const cancelled = reservations.filter((r) => r.status === 'cancelled').length;
    const totalGuestsToday = reservations
      .filter((r) => r.date === '2026-09-30' && r.status !== 'cancelled')
      .reduce((sum, r) => sum + r.guests, 0);

    return { total, pending, confirmed, cancelled, totalGuestsToday };
  }, [reservations]);

  // Filtered reservations
  const filtered = useMemo(() => {
    return reservations.filter((res) => {
      const matchesSearch =
        res.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.customerPhone.includes(searchQuery) ||
        res.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || res.status === statusFilter;
      const matchesDate = dateFilter === 'all' || res.date === dateFilter;
      const matchesArea = areaFilter === 'all' || res.seatingArea === areaFilter;

      return matchesSearch && matchesStatus && matchesDate && matchesArea;
    });
  }, [reservations, searchQuery, statusFilter, dateFilter, areaFilter]);

  const handleCreateReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalName.trim() || !modalPhone.trim()) return;

    onAddManualReservation({
      customerName: modalName.trim(),
      customerEmail: modalEmail.trim() || 'cliente@telefono.es',
      customerPhone: modalPhone.trim(),
      guests: Number(modalGuests),
      date: modalDate,
      time: modalTime,
      seatingArea: modalArea,
      status: 'confirmed',
      notes: modalNotes.trim(),
      specialOccasion: 'Ninguna',
    });

    setShowAddModal(false);
    setModalName('');
    setModalEmail('');
    setModalPhone('');
    setModalNotes('');
  };

  return (
    <div className="space-y-6">
      
      {/* KPI Header Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Total Bookings */}
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-2xs">
          <span className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider block">
            Total Registradas
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-serif text-2xl font-bold text-[#1C1918] tabular-nums">
              {stats.total}
            </span>
            <span className="text-xs text-neutral-400 font-mono">Libro general</span>
          </div>
        </div>

        {/* Pending Approval (High intent yellow/amber) */}
        <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-2xs bg-amber-50/20">
          <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
            Pendientes de Confirmar
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-serif text-2xl font-bold text-amber-600 tabular-nums">
              {stats.pending}
            </span>
            <span className="text-xs text-amber-600 font-medium">Requieren acción</span>
          </div>
        </div>

        {/* Confirmed */}
        <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-2xs bg-emerald-50/20">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
            Confirmadas
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-serif text-2xl font-bold text-emerald-700 tabular-nums">
              {stats.confirmed}
            </span>
            <span className="text-xs text-emerald-600 font-medium">Asientos listos</span>
          </div>
        </div>

        {/* Total Expected Guests Today */}
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-2xs">
          <span className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider block">
            Comensales Hoy (30 Sep)
          </span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="font-serif text-2xl font-bold text-[#C05041] tabular-nums">
              {stats.totalGuestsToday} pax
            </span>
            <span className="text-xs text-neutral-400 font-mono">Turno mediodía + noche</span>
          </div>
        </div>

      </div>

      {/* Control Bar: Filters, Search, and New Reservation */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-2xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por cliente, teléfono, email o código..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-lg text-[#1C1918] placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#4B6B38]"
          />
        </div>

        {/* Status segmented filters */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {(
            [
              { id: 'all', label: 'Todas' },
              { id: 'pending', label: 'Pendientes' },
              { id: 'confirmed', label: 'Confirmadas' },
              { id: 'completed', label: 'Completadas' },
              { id: 'cancelled', label: 'Canceladas' },
            ] as const
          ).map((tab) => {
            const isSelected = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#1C1918] text-white shadow-2xs'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Action button: Add Manual Booking */}
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#4B6B38] hover:bg-[#3F5A2F] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Reserva</span>
        </button>

      </div>

      {/* Main Data Table Area */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-2xs overflow-hidden">
        
        {/* Table Head / Header info */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
          <div>
            <h2 className="font-serif text-lg font-semibold text-[#1C1918]">
              Registro de Reservas Próximas
            </h2>
            <p className="text-xs text-neutral-500">
              Mostrando {filtered.length} reservas registradas en el sistema.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick date filter selector */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="text-xs bg-white border border-neutral-200 rounded-md px-2.5 py-1.5 text-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#4B6B38]"
            >
              <option value="all">Todas las fechas</option>
              <option value="2026-09-30">Hoy (30 Sep)</option>
              <option value="2026-10-01">Mañana (01 Oct)</option>
            </select>

            <select
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
              className="text-xs bg-white border border-neutral-200 rounded-md px-2.5 py-1.5 text-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#4B6B38]"
            >
              <option value="all">Todas las zonas</option>
              <option value="Barra Omakase">Barra Omakase</option>
              <option value="Tatami Privado">Tatami Privado</option>
              <option value="Salón Principal">Salón Principal</option>
              <option value="Terraza Zen">Terraza Zen</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-neutral-500 font-medium">
                <th className="py-3 px-4 uppercase tracking-wider text-[10px]">ID / Fecha</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[10px]">Hora</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[10px]">Nombre del Cliente</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[10px]">Comensales</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[10px]">Zona / Mesa</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[10px]">Estado</th>
                <th className="py-3 px-4 uppercase tracking-wider text-[10px] text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/70">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-neutral-400">
                    No se encontraron reservas con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                filtered.map((res) => {
                  return (
                    <tr
                      key={res.id}
                      className="hover:bg-neutral-50/80 transition-colors group"
                    >
                      {/* ID & Date */}
                      <td className="py-3.5 px-4 font-mono">
                        <span className="font-bold text-[#1C1918] block">{res.id}</span>
                        <span className="text-[11px] text-neutral-500 tabular-nums">{res.date}</span>
                      </td>

                      {/* Time */}
                      <td className="py-3.5 px-4 font-medium text-neutral-800 tabular-nums">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-neutral-400" />
                          <span className="font-mono text-xs">{res.time} h</span>
                        </div>
                      </td>

                      {/* Customer Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div>
                            <span className="font-semibold text-[#1C1918] block hover:text-[#C05041] transition-colors">
                              {res.customerName}
                            </span>
                            <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-0.5">
                              <span className="font-mono">{res.customerPhone}</span>
                              {res.notes && (
                                <button
                                  onClick={() => setActiveReservationNotes(res)}
                                  className="text-[#C05041] hover:underline flex items-center gap-0.5"
                                  title="Ver notas y alérgenos"
                                >
                                  <Info className="w-3 h-3" />
                                  <span>Nota</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Guests */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1 font-semibold text-neutral-800 tabular-nums">
                          <Users className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{res.guests} pax</span>
                        </div>
                      </td>

                      {/* Seating Area */}
                      <td className="py-3.5 px-4">
                        <span className="text-neutral-700 font-medium">{res.seatingArea}</span>
                        {res.specialOccasion && res.specialOccasion !== 'Ninguna' && (
                          <span className="block text-[10px] text-[#C05041] font-mono">
                            {res.specialOccasion}
                          </span>
                        )}
                      </td>

                      {/* Status with intuitive color coding */}
                      <td className="py-3.5 px-4">
                        {res.status === 'confirmed' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            Confirmada
                          </span>
                        )}
                        {res.status === 'pending' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-amber-100 text-amber-800 animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            Pendiente
                          </span>
                        )}
                        {res.status === 'completed' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            Completada
                          </span>
                        )}
                        {res.status === 'cancelled' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-red-100 text-red-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            Cancelada
                          </span>
                        )}
                      </td>

                      {/* Action buttons to Confirm or Cancel (Strictly per prompt) */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          
                          {/* Confirm Button: Matcha Green (#4B6B38 / #AAB384) */}
                          {res.status !== 'confirmed' && (
                            <button
                              onClick={() => onUpdateStatus(res.id, 'confirmed')}
                              className="px-2.5 py-1 bg-[#4B6B38] hover:bg-[#3F5A2F] text-white text-[11px] font-semibold rounded-md transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                              title="Confirmar reserva"
                            >
                              <Check className="w-3 h-3" />
                              <span>Confirm</span>
                            </button>
                          )}

                          {/* Cancel Button: Terracotta Red (#C05041) */}
                          {res.status !== 'cancelled' && (
                            <button
                              onClick={() => onUpdateStatus(res.id, 'cancelled')}
                              className="px-2.5 py-1 bg-[#C05041] hover:bg-[#A84234] text-white text-[11px] font-semibold rounded-md transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                              title="Cancelar reserva"
                            >
                              <X className="w-3 h-3" />
                              <span>Cancel</span>
                            </button>
                          )}

                          {/* Mark as completed / seated if confirmed */}
                          {res.status === 'confirmed' && (
                            <button
                              onClick={() => onUpdateStatus(res.id, 'completed')}
                              className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[11px] font-medium rounded-md transition-colors cursor-pointer"
                              title="Marcar como sentada o finalizada"
                            >
                              Sentada
                            </button>
                          )}

                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-3 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between text-[11px] text-neutral-500">
          <span>
            Total en vista: <strong className="text-neutral-800">{filtered.length}</strong> reservas
          </span>
          <span className="font-mono">
            Ayuki Reservation Engine · Sincronización en Tiempo Real
          </span>
        </div>

      </div>

      {/* Detail / Notes Modal */}
      {activeReservationNotes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <h3 className="font-serif font-bold text-lg text-[#1C1918]">
                Detalles de Reserva {activeReservationNotes.id}
              </h3>
              <button
                onClick={() => setActiveReservationNotes(null)}
                className="text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p><strong>Titular:</strong> {activeReservationNotes.customerName}</p>
              <p><strong>Teléfono:</strong> {activeReservationNotes.customerPhone}</p>
              <p><strong>Email:</strong> {activeReservationNotes.customerEmail}</p>
              <p><strong>Fecha y Hora:</strong> {activeReservationNotes.date} a las {activeReservationNotes.time} h</p>
              <p><strong>Zona:</strong> {activeReservationNotes.seatingArea} ({activeReservationNotes.guests} pax)</p>
              {activeReservationNotes.specialOccasion && (
                <p><strong>Ocasión:</strong> {activeReservationNotes.specialOccasion}</p>
              )}
              <div className="pt-2">
                <span className="font-bold text-neutral-800 block mb-1">Notas especiales &amp; Alérgenos:</span>
                <p className="p-3 bg-amber-50 text-amber-900 rounded-lg border border-amber-200">
                  {activeReservationNotes.notes || 'Sin notas especiales especificadas.'}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200 flex justify-end">
              <button
                onClick={() => setActiveReservationNotes(null)}
                className="px-4 py-2 bg-neutral-800 text-white rounded-md text-xs font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Reservation Creation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs">
          <form
            onSubmit={handleCreateReservation}
            className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-xs"
          >
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <h3 className="font-serif font-bold text-lg text-[#1C1918]">
                Añadir Reserva Manual (Teléfono / Puerta)
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Nombre del Cliente *</label>
                <input
                  type="text"
                  value={modalName}
                  onChange={(e) => setModalName(e.target.value)}
                  placeholder="Ej. Fernando Arribas"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4B6B38]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Teléfono *</label>
                <input
                  type="tel"
                  value={modalPhone}
                  onChange={(e) => setModalPhone(e.target.value)}
                  placeholder="+34 600 000 000"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4B6B38]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Fecha</label>
                <input
                  type="date"
                  value={modalDate}
                  onChange={(e) => setModalDate(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4B6B38]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Hora</label>
                <input
                  type="time"
                  value={modalTime}
                  onChange={(e) => setModalTime(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4B6B38]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-700 mb-1">Comensales</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={modalGuests}
                  onChange={(e) => setModalGuests(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4B6B38]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Zona Asignada</label>
              <select
                value={modalArea}
                onChange={(e) => setModalArea(e.target.value as any)}
                className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4B6B38]"
              >
                <option value="Barra Omakase">Barra Omakase (Alta exclusividad)</option>
                <option value="Salón Principal">Salón Principal</option>
                <option value="Tatami Privado">Tatami Privado</option>
                <option value="Terraza Zen">Terraza Zen</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">Notas / Restricciones</label>
              <textarea
                value={modalNotes}
                onChange={(e) => setModalNotes(e.target.value)}
                placeholder="Observaciones de mesa, alergias o preferencias..."
                rows={2}
                className="w-full px-3 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#4B6B38]"
              />
            </div>

            {/* Buttons: Matcha green for Save/Confirm, Terracotta for Cancel */}
            <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-[#C05041] hover:bg-[#A84234] text-white rounded-md font-semibold cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-[#4B6B38] hover:bg-[#3F5A2F] text-white rounded-md font-semibold cursor-pointer"
              >
                Guardar Reserva
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
