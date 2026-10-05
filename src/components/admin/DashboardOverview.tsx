import React from 'react';
import { Reservation, Dish, Order, ReservationStatus } from '../../types/restaurant';
import {
  CalendarCheck,
  TrendingUp,
  Users,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  Flame,
  ChefHat,
  ChevronRight,
} from 'lucide-react';

interface DashboardOverviewProps {
  reservations: Reservation[];
  dishes: Dish[];
  orders: Order[];
  onUpdateReservationStatus: (id: string, newStatus: ReservationStatus) => void;
  onNavigateToTab: (tab: any) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  reservations,
  dishes,
  orders,
  onUpdateReservationStatus,
  onNavigateToTab,
}) => {
  const pendingReservations = reservations.filter((r) => r.status === 'pending');
  const todayReservations = reservations.filter((r) => r.date === '2026-09-30');
  const activeOrders = orders.filter((o) => o.status === 'pending' || o.status === 'preparing');

  // Revenue estimation
  const estimatedRevenue = todayReservations.reduce((sum, r) => {
    if (r.status === 'cancelled') return sum;
    // Estimated average ticket per person: 68€
    return sum + r.guests * 68;
  }, 0);

  const totalPaxToday = todayReservations
    .filter((r) => r.status !== 'cancelled')
    .reduce((sum, r) => sum + r.guests, 0);

  return (
    <div className="space-y-6">
      
      {/* Top Banner with Alert if there are pending bookings */}
      {pendingReservations.length > 0 && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-900 shadow-2xs">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold text-sm block">
                Tienes {pendingReservations.length} reservas pendientes de aprobación
              </span>
              <p className="text-amber-700 text-xs mt-0.5">
                Los clientes están esperando su confirmación por email o SMS.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateToTab('reservations')}
            className="px-3.5 py-1.5 bg-[#4B6B38] hover:bg-[#3F5A2F] text-white font-semibold rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Revisar Reservas
          </button>
        </div>
      )}

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Reservas Hoy
            </span>
            <div className="p-2 bg-neutral-100 rounded-lg text-neutral-700">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-serif text-3xl font-bold text-[#1C1918] tabular-nums">
              {todayReservations.length}
            </span>
            <span className="text-xs text-emerald-700 font-medium">92% Ocupación</span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1 font-mono">
            {totalPaxToday} comensales esperados
          </p>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Ingresos Estimados Hoy
            </span>
            <div className="p-2 bg-emerald-50 rounded-lg text-[#4B6B38]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-serif text-3xl font-bold text-[#4B6B38] tabular-nums">
              {estimatedRevenue.toFixed(0)} €
            </span>
            <span className="text-xs text-emerald-700 font-medium">+14% vs ayer</span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1 font-mono">
            Ticket medio proyectado: 68.00 €
          </p>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Comandas Activas Cocina
            </span>
            <div className="p-2 bg-amber-50 rounded-lg text-amber-700">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-serif text-3xl font-bold text-[#C05041] tabular-nums">
              {activeOrders.length}
            </span>
            <span className="text-xs text-neutral-500">En preparación</span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1 font-mono">
            Tiempo medio de pase: 12 min
          </p>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Platos Activos en Carta
            </span>
            <div className="p-2 bg-neutral-100 rounded-lg text-neutral-700">
              <ChefHat className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-serif text-3xl font-bold text-[#1C1918] tabular-nums">
              {dishes.length}
            </span>
            <span className="text-xs text-emerald-700 font-medium">100% Stock</span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-1 font-mono">
            5 categorías operativas
          </p>
        </div>

      </div>

      {/* Two Column Layout: Urgent Bookings & Kitchen / Chef Prep */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Urgent Reservations to Confirm */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-neutral-200 shadow-2xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#1C1918]">
                  Reservas Pendientes de Aprobación
                </h3>
                <p className="text-xs text-neutral-500">
                  Acción rápida: confirma o cancela directamente con un clic.
                </p>
              </div>
              <button
                onClick={() => onNavigateToTab('reservations')}
                className="text-xs text-[#4B6B38] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Ver todas</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-neutral-100">
              {pendingReservations.length === 0 ? (
                <div className="p-8 text-center text-neutral-400 text-xs">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <p className="font-medium text-neutral-700">Todas las reservas están al día.</p>
                  <p className="text-[11px] mt-0.5">No hay solicitudes pendientes en este momento.</p>
                </div>
              ) : (
                pendingReservations.map((res) => (
                  <div key={res.id} className="p-4 hover:bg-neutral-50/80 transition-colors flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#1C1918]">{res.customerName}</span>
                        <span className="font-mono text-[10px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded">
                          {res.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-neutral-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-neutral-400" />
                          <strong className="text-neutral-800">{res.time} h</strong> ({res.date})
                        </span>
                        <span>·</span>
                        <span>{res.guests} comensales</span>
                        <span>·</span>
                        <span className="text-[#C05041] font-medium">{res.seatingArea}</span>
                      </div>
                      {res.notes && (
                        <p className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded mt-1.5 line-clamp-1 border border-amber-200/50">
                          {res.notes}
                        </p>
                      )}
                    </div>

                    {/* Actions: Confirm (Matcha Green), Cancel (Terracotta Red) */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onUpdateReservationStatus(res.id, 'confirmed')}
                        className="px-3 py-1.5 bg-[#4B6B38] hover:bg-[#3F5A2F] text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => onUpdateReservationStatus(res.id, 'cancelled')}
                        className="px-3 py-1.5 bg-[#C05041] hover:bg-[#A84234] text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="p-4 border-t border-neutral-100 bg-neutral-50 text-[11px] text-neutral-500 flex justify-between">
            <span>Barra Omakase: 8 / 8 plazas ocupadas</span>
            <span className="text-emerald-700 font-medium">Capacidad completa 21:00h</span>
          </div>
        </div>

        {/* Right Column: Daily Shokunin Ops Checklist & Popular Dishes */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Chef Checklist */}
          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-2xs">
            <h3 className="font-serif text-base font-semibold text-[#1C1918] mb-1">
              Control de Calidad Diario (Chef Kenji)
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              Puntos críticos del protocolo Shokunin para el pase de hoy.
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 text-emerald-900 rounded-lg border border-emerald-100">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Arroz Koshihikari con Akazu (Lote 2)</span>
                </span>
                <span className="font-mono text-[11px] text-emerald-700 font-bold">36.5°C</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-emerald-50 text-emerald-900 rounded-lg border border-emerald-100">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Lomo Otoro Bluefin madurado 5 días</span>
                </span>
                <span className="font-mono text-[11px] text-emerald-700 font-bold">Óptimo</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-emerald-50 text-emerald-900 rounded-lg border border-emerald-100">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Carbón Binchotan encendido a 920°C</span>
                </span>
                <span className="font-mono text-[11px] text-emerald-700 font-bold">Robata OK</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-neutral-50 text-neutral-700 rounded-lg border border-neutral-200">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-neutral-400" />
                  <span>Rallado fresco de raíz de Wasabi Shizuoka</span>
                </span>
                <span className="font-mono text-[11px] text-neutral-500">20:15 h</span>
              </div>
            </div>
          </div>

          {/* Quick Menu shortcuts */}
          <div className="bg-[#1C1918] text-[#EEDBC5] p-5 rounded-xl border border-[#2D2826] shadow-2xs">
            <span className="text-[10px] font-mono text-[#AAB384] uppercase tracking-widest block">
              Makis más solicitados
            </span>
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-[#2C2725]">
                <span className="text-white font-medium">Ayuki Signature Dragon Roll</span>
                <span className="text-[#AAB384] font-bold tabular-nums">48 unidades</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[#2C2725]">
                <span className="text-white font-medium">Truffle Salmon Acevichado</span>
                <span className="text-[#AAB384] font-bold tabular-nums">39 unidades</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">Otoro Caviar Roll</span>
                <span className="text-[#AAB384] font-bold tabular-nums">26 unidades</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
