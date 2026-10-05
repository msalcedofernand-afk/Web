import React from 'react';
import { ArrowRight, Utensils, Award } from 'lucide-react';
import { DishArtwork } from '../DishArtwork';

interface HeroProps {
  onExploreMenu: () => void;
  onBookTable: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onBookTable }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Seigaiha waves pattern container */}
      <div className="absolute inset-0 bg-seigaiha opacity-20 pointer-events-none" />

      {/* Decorative vertical Japanese calligraphy watermark-free badge */}
      <div className="hidden xl:flex flex-col items-center absolute left-8 top-28 text-[#1C1918]/30 font-serif select-none pointer-events-none">
        <span className="text-xl tracking-widest writing-mode-vertical">旬の極み</span>
        <span className="w-px h-16 bg-[#1C1918]/20 my-3" />
        <span className="text-xs tracking-widest uppercase">Tradición &amp; Vanguardia</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Greeting & Appetite-Driven Narrative */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Minimalist kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#C05041]">
              <span>Restaurante Sushi &amp; Makis de Autor</span>
              <span aria-hidden="true" className="text-[#CA8A8C]">·</span>
              <span className="text-[#1C1918]/60">Madrid Gourmet</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1C1918] leading-[1.08] tracking-tight text-balance">
              El arte sagrado del sushi, elevado a la{' '}
              <span className="italic font-normal text-[#C05041]">perfección contemporánea</span>.
            </h1>

            {/* Prose description */}
            <p className="text-base sm:text-lg text-[#1C1918]/80 leading-relaxed max-w-xl">
              En Ayuki fusionamos las técnicas milenarias del periodo Edo con pescados salvajes de lonja diaria, cortes de Wagyu A5 a la brasa Binchotan y makis de autor que despiertan el paladar.
            </p>

            {/* Interactive Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onBookTable}
                className="px-7 py-3.5 bg-[#C05041] hover:bg-[#A84234] text-white font-medium text-sm tracking-wide uppercase rounded-md shadow-sm transition-all duration-200 text-center flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Reservar Experiencia</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 bg-[#1C1918] hover:bg-[#2D2826] text-[#EEDBC5] font-medium text-sm tracking-wide uppercase rounded-md transition-colors text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <Utensils className="w-4 h-4 text-[#AAB384]" />
                <span>Explorar La Carta</span>
              </button>
            </div>

            {/* Trust Markers & Credentials (Adjacent proof) */}
            <div className="pt-6 border-t border-[#1C1918]/10 grid grid-cols-3 gap-4 text-[#1C1918]">
              <div>
                <p className="font-serif text-2xl font-semibold text-[#1C1918] tabular-nums">48h</p>
                <p className="text-xs text-[#1C1918]/65 mt-0.5">Maduración Shime Saba y Miso Saikyo</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-semibold text-[#1C1918] tabular-nums">A5</p>
                <p className="text-xs text-[#1C1918]/65 mt-0.5">Wagyu certificado de Kagoshima</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-semibold text-[#1C1918] tabular-nums">100%</p>
                <p className="text-xs text-[#1C1918]/65 mt-0.5">Arroz Koshihikari con vinagre Akazu</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual on Dark Slate Plate */}
          <div className="lg:col-span-6 relative">
            {/* Visual Container */}
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer decorative ring in Terracotta & Washi paper styling */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#C05041]/20 via-[#AAB384]/20 to-transparent rounded-2xl blur-lg pointer-events-none" />

              <div className="relative bg-[#171514] rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#2D2826] text-[#FAF6EE]">
                {/* Visual Top Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-[#2C2725]">
                  <div>
                    <span className="text-[11px] font-mono tracking-widest text-[#AAB384] uppercase">
                      Selección del Maestro Kenji
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl text-[#FAF6EE] mt-0.5">
                      Omakase Grand Slate
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[#CA8A8C] uppercase tracking-wider block">Servicio Hoy</span>
                    <span className="text-xs font-semibold text-[#EEDBC5]">10 Piezas Nobles</span>
                  </div>
                </div>

                {/* Central Slate Artwork Presentation */}
                <div className="py-2">
                  <DishArtwork
                    artworkType="dragon"
                    title="Ayuki Signature Dragon Roll & Nigiri"
                    className="h-64 sm:h-72 w-full rounded-lg"
                    isSpecial={true}
                  />
                </div>

                {/* Bottom Spec Sheet */}
                <div className="pt-4 border-t border-[#2C2725] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C05041]" />
                    <span className="text-[#EEDBC5]/80">Anguila Kabayaki, Ventresca Otoro &amp; Wasabi de Shizuoka</span>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-lg font-semibold text-[#AAB384] tabular-nums">
                      34.00 €
                    </span>
                  </div>
                </div>

              </div>

              {/* Floating Chef Quote Note */}
              <div className="hidden sm:block absolute -bottom-6 -left-6 bg-[#EEDBC5] border border-[#1C1918]/15 text-[#1C1918] p-4 rounded-lg shadow-lg max-w-xs">
                <p className="font-serif italic text-xs leading-relaxed">
                  "El sushi no es solo técnica, es el respeto absoluto por el tiempo y la marea."
                </p>
                <div className="mt-2 text-[11px] font-semibold text-[#C05041]">
                  — Kenji Takahashi, Chef Ejecutivo
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
