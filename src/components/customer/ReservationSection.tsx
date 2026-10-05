import React, { useState } from 'react';
import { SeatingArea, Reservation } from '../../types/restaurant';
import { Calendar, Clock, Users, MapPin, CheckCircle, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

interface ReservationSectionProps {
  onAddReservation: (reservation: Omit<Reservation, 'id' | 'createdAt'>) => string;
}

const TIME_SLOTS = [
  '13:00', '13:30', '14:00', '14:30',
  '20:00', '20:30', '21:00', '21:30', '22:00'
];

const SEATING_AREAS: { area: SeatingArea; description: string; badge: string }[] = [
  {
    area: 'Barra Omakase',
    description: 'Frente al Maestro Kenji. Servicio pieza a pieza sobre madera de Hinoki.',
    badge: 'Exclusiva (8 plazas)'
  },
  {
    area: 'Salón Principal',
    description: 'Iluminación cálida tenue, mesas separadas con privacidad acústica.',
    badge: 'Mesas 2-6 pers.'
  },
  {
    area: 'Tatami Privado',
    description: 'Habitación tradicional con suelo de tatami y biombos shoji corredizos.',
    badge: 'Mínimo 4 pers.'
  },
  {
    area: 'Terraza Zen',
    description: 'Patio interior ajardinado con fuentes de agua y bambú negro.',
    badge: 'Ambiente exterior'
  }
];

export const ReservationSection: React.FC<ReservationSectionProps> = ({ onAddReservation }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('2026-09-30');
  const [time, setTime] = useState('20:30');
  const [seatingArea, setSeatingArea] = useState<SeatingArea>('Barra Omakase');
  const [specialOccasion, setSpecialOccasion] = useState<'Ninguna' | 'Cumpleaños' | 'Aniversario' | 'Cena de Negocios' | 'Celebración'>('Ninguna');
  const [notes, setNotes] = useState('');

  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim()) {
      setErrorMsg('Por favor completa tu nombre, correo electrónico y teléfono.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newId = onAddReservation({
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerPhone: customerPhone.trim(),
        guests,
        date,
        time,
        seatingArea,
        status: 'pending',
        notes: notes.trim(),
        specialOccasion,
      });

      setConfirmedBookingId(newId);
    } catch {
      setErrorMsg('Ocurrió un error al procesar la reserva. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setConfirmedBookingId(null);
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setNotes('');
  };

  return (
    <section id="reservas" className="relative py-20 bg-[#FAF6EE] border-t border-[#1C1918]/10">
      {/* Background Japanese pattern */}
      <div className="absolute inset-0 bg-washi-texture opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#C05041] uppercase">
            <Calendar className="w-3.5 h-3.5 text-[#C05041]" />
            <span>Mesa &amp; Omakase</span>
            <span aria-hidden="true" className="text-[#CA8A8C]">·</span>
            <span className="font-serif">予約</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1918] tracking-tight">
            Reserva Tu Mesa en Ayuki
          </h2>

          <p className="text-sm text-[#1C1918]/70 leading-relaxed text-balance">
            Recomendamos reservar con antelación para asegurar plaza en la Barra Omakase o en nuestras estancias privadas de tatami.
          </p>
        </div>

        {/* Confirmation Screen State */}
        {confirmedBookingId ? (
          <div className="bg-[#EEDBC5] p-8 sm:p-12 rounded-2xl border border-[#1C1918]/15 shadow-sm text-center max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-[#4B6B38] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#4B6B38]">
                Reserva Registrada Exitosamente
              </span>
              <h3 className="font-serif text-3xl text-[#1C1918] mt-1">
                ¡Te esperamos, {customerName}!
              </h3>
              <p className="text-sm text-[#1C1918]/75 mt-2">
                Hemos enviado los detalles a <strong className="text-[#1C1918]">{customerEmail}</strong>. Nuestro equipo de recepción confirmará los últimos detalles en breve.
              </p>
            </div>

            <div className="bg-[#FAF6EE] p-5 rounded-xl border border-[#1C1918]/10 text-left space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between border-b border-[#1C1918]/10 pb-2">
                <span className="text-[#1C1918]/60">Código de Referencia:</span>
                <span className="font-mono font-bold text-[#C05041]">{confirmedBookingId}</span>
              </div>
              <div className="flex justify-between border-b border-[#1C1918]/10 pb-2">
                <span className="text-[#1C1918]/60">Fecha y Hora:</span>
                <span className="font-medium text-[#1C1918]">{date} a las {time} h</span>
              </div>
              <div className="flex justify-between border-b border-[#1C1918]/10 pb-2">
                <span className="text-[#1C1918]/60">Comensales:</span>
                <span className="font-medium text-[#1C1918]">{guests} personas</span>
              </div>
              <div className="flex justify-between border-b border-[#1C1918]/10 pb-2">
                <span className="text-[#1C1918]/60">Zona Elegida:</span>
                <span className="font-medium text-[#4B6B38]">{seatingArea}</span>
              </div>
              {specialOccasion !== 'Ninguna' && (
                <div className="flex justify-between">
                  <span className="text-[#1C1918]/60">Motivo:</span>
                  <span className="font-medium text-[#C05041]">{specialOccasion}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#1C1918] text-[#EEDBC5] text-xs font-semibold tracking-wider uppercase rounded-md hover:bg-[#2D2826] transition-colors"
              >
                Hacer Otra Reserva
              </button>
            </div>
          </div>
        ) : (
          /* High Affordance Booking Form */
          <form
            onSubmit={handleSubmit}
            className="bg-[#EEDBC5] p-6 sm:p-10 rounded-2xl border border-[#1C1918]/15 shadow-sm space-y-8"
          >
            {errorMsg && (
              <div className="p-4 bg-[#C05041]/10 border border-[#C05041]/30 rounded-lg flex items-center gap-3 text-xs sm:text-sm text-[#C05041]">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Step 1: Area & Space Selection */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-widest text-[#1C1918]">
                1. Selección de Estancia o Espacio
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {SEATING_AREAS.map((item) => {
                  const selected = seatingArea === item.area;
                  return (
                    <div
                      key={item.area}
                      onClick={() => setSeatingArea(item.area)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        selected
                          ? 'bg-[#1C1918] text-[#FAF6EE] border-[#1C1918] shadow-md ring-1 ring-[#C05041]'
                          : 'bg-[#FAF6EE] text-[#1C1918] border-[#1C1918]/10 hover:border-[#1C1918]/30'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-[10px] uppercase font-bold tracking-wider ${selected ? 'text-[#CA8A8C]' : 'text-[#4B6B38]'}`}>
                            {item.badge}
                          </span>
                          {selected && <Sparkles className="w-3.5 h-3.5 text-[#C05041]" />}
                        </div>
                        <h4 className="font-serif text-base font-semibold leading-tight">{item.area}</h4>
                        <p className={`text-xs mt-1.5 leading-relaxed ${selected ? 'text-[#FAF6EE]/75' : 'text-[#1C1918]/65'}`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Date, Time & Guests */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#1C1918]/10">
              
              {/* Date */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1918] flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#C05041]" />
                  <span>Fecha</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#1C1918]/20 rounded-md text-xs sm:text-sm text-[#1C1918] focus:outline-none focus:ring-1 focus:ring-[#C05041]"
                  required
                />
              </div>

              {/* Number of Guests */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1918] flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#C05041]" />
                  <span>Comensales</span>
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setGuests(num)}
                      className={`flex-1 py-2 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                        guests === num
                          ? 'bg-[#C05041] text-white shadow-xs'
                          : 'bg-[#FAF6EE] text-[#1C1918] hover:bg-[#FAF6EE]/80 border border-[#1C1918]/15'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Occasion */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1918]">
                  Ocasión Especial
                </label>
                <select
                  value={specialOccasion}
                  onChange={(e) => setSpecialOccasion(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#1C1918]/20 rounded-md text-xs sm:text-sm text-[#1C1918] focus:outline-none focus:ring-1 focus:ring-[#C05041]"
                >
                  <option value="Ninguna">Cena estándar</option>
                  <option value="Aniversario">Aniversario de pareja</option>
                  <option value="Cumpleaños">Celebración de cumpleaños</option>
                  <option value="Cena de Negocios">Cena corporativa / negocios</option>
                  <option value="Celebración">Otra celebración</option>
                </select>
              </div>

            </div>

            {/* Time Slot Picker */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1918] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#C05041]" />
                <span>Horario Deseado</span>
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {TIME_SLOTS.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setTime(slot)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-md tabular-nums transition-colors cursor-pointer ${
                      time === slot
                        ? 'bg-[#1C1918] text-[#EEDBC5] ring-1 ring-[#C05041]'
                        : 'bg-[#FAF6EE] text-[#1C1918] hover:bg-[#FAF6EE]/90 border border-[#1C1918]/15'
                    }`}
                  >
                    {slot} h
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Customer Information */}
            <div className="space-y-4 pt-4 border-t border-[#1C1918]/10">
              <label className="block text-xs font-bold uppercase tracking-widest text-[#1C1918]">
                2. Datos de Contacto del Titular
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#1C1918]/70 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ej. Rodrigo San Martín"
                    className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#1C1918]/20 rounded-md text-xs sm:text-sm text-[#1C1918] placeholder-[#1C1918]/40 focus:outline-none focus:ring-1 focus:ring-[#C05041]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#1C1918]/70 mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#1C1918]/20 rounded-md text-xs sm:text-sm text-[#1C1918] placeholder-[#1C1918]/40 focus:outline-none focus:ring-1 focus:ring-[#C05041]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#1C1918]/70 mb-1">
                    Teléfono Móvil *
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+34 600 000 000"
                    className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#1C1918]/20 rounded-md text-xs sm:text-sm text-[#1C1918] placeholder-[#1C1918]/40 focus:outline-none focus:ring-1 focus:ring-[#C05041]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#1C1918]/70 mb-1">
                  Alergias, restricciones dietéticas o peticiones especiales
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej. Una persona alérgica al marisco / Preferencia de asiento esquinero..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#1C1918]/20 rounded-md text-xs sm:text-sm text-[#1C1918] placeholder-[#1C1918]/40 focus:outline-none focus:ring-1 focus:ring-[#C05041]"
                />
              </div>
            </div>

            {/* Bottom Form Actions */}
            <div className="pt-4 border-t border-[#1C1918]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#1C1918]/65">
                <ShieldCheck className="w-4 h-4 text-[#4B6B38]" />
                <span>Confirmación inmediata sin cargos de cancelación hasta 4 horas antes.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#C05041] hover:bg-[#A84234] text-white font-medium text-xs sm:text-sm uppercase tracking-wider rounded-md shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isSubmitting ? 'Procesando...' : 'Confirmar Reserva de Mesa'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
