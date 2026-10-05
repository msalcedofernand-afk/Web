import React from 'react';

interface DishArtworkProps {
  artworkType: 'nigiri' | 'maki' | 'dragon' | 'tartare' | 'wagyu' | 'ramen' | 'sake' | 'matcha' | 'mochi' | 'gyoza';
  title: string;
  className?: string;
  isSpecial?: boolean;
}

export const DishArtwork: React.FC<DishArtworkProps> = ({
  artworkType,
  title,
  className = 'h-52 w-full',
  isSpecial = false,
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-t-xl bg-[#171514] flex items-center justify-center select-none ${className}`}
      role="img"
      aria-label={title}
    >
      {/* Dark slate ceramic stone texture effect */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2E2A27_1px,transparent_1px)] [background-size:12px_12px]" />
      
      {/* Subtle warm rim light */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#C05041]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-[#AAB384]/15 rounded-full blur-2xl pointer-events-none" />

      {/* Subtle Japanese stamp / seal in corner */}
      <div className="absolute top-3 left-3 opacity-25 flex items-center gap-1 font-serif text-[10px] tracking-widest text-[#EEDBC5] pointer-events-none uppercase">
        <span className="w-2.5 h-2.5 border border-[#C05041] rounded-xs flex items-center justify-center text-[7px] text-[#C05041]">
          亜
        </span>
        Ayuki Craft
      </div>

      {isSpecial && (
        <div className="absolute top-3 right-3 text-[10px] tracking-wider font-medium uppercase px-2 py-0.5 rounded-sm bg-[#C05041] text-[#EEDBC5] shadow-xs">
          Firma
        </div>
      )}

      {/* SVG Culinary Masterpiece Rendering */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-3">
        {artworkType === 'dragon' && (
          <svg viewBox="0 0 280 180" className="w-full h-full max-h-44 drop-shadow-xl" fill="none">
            {/* Dark Slate Platter */}
            <rect x="25" y="35" width="230" height="110" rx="14" fill="#201D1B" stroke="#38332F" strokeWidth="1.5" />
            <path d="M35 130 C90 142, 190 142, 245 130" stroke="#141211" strokeWidth="3" opacity="0.6" />
            
            {/* Unagi Glaze drizzle trails */}
            <path d="M40 75 Q110 50, 180 85 T240 70" stroke="#3A160F" strokeWidth="3.5" strokeLinecap="round" opacity="0.75" />
            <path d="M50 115 Q120 130, 220 100" stroke="#C05041" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
            
            {/* Maki roll 1 */}
            <g transform="translate(55, 65)">
              <ellipse cx="25" cy="25" rx="22" ry="18" fill="#1C1918" stroke="#12100F" strokeWidth="2" />
              <ellipse cx="25" cy="25" rx="17" ry="13" fill="#FAF6EE" />
              <circle cx="25" cy="25" r="7" fill="#F27A59" />
              <circle cx="21" cy="23" r="3.5" fill="#75A051" />
              <circle cx="29" cy="27" r="3" fill="#DFA242" />
              {/* Avocado slice layer */}
              <path d="M7 18 Q25 9, 43 18" stroke="#688F3C" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Tobiko roe */}
              <circle cx="20" cy="18" r="1.2" fill="#E8823B" />
              <circle cx="23" cy="16" r="1.2" fill="#E8823B" />
              <circle cx="27" cy="17" r="1.2" fill="#E8823B" />
            </g>

            {/* Maki roll 2 (Dragon Centerpiece) */}
            <g transform="translate(110, 60)">
              <ellipse cx="30" cy="28" rx="26" ry="22" fill="#1C1918" stroke="#12100F" strokeWidth="2" />
              <ellipse cx="30" cy="28" rx="20" ry="16" fill="#FFFDF8" />
              <circle cx="30" cy="28" r="9" fill="#D95338" />
              <circle cx="25" cy="26" r="4.5" fill="#688F3C" />
              <circle cx="36" cy="30" r="4" fill="#EAA842" />
              {/* Unagi top */}
              <path d="M9 20 Q30 7, 51 20" stroke="#4A1D13" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <path d="M11 20 Q30 9, 49 20" stroke="#7A3926" strokeWidth="2" strokeLinecap="round" fill="none" />
              {/* Sesame seeds */}
              <ellipse cx="28" cy="13" rx="1" ry="2" fill="#F4E9D8" transform="rotate(25, 28, 13)" />
              <ellipse cx="34" cy="14" rx="1" ry="2" fill="#F4E9D8" transform="rotate(-30, 34, 14)" />
              <ellipse cx="23" cy="15" rx="1" ry="2" fill="#201C1A" />
            </g>

            {/* Maki roll 3 */}
            <g transform="translate(175, 68)">
              <ellipse cx="22" cy="22" rx="20" ry="16" fill="#1C1918" stroke="#12100F" strokeWidth="2" />
              <ellipse cx="22" cy="22" rx="15" ry="11" fill="#FAF6EE" />
              <circle cx="22" cy="22" r="6" fill="#F27A59" />
              <circle cx="18" cy="20" r="3" fill="#688F3C" />
              <path d="M6 16 Q22 8, 38 16" stroke="#688F3C" strokeWidth="2.8" strokeLinecap="round" fill="none" />
            </g>

            {/* Wasabi Quenelle */}
            <path d="M225 110 C222 102, 236 98, 238 106 C240 114, 228 116, 225 110 Z" fill="#9AB573" />
            
            {/* Pickled Gari Ginger rose */}
            <path d="M48 60 C42 54, 52 46, 56 52 C60 58, 54 64, 48 60 Z" fill="#E5999E" opacity="0.85" />
          </svg>
        )}

        {artworkType === 'maki' && (
          <svg viewBox="0 0 280 180" className="w-full h-full max-h-44 drop-shadow-xl" fill="none">
            <rect x="25" y="35" width="230" height="110" rx="14" fill="#201D1B" stroke="#38332F" strokeWidth="1.5" />
            {/* Bamboo leaf coaster underneath */}
            <path d="M38 120 C90 85, 170 85, 238 115" stroke="#4F633E" strokeWidth="12" strokeLinecap="round" opacity="0.45" />

            {/* Set of 3 Maki rolls */}
            <g transform="translate(60, 68)">
              <circle cx="24" cy="24" r="22" fill="#1C1918" />
              <circle cx="24" cy="24" r="17" fill="#FBF8F1" />
              <circle cx="24" cy="24" r="8" fill="#F07158" />
              <circle cx="21" cy="21" r="3.5" fill="#759F4B" />
              <path d="M7 24 C14 10, 34 10, 41 24" stroke="#D96347" strokeWidth="3" fill="none" />
            </g>

            <g transform="translate(116, 62)">
              <circle cx="26" cy="26" r="24" fill="#1C1918" />
              <circle cx="26" cy="26" r="18" fill="#FFFDF9" />
              <circle cx="26" cy="26" r="9" fill="#E65E45" />
              <circle cx="22" cy="22" r="4" fill="#759F4B" />
              <circle cx="30" cy="29" r="3.5" fill="#E5B252" />
              {/* Truffle flake & sesame */}
              <rect x="24" y="24" width="4" height="4" rx="1" fill="#1B1716" />
              <circle cx="20" cy="14" r="1" fill="#FAF2E6" />
              <circle cx="32" cy="14" r="1" fill="#FAF2E6" />
            </g>

            <g transform="translate(176, 68)">
              <circle cx="24" cy="24" r="22" fill="#1C1918" />
              <circle cx="24" cy="24" r="17" fill="#FBF8F1" />
              <circle cx="24" cy="24" r="8" fill="#F07158" />
              <circle cx="27" cy="27" r="3.5" fill="#759F4B" />
            </g>

            {/* Wasabi & ginger */}
            <circle cx="230" cy="65" r="7" fill="#AAB384" />
            <path d="M45 75 Q48 65, 55 70 T48 82 Z" fill="#CA8A8C" />
          </svg>
        )}

        {artworkType === 'nigiri' && (
          <svg viewBox="0 0 280 180" className="w-full h-full max-h-44 drop-shadow-xl" fill="none">
            <rect x="25" y="35" width="230" height="110" rx="14" fill="#201D1B" stroke="#38332F" strokeWidth="1.5" />
            
            {/* Shari (rice ball) 1 */}
            <g transform="translate(60, 68)">
              <rect x="10" y="22" width="65" height="24" rx="12" fill="#FBF7EE" />
              {/* Otoro Tuna slice */}
              <path d="M5 24 C10 8, 75 8, 80 24 C75 32, 10 32, 5 24 Z" fill="#C23E4B" />
              {/* Marbling lines */}
              <path d="M18 16 Q45 22, 70 16" stroke="#E57D88" strokeWidth="1.5" fill="none" opacity="0.8" />
              <path d="M22 22 Q48 26, 66 22" stroke="#E57D88" strokeWidth="1.2" fill="none" opacity="0.8" />
              {/* Gold leaf touch */}
              <path d="M42 15 L45 13 L47 16 L44 18 Z" fill="#E8C35A" />
              {/* Tare glaze shine */}
              <ellipse cx="44" cy="18" rx="14" ry="3" fill="#D65863" opacity="0.6" />
            </g>

            {/* Shari 2 - Salmon Nigiri */}
            <g transform="translate(145, 68)">
              <rect x="10" y="22" width="65" height="24" rx="12" fill="#FBF7EE" />
              {/* Salmon slice */}
              <path d="M5 24 C10 8, 75 8, 80 24 C75 32, 10 32, 5 24 Z" fill="#ED7756" />
              {/* Salmon white stripes */}
              <path d="M18 14 L30 30" stroke="#FFF0E6" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
              <path d="M35 12 L47 30" stroke="#FFF0E6" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
              <path d="M52 12 L64 28" stroke="#FFF0E6" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
              {/* Nori belt */}
              <rect x="40" y="8" width="8" height="38" rx="2" fill="#1C1918" />
              {/* Caviar on top */}
              <circle cx="44" cy="9" r="2.2" fill="#161413" stroke="#3A3634" strokeWidth="0.8" />
              <circle cx="42" cy="13" r="2" fill="#161413" stroke="#3A3634" strokeWidth="0.8" />
            </g>

            <path d="M228 105 C225 96, 240 94, 240 102 C240 110, 230 112, 228 105 Z" fill="#9FB876" />
          </svg>
        )}

        {artworkType === 'tartare' && (
          <svg viewBox="0 0 280 180" className="w-full h-full max-h-44 drop-shadow-xl" fill="none">
            <rect x="25" y="35" width="230" height="110" rx="14" fill="#201D1B" stroke="#38332F" strokeWidth="1.5" />
            {/* Circular ceramic presentation ring */}
            <circle cx="140" cy="90" r="46" fill="#1A1817" stroke="#2D2926" strokeWidth="2" />
            
            {/* Tartare base - avocado layer */}
            <circle cx="140" cy="90" r="36" fill="#789F4A" />
            {/* Tuna cube layer */}
            <circle cx="140" cy="88" r="30" fill="#B83A42" />
            <rect x="122" y="74" width="8" height="8" rx="1.5" fill="#CD4B53" />
            <rect x="133" y="72" width="9" height="9" rx="1.5" fill="#9B2931" />
            <rect x="145" y="75" width="9" height="9" rx="1.5" fill="#C53E47" />
            <rect x="125" y="86" width="9" height="9" rx="1.5" fill="#A8323A" />
            <rect x="137" y="85" width="10" height="10" rx="1.5" fill="#C53E47" />
            <rect x="148" y="87" width="8" height="8" rx="1.5" fill="#8E242B" />

            {/* Quail egg yolk or golden yuzu sphere in center */}
            <circle cx="140" cy="87" r="7" fill="#F0AC3A" stroke="#FFA31A" strokeWidth="1" />
            
            {/* Microgreens and sesame */}
            <path d="M136 78 Q138 72, 144 76" stroke="#4A752C" strokeWidth="1.5" fill="none" />
            <path d="M142 80 Q148 74, 146 69" stroke="#4A752C" strokeWidth="1.5" fill="none" />
            <circle cx="132" cy="98" r="1" fill="#FFF5EA" />
            <circle cx="148" cy="99" r="1" fill="#FFF5EA" />
            
            {/* Nori crisps on side */}
            <polygon points="70,95 85,70 100,90 85,115" fill="#121815" stroke="#25302A" strokeWidth="1.5" />
            <polygon points="180,92 195,68 210,88 195,112" fill="#121815" stroke="#25302A" strokeWidth="1.5" />
          </svg>
        )}

        {artworkType === 'wagyu' && (
          <svg viewBox="0 0 280 180" className="w-full h-full max-h-44 drop-shadow-xl" fill="none">
            <rect x="25" y="35" width="230" height="110" rx="14" fill="#201D1B" stroke="#38332F" strokeWidth="1.5" />
            {/* Charcoal grill grate lines */}
            <line x1="45" y1="90" x2="235" y2="90" stroke="#38312E" strokeWidth="1.5" />
            <line x1="45" y1="75" x2="235" y2="75" stroke="#38312E" strokeWidth="1.5" />
            <line x1="45" y1="105" x2="235" y2="105" stroke="#38312E" strokeWidth="1.5" />

            {/* Wagyu medallion 1 */}
            <g transform="translate(65, 62)">
              <rect x="0" y="0" width="46" height="52" rx="7" fill="#4B201B" stroke="#2E120E" strokeWidth="1.5" />
              {/* Sear lines */}
              <line x1="6" y1="10" x2="40" y2="44" stroke="#1D0A08" strokeWidth="2.5" />
              <line x1="6" y1="24" x2="34" y2="50" stroke="#1D0A08" strokeWidth="2" />
              <line x1="16" y1="6" x2="44" y2="34" stroke="#1D0A08" strokeWidth="2" />
              {/* Wagyu rosy core */}
              <circle cx="23" cy="26" r="10" fill="#992B2E" opacity="0.75" />
              {/* Sea salt flake */}
              <rect x="20" y="20" width="3" height="3" fill="#FFFFFF" />
            </g>

            {/* Wagyu medallion 2 */}
            <g transform="translate(118, 60)">
              <rect x="0" y="0" width="48" height="54" rx="7" fill="#52231E" stroke="#2E120E" strokeWidth="1.5" />
              <line x1="6" y1="12" x2="42" y2="46" stroke="#1D0A08" strokeWidth="2.5" />
              <line x1="18" y1="6" x2="46" y2="34" stroke="#1D0A08" strokeWidth="2" />
              <circle cx="24" cy="27" r="11" fill="#A83034" opacity="0.7" />
              <rect x="25" y="22" width="3.5" height="3.5" fill="#FFFFFF" />
            </g>

            {/* Blistered Shishito Pepper */}
            <path d="M175 75 Q195 65, 215 78 Q225 85, 222 95 Q205 105, 185 92 Z" fill="#4C6E33" stroke="#334D21" strokeWidth="1.5" />
            {/* Char blisters */}
            <ellipse cx="196" cy="80" rx="4" ry="2" fill="#1C1918" />
            <ellipse cx="208" cy="86" rx="3" ry="1.5" fill="#1C1918" />
          </svg>
        )}

        {artworkType === 'ramen' && (
          <svg viewBox="0 0 280 180" className="w-full h-full max-h-44 drop-shadow-xl" fill="none">
            <rect x="25" y="35" width="230" height="110" rx="14" fill="#201D1B" stroke="#38332F" strokeWidth="1.5" />
            {/* Ramen Bowl rim */}
            <circle cx="140" cy="90" r="48" fill="#1C1918" stroke="#A94336" strokeWidth="3" />
            {/* Rich Tonkotsu broth */}
            <circle cx="140" cy="90" r="43" fill="#D3A775" />
            
            {/* Black garlic oil swirl */}
            <path d="M120 78 Q135 68, 155 75 Q170 85, 155 100 Q135 110, 125 95" stroke="#1E1917" strokeWidth="3.5" fill="none" opacity="0.8" />
            
            {/* Ajitsuke Tamago (Half-soft boiled egg) */}
            <g transform="translate(142, 66)">
              <ellipse cx="16" cy="14" rx="14" ry="12" fill="#FFF7ED" stroke="#B87D43" strokeWidth="1.2" />
              <circle cx="17" cy="14" r="7.5" fill="#F39C24" />
              <circle cx="17" cy="14" r="4.5" fill="#E66E17" />
            </g>

            {/* Chashu slice */}
            <ellipse cx="118" cy="96" rx="16" ry="12" fill="#935748" stroke="#5D342B" strokeWidth="1.5" />
            <path d="M106 96 Q118 90, 130 96" stroke="#C28678" strokeWidth="1.5" fill="none" />

            {/* Scallions and nori */}
            <circle cx="138" cy="106" r="3" fill="#4B7733" />
            <circle cx="145" cy="108" r="2.5" fill="#588B3C" />
            <circle cx="142" cy="114" r="2.5" fill="#588B3C" />
            <rect x="98" y="60" width="16" height="24" rx="2" fill="#152119" transform="rotate(-15, 98, 60)" />
          </svg>
        )}

        {artworkType === 'sake' && (
          <svg viewBox="0 0 280 180" className="w-full h-full max-h-44 drop-shadow-xl" fill="none">
            <rect x="25" y="35" width="230" height="110" rx="14" fill="#201D1B" stroke="#38332F" strokeWidth="1.5" />
            {/* Tokkuri (Sake Carafe) */}
            <g transform="translate(100, 52)">
              <path d="M22 0 L30 0 L32 18 C38 24, 48 38, 46 64 C44 76, 36 82, 26 82 C16 82, 8 76, 6 64 C4 38, 14 24, 20 18 Z" fill="#E8DEC9" stroke="#9E8D71" strokeWidth="1.5" />
              {/* Calligraphy label */}
              <rect x="18" y="35" width="16" height="28" rx="1.5" fill="#FAF6EC" stroke="#CBB99F" strokeWidth="1" />
              <line x1="26" y1="39" x2="26" y2="58" stroke="#1C1918" strokeWidth="1.8" />
              <circle x="26" y="55" r="1.5" fill="#C05041" />
            </g>

            {/* Ochoko (Sake Cup) 1 */}
            <g transform="translate(165, 88)">
              <ellipse cx="18" cy="14" rx="16" ry="10" fill="#E8DEC9" stroke="#9E8D71" strokeWidth="1.5" />
              {/* Inner blue spiral (Janome traditional bullseye) */}
              <ellipse cx="18" cy="14" rx="11" ry="6.5" fill="#FFFFFF" />
              <ellipse cx="18" cy="14" rx="7" ry="4" stroke="#254B7A" strokeWidth="1.8" fill="none" />
              <ellipse cx="18" cy="14" rx="3" ry="1.8" stroke="#254B7A" strokeWidth="1.5" fill="none" />
            </g>

            {/* Ochoko 2 */}
            <g transform="translate(68, 98)">
              <ellipse cx="14" cy="11" rx="13" ry="8" fill="#E8DEC9" stroke="#9E8D71" strokeWidth="1.5" />
              <ellipse cx="14" cy="11" rx="6" ry="3.5" stroke="#254B7A" strokeWidth="1.5" fill="none" />
            </g>
          </svg>
        )}

        {artworkType === 'matcha' && (
          <svg viewBox="0 0 280 180" className="w-full h-full max-h-44 drop-shadow-xl" fill="none">
            <rect x="25" y="35" width="230" height="110" rx="14" fill="#201D1B" stroke="#38332F" strokeWidth="1.5" />
            {/* Chawan (Ceremonial Tea Bowl) */}
            <ellipse cx="140" cy="90" r="44" fill="#28231F" stroke="#483E38" strokeWidth="2.5" />
            {/* Vibrant emerald Matcha froth */}
            <circle cx="140" cy="90" r="38" fill="#588537" />
            <circle cx="140" cy="90" r="32" fill="#699C41" />
            {/* Froth bubbles */}
            <circle cx="132" cy="85" r="2.5" fill="#84BC55" opacity="0.8" />
            <circle cx="144" cy="82" r="3" fill="#84BC55" opacity="0.8" />
            <circle cx="140" cy="95" r="2" fill="#84BC55" opacity="0.8" />
            <circle cx="150" cy="92" r="1.5" fill="#84BC55" opacity="0.8" />

            {/* Bamboo Chasen (Whisk) silhouette nearby */}
            <g transform="translate(60, 68) rotate(-25)">
              <rect x="10" y="0" width="8" height="34" rx="2" fill="#D2B98E" />
              <path d="M8 34 Q14 55, 6 65" stroke="#BF9E6A" strokeWidth="1.5" fill="none" />
              <path d="M14 34 Q14 55, 14 65" stroke="#BF9E6A" strokeWidth="1.5" fill="none" />
              <path d="M20 34 Q14 55, 22 65" stroke="#BF9E6A" strokeWidth="1.5" fill="none" />
            </g>
          </svg>
        )}

        {artworkType === 'mochi' && (
          <svg viewBox="0 0 280 180" className="w-full h-full max-h-44 drop-shadow-xl" fill="none">
            <rect x="25" y="35" width="230" height="110" rx="14" fill="#201D1B" stroke="#38332F" strokeWidth="1.5" />
            
            {/* Mochi 1: Matcha Green */}
            <g transform="translate(62, 70)">
              <ellipse cx="24" cy="22" rx="22" ry="18" fill="#6B9346" stroke="#547734" strokeWidth="1.5" />
              {/* Rice starch powder dusting */}
              <ellipse cx="24" cy="18" rx="15" ry="9" fill="#F4F8EE" opacity="0.45" />
              {/* Gentle dent */}
              <path d="M14 18 Q24 22, 34 18" stroke="#48692B" strokeWidth="1.5" fill="none" opacity="0.6" />
            </g>

            {/* Mochi 2: Sakura Pink */}
            <g transform="translate(116, 64)">
              <ellipse cx="26" cy="24" rx="24" ry="20" fill="#E2949B" stroke="#C5757C" strokeWidth="1.5" />
              <ellipse cx="26" cy="20" rx="16" ry="10" fill="#FFF5F6" opacity="0.5" />
              {/* Preserved sakura blossom on top */}
              <path d="M26 14 Q29 18, 26 22 Q23 18, 26 14 Z" fill="#992A3E" />
              <path d="M20 18 Q24 21, 28 18 Q24 15, 20 18 Z" fill="#992A3E" />
            </g>

            {/* Mochi 3: Kurogoma (Black Sesame) */}
            <g transform="translate(176, 70)">
              <ellipse cx="22" cy="22" rx="20" ry="17" fill="#3D3735" stroke="#252120" strokeWidth="1.5" />
              <ellipse cx="22" cy="18" rx="13" ry="8" fill="#EDE9E6" opacity="0.35" />
              <circle cx="20" cy="16" r="1" fill="#1C1817" />
              <circle cx="24" cy="17" r="1" fill="#1C1817" />
              <circle cx="22" cy="20" r="1" fill="#1C1817" />
            </g>
          </svg>
        )}

        {artworkType === 'gyoza' && (
          <svg viewBox="0 0 280 180" className="w-full h-full max-h-44 drop-shadow-xl" fill="none">
            <rect x="25" y="35" width="230" height="110" rx="14" fill="#201D1B" stroke="#38332F" strokeWidth="1.5" />
            {/* Gyoza 1 */}
            <g transform="translate(58, 65)">
              <path d="M5 32 C12 12, 45 10, 60 28 C45 38, 15 38, 5 32 Z" fill="#F5E8D2" stroke="#CCA775" strokeWidth="1.5" />
              {/* Crispy golden pan skirt */}
              <path d="M8 32 C22 36, 48 36, 58 29" stroke="#9E5D2A" strokeWidth="3" fill="none" />
              {/* Pleats on top */}
              <line x1="20" y1="14" x2="22" y2="24" stroke="#BE9460" strokeWidth="1.5" />
              <line x1="30" y1="13" x2="31" y2="25" stroke="#BE9460" strokeWidth="1.5" />
              <line x1="40" y1="14" x2="39" y2="24" stroke="#BE9460" strokeWidth="1.5" />
            </g>

            {/* Gyoza 2 */}
            <g transform="translate(125, 65)">
              <path d="M5 32 C12 12, 45 10, 60 28 C45 38, 15 38, 5 32 Z" fill="#F5E8D2" stroke="#CCA775" strokeWidth="1.5" />
              <path d="M8 32 C22 36, 48 36, 58 29" stroke="#9E5D2A" strokeWidth="3" fill="none" />
              <line x1="20" y1="14" x2="22" y2="24" stroke="#BE9460" strokeWidth="1.5" />
              <line x1="30" y1="13" x2="31" y2="25" stroke="#BE9460" strokeWidth="1.5" />
              <line x1="40" y1="14" x2="39" y2="24" stroke="#BE9460" strokeWidth="1.5" />
            </g>

            {/* Ponzu dipping dish */}
            <g transform="translate(195, 82)">
              <circle cx="16" cy="16" r="16" fill="#1A1716" stroke="#443D39" strokeWidth="1.5" />
              <circle cx="16" cy="16" r="12" fill="#2E1C15" />
              <circle cx="16" cy="16" r="2" fill="#C05041" opacity="0.6" />
            </g>
          </svg>
        )}
      </div>
    </div>
  );
};
