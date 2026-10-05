import React from 'react';
import { Sparkles, Compass, Flame, ShieldCheck } from 'lucide-react';
import { DishArtwork } from '../DishArtwork';

export const ExperienceStory: React.FC = () => {
  return (
    <section id="experiencia" className="relative py-24 bg-[#1C1918] text-[#EEDBC5] overflow-hidden">
      {/* Subtle Japanese geometric overlay */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#FAF6EE_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Top Lockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#C05041] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#CA8A8C]" />
              <span>Filosofía Shokunin</span>
              <span aria-hidden="true" className="text-[#AAB384]">·</span>
              <span className="font-serif">職人の心</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              Donde la devoción por el corte se convierte en silencio reverente.
            </h2>

            <p className="text-sm sm:text-base text-[#EEDBC5]/80 leading-relaxed">
              En Ayuki honramos el concepto japonés de <em>Shokunin</em>: no solo una maestría técnica de las manos, sino una obligación moral y espiritual de ejecutar cada corte con la máxima pureza para el comensal.
            </p>

            <div className="space-y-4 pt-4 border-t border-[#2E2825]">
              <div className="flex items-start gap-3">
                <Compass className="w-5 h-5 text-[#AAB384] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base text-white">Maduración Shinjuku</h4>
                  <p className="text-xs text-[#EEDBC5]/70 mt-0.5">
                    No todo el pescado se consume de inmediato. Ciertas piezas de atún azul y pez limón maduran entre 3 y 7 días bajo control higrométrico estricto.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Flame className="w-5 h-5 text-[#C05041] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base text-white">Carbón Binchotan de Kishu</h4>
                  <p className="text-xs text-[#EEDBC5]/70 mt-0.5">
                    Nuestra parrilla Robata quema carbón de roble blanco Ubame a más de 900°C sin humo, sellando al instante los jugos y la grasa intramuscular del Wagyu.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#CA8A8C] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base text-white">Arroz Koshihikari &amp; Akazu</h4>
                  <p className="text-xs text-[#EEDBC5]/70 mt-0.5">
                    El shari se prepara tres veces al día con vinagre rojo Akazu envejecido en barricas de sake, servido a la temperatura corporal exacta (36.5°C).
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="space-y-6">
              <div className="bg-[#24201E] p-6 rounded-2xl border border-[#38322E]">
                <DishArtwork
                  artworkType="nigiri"
                  title="Nigiri de Otoro y Salmón"
                  className="h-44 w-full rounded-lg mb-4"
                  isSpecial={true}
                />
                <h4 className="font-serif text-lg text-white font-semibold">Cortes Edomae</h4>
                <p className="text-xs text-[#EEDBC5]/70 mt-1">
                  Incisiones precisas con cuchillos Yanagiba forjados en Sakai para potenciar la penetración de la soja añeja y la dulzura de la ventresca.
                </p>
              </div>

              <div className="bg-[#24201E] p-6 rounded-2xl border border-[#38322E]">
                <div className="flex items-center justify-between pb-3 border-b border-[#38322E] mb-3">
                  <span className="text-xs text-[#CA8A8C] uppercase tracking-wider font-mono">Horario del Servicio</span>
                  <span className="text-xs text-[#AAB384]">Martes a Domingo</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#EEDBC5]/70">Almuerzo:</span>
                    <span className="text-white font-medium">13:00 — 16:30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#EEDBC5]/70">Cena:</span>
                    <span className="text-white font-medium">20:00 — 23:45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#EEDBC5]/70">Lunes:</span>
                    <span className="text-[#C05041] font-medium">Cerrado por descanso</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:mt-8">
              <div className="bg-[#24201E] p-6 rounded-2xl border border-[#38322E]">
                <DishArtwork
                  artworkType="sake"
                  title="Sake Tokkuri y Ochoko"
                  className="h-44 w-full rounded-lg mb-4"
                />
                <h4 className="font-serif text-lg text-white font-semibold">Cava de Sakes Singulares</h4>
                <p className="text-xs text-[#EEDBC5]/70 mt-1">
                  Más de 35 referencias de bodegas artesanales de Niigata, Kioto y Yamaguchi, servidas en recipientes cerámicos de Arita.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#2E201E] to-[#1C1918] p-6 rounded-2xl border border-[#C05041]/30">
                <span className="text-[11px] text-[#C05041] font-bold tracking-widest uppercase">
                  Reconocimiento
                </span>
                <h4 className="font-serif text-xl text-white mt-1">
                  Guía Gastronómica de Madrid
                </h4>
                <p className="text-xs text-[#EEDBC5]/80 mt-2 italic">
                  "Ayuki consigue que cada comensal en su barra sienta el pulso palpitante del mejor mercado de Tokio sin salir de la capital."
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
