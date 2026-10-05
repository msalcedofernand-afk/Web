import React, { useState } from 'react';
import { ShoppingBag, Calendar, Shield, Menu as MenuIcon, X } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenCart: () => void;
  cartCount: number;
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmin,
  onOpenCart,
  cartCount,
  onBookClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#1C1918] text-[#EEDBC5] border-b border-[#2C2725] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Zone: Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wide">
            <button
              onClick={() => scrollTo('hero')}
              className="text-[#EEDBC5]/80 hover:text-white transition-colors cursor-pointer"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollTo('menu')}
              className="text-[#EEDBC5]/80 hover:text-white transition-colors cursor-pointer"
            >
              La Carta
            </button>
            <button
              onClick={() => scrollTo('experiencia')}
              className="text-[#EEDBC5]/80 hover:text-white transition-colors cursor-pointer"
            >
              Filosofía &amp; Omakase
            </button>
            <button
              onClick={() => scrollTo('reservas')}
              className="text-[#EEDBC5]/80 hover:text-white transition-colors cursor-pointer"
            >
              Reservar Mesa
            </button>
          </nav>

          {/* Center Zone: Centered Brand Wordmark */}
          <div className="flex flex-col items-center justify-center cursor-pointer" onClick={() => scrollTo('hero')}>
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] font-light text-[#FAF6EE] uppercase">
              Ayuki
            </span>
            <span className="text-[11px] tracking-[0.4em] text-[#CA8A8C] font-light -mt-1 font-serif">
              あゆき · 鮨
            </span>
          </div>

          {/* Right Zone: Actions (Terracotta CTA, Cart, Admin) */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* View Admin switcher */}
            <button
              onClick={onOpenAdmin}
              className="px-3 py-1.5 text-xs text-[#EEDBC5]/70 hover:text-[#EEDBC5] hover:bg-[#282422] rounded-md transition-colors flex items-center gap-1.5 border border-[#38322F]"
              title="Acceder al Panel de Administración"
            >
              <Shield className="w-3.5 h-3.5 text-[#AAB384]" />
              <span className="hidden md:inline">Panel Admin</span>
            </button>

            {/* Shopping bag / Comanda drawer toggle */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-[#EEDBC5]/80 hover:text-white hover:bg-[#282422] rounded-md transition-colors cursor-pointer"
              aria-label="Ver comanda"
            >
              <ShoppingBag className="w-5 h-5 text-[#EEDBC5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C05041] text-white text-[11px] font-semibold w-5 h-5 rounded-full flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Prominent Terracotta Red CTA */}
            <button
              onClick={onBookClick}
              className="px-5 py-2.5 bg-[#C05041] hover:bg-[#A84234] text-white text-xs sm:text-sm font-medium tracking-wide uppercase rounded-md shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservar Mesa</span>
            </button>
          </div>

          {/* Mobile hamburger & cart */}
          <div className="flex items-center space-x-2 sm:hidden">
            <button
              onClick={onOpenCart}
              className="relative p-2 text-[#EEDBC5]"
              aria-label="Ver comanda"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C05041] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#EEDBC5] hover:bg-[#282422] rounded-md"
              aria-label="Menú principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#171514] border-b border-[#2C2725] px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => scrollTo('hero')}
            className="block w-full text-left py-2 text-base text-[#EEDBC5]/90 hover:text-white"
          >
            Inicio
          </button>
          <button
            onClick={() => scrollTo('menu')}
            className="block w-full text-left py-2 text-base text-[#EEDBC5]/90 hover:text-white"
          >
            La Carta &amp; Makis
          </button>
          <button
            onClick={() => scrollTo('experiencia')}
            className="block w-full text-left py-2 text-base text-[#EEDBC5]/90 hover:text-white"
          >
            Experiencia Omakase
          </button>
          <button
            onClick={() => scrollTo('reservas')}
            className="block w-full text-left py-2 text-base text-[#EEDBC5]/90 hover:text-white"
          >
            Reservas
          </button>
          <div className="pt-2 border-t border-[#2C2725] flex flex-col gap-2">
            <button
              onClick={onBookClick}
              className="w-full py-2.5 bg-[#C05041] text-white text-sm font-medium tracking-wide uppercase rounded-md text-center"
            >
              Reservar Mesa
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2 bg-[#282422] text-[#AAB384] text-sm font-medium rounded-md text-center flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Acceso a Panel de Administración
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
