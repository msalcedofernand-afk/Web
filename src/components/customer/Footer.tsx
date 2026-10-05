import React from 'react';
import { MapPin, Phone, Mail, Instagram, Shield } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onBookClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onBookClick }) => {
  return (
    <footer className="bg-[#1C1918] text-[#EEDBC5] border-t border-[#2C2725] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#2C2725]">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div>
              <span className="font-serif text-2xl tracking-[0.2em] font-light text-white uppercase">
                Ayuki
              </span>
              <span className="block text-xs tracking-[0.3em] text-[#CA8A8C] font-serif">
                あゆき · 鮨と巻き
              </span>
            </div>
            <p className="text-xs text-[#EEDBC5]/70 leading-relaxed">
              Alta gastronomía japonesa contemporánea. Nigiris de autor, makis de precisión y cocina robata en el corazón de la ciudad.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#AAB384]">
              <span>Kagoshima Wagyu</span>
              <span>·</span>
              <span>Galicia Bluefin</span>
              <span>·</span>
              <span>Uji Matcha</span>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm uppercase tracking-wider text-white">
              Ubicación &amp; Contacto
            </h4>
            <div className="space-y-2 text-xs text-[#EEDBC5]/80">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C05041] shrink-0 mt-0.5" />
                <span>Calle Velázquez 48, Barrio de Salamanca, 28001 Madrid</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#AAB384] shrink-0" />
                <span>+34 910 882 145</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#CA8A8C] shrink-0" />
                <span>reservas@ayukisushi.es</span>
              </p>
            </div>
          </div>

          {/* Service Hours */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm uppercase tracking-wider text-white">
              Horario de Servicios
            </h4>
            <div className="space-y-1.5 text-xs text-[#EEDBC5]/80">
              <div className="flex justify-between">
                <span>Martes a Jueves:</span>
                <span className="text-white">13:30 - 16:00 / 20:30 - 23:30</span>
              </div>
              <div className="flex justify-between">
                <span>Viernes y Sábado:</span>
                <span className="text-white">13:30 - 16:30 / 20:30 - 00:00</span>
              </div>
              <div className="flex justify-between">
                <span>Domingo:</span>
                <span className="text-white">13:30 - 16:30 (Solo comidas)</span>
              </div>
              <div className="flex justify-between text-[#C05041]">
                <span>Lunes:</span>
                <span>Cerrado</span>
              </div>
            </div>
          </div>

          {/* Booking & Staff access */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm uppercase tracking-wider text-white">
              Experiencia &amp; Gestión
            </h4>
            <p className="text-xs text-[#EEDBC5]/70">
              ¿Deseas organizar un evento privado o una cata de sake exclusiva?
            </p>
            <div className="space-y-2 pt-1">
              <button
                onClick={onBookClick}
                className="w-full py-2 bg-[#C05041] hover:bg-[#A84234] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
              >
                Reservar Mesa Ahora
              </button>
              
              <button
                onClick={onOpenAdmin}
                className="w-full py-2 bg-[#282422] hover:bg-[#342F2D] text-[#AAB384] text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 border border-[#38322E]"
              >
                <Shield className="w-3.5 h-3.5 text-[#AAB384]" />
                <span>Panel de Administración Staff</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#EEDBC5]/50 gap-4">
          <p>© 2026 Ayuki Japanese Restaurant. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <span>Aviso Legal</span>
            <span>Política de Privacidad</span>
            <span>Alérgenos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
