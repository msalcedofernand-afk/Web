<?php
require_once __DIR__ . '/config.php';

$bookingSuccess = false;
$bookingRef = '';

// Procesar reserva si se envía por POST
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'book') {
    $name = trim($_POST['name'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $email = trim($_POST['email'] ?? 'contacto@ayuki.com');
    $date = $_POST['date'] ?? date('Y-m-d');
    $time = $_POST['time'] ?? '21:00';
    $guests = intval($_POST['guests'] ?? 2);
    $zone = $_POST['zone'] ?? 'Barra Omakase';
    $notes = trim($_POST['notes'] ?? '');

    if (!empty($name) && !empty($phone)) {
        $bookingRef = 'RES-' . rand(1000, 9999);
        $res = [
            'id' => $bookingRef,
            'date' => $date,
            'time' => $time,
            'name' => $name,
            'phone' => $phone,
            'email' => $email,
            'guests' => $guests,
            'zone' => $zone,
            'status' => 'Pending',
            'notes' => $notes
        ];
        addReservation($res);
        $bookingSuccess = true;
    }
}

$dishes = getDishes();
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ayuki - Premium Japanese Sushi &amp; Makis</title>
  <meta name="description" content="Restaurante japonés exclusivo de sushi y makis de autor en Madrid.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Shippori+Mincho:wght@400;600;700&display=swap" rel="stylesheet">
  <!-- Tailwind CSS CDN para renderizado idéntico sin dependencias -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            ayukiBeige: '#EEDBC5',
            ayukiTerracotta: '#C05041',
            ayukiCharcoal: '#1C1918',
            ayukiMatcha: '#AAB384',
            ayukiMatchaDark: '#4B6B38',
            ayukiSakura: '#CA8A8C'
          },
          fontFamily: {
            serif: ['"Cormorant Garamond"', '"Shippori Mincho"', 'serif'],
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            japanese: ['"Shippori Mincho"', 'serif']
          }
        }
      }
    }
  </script>
  <style>
    /* Patrón sutil Seigaiha tradicional */
    .bg-seigaiha {
      background-color: #EEDBC5;
      background-image: radial-gradient(circle at 100% 150%, #EEDBC5 24%, #E5CFB7 25%, #E5CFB7 28%, #EEDBC5 29%, #EEDBC5 36%, #E5CFB7 37%, #E5CFB7 40%, #EEDBC5 41%, #EEDBC5 48%, #E5CFB7 49%, #E5CFB7 52%, #EEDBC5 53%, #EEDBC5 60%, #E5CFB7 61%, #E5CFB7 64%, #EEDBC5 65%),
        radial-gradient(circle at 0% 150%, #EEDBC5 24%, #E5CFB7 25%, #E5CFB7 28%, #EEDBC5 29%, #EEDBC5 36%, #E5CFB7 37%, #E5CFB7 40%, #EEDBC5 41%, #EEDBC5 48%, #E5CFB7 49%, #E5CFB7 52%, #EEDBC5 53%, #EEDBC5 60%, #E5CFB7 61%, #E5CFB7 64%, #EEDBC5 65%),
        radial-gradient(circle at 50% 100%, #EEDBC5 10%, #E5CFB7 11%, #E5CFB7 14%, #EEDBC5 15%, #EEDBC5 22%, #E5CFB7 23%, #E5CFB7 26%, #EEDBC5 27%, #EEDBC5 34%, #E5CFB7 35%, #E5CFB7 38%, #EEDBC5 39%, #EEDBC5 46%, #E5CFB7 47%, #E5CFB7 50%, #EEDBC5 51%);
      background-size: 80px 40px;
    }
  </style>
</head>
<body class="bg-[#EEDBC5] text-[#1C1918] font-sans antialiased selection:bg-[#C05041] selection:text-white">

  <!-- 1. NAVIGATION BAR (Charcoal background, sticky, centered logo, prominent Terracotta button) -->
  <header class="sticky top-0 z-50 bg-[#1C1918] text-[#EEDBC5] border-b border-[#2C2725] shadow-md">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
      
      <!-- Nav Links -->
      <nav class="hidden md:flex items-center space-x-6 text-xs uppercase tracking-wider font-medium text-[#EEDBC5]/80">
        <a href="#hero" class="hover:text-white transition-colors">Inicio</a>
        <a href="#menu" class="hover:text-white transition-colors">La Carta</a>
        <a href="#filosofia" class="hover:text-white transition-colors">Filosofía</a>
        <a href="#reservas" class="hover:text-white transition-colors">Reservas</a>
      </nav>

      <!-- Centered Logo -->
      <div class="text-center cursor-pointer" onclick="window.scrollTo({top:0, behavior:'smooth'})">
        <span class="font-serif text-2xl sm:text-3xl tracking-[0.25em] font-light text-white uppercase block">
          Ayuki
        </span>
        <span class="text-[10px] tracking-[0.35em] text-[#CA8A8C] font-serif block -mt-1">
          あゆき · 鮨と巻き
        </span>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center space-x-3">
        <a href="admin.php" class="px-3 py-1.5 text-xs text-[#AAB384] hover:text-white hover:bg-[#282422] rounded border border-[#38322E] transition-colors" title="Acceso al Panel de Administración">
          ⚙️ Admin
        </a>
        <a href="#reservas" class="px-4 py-2 bg-[#C05041] hover:bg-[#A84234] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors shadow-xs">
          Book a Table
        </a>
      </div>

    </div>
  </header>

  <!-- 2. HERO SECTION (Sushi on dark slate plates, warm greeting, appetizing CTA) -->
  <section id="hero" class="relative py-16 md:py-24 px-4 sm:px-6 bg-seigaiha border-b border-[#1C1918]/10 overflow-hidden">
    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      
      <!-- Columna Texto -->
      <div class="lg:col-span-6 space-y-6 text-left">
        <div class="flex items-center gap-2 text-xs font-bold text-[#C05041] uppercase tracking-widest">
          <span>Alta Gastronomía Japonesa</span>
          <span>·</span>
          <span class="text-[#4B6B38]">Madrid Gourmet</span>
        </div>

        <h1 class="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1C1918] leading-[1.1] font-normal">
          El arte del sushi, elevado a la <span class="italic font-semibold text-[#C05041]">perfección contemporánea</span>.
        </h1>

        <p class="text-base text-[#1C1918]/80 leading-relaxed">
          En Ayuki fusionamos las técnicas ancestrales del periodo Edo con pescados salvajes de lonja diaria, cortes de Wagyu A5 a la brasa Binchotan y makis de autor que despiertan el paladar.
        </p>

        <div class="pt-2 flex flex-wrap gap-4">
          <a href="#reservas" class="px-6 py-3.5 bg-[#C05041] hover:bg-[#A84234] text-white text-xs font-bold uppercase tracking-wider rounded shadow-xs transition-colors">
            Reservar Experiencia
          </a>
          <a href="#menu" class="px-6 py-3.5 bg-[#1C1918] hover:bg-[#2D2826] text-[#EEDBC5] text-xs font-bold uppercase tracking-wider rounded shadow-xs transition-colors">
            Explorar La Carta
          </a>
        </div>

        <!-- Indicadores de calidad -->
        <div class="pt-4 border-t border-[#1C1918]/10 grid grid-cols-3 gap-4">
          <div>
            <span class="font-serif text-2xl font-bold text-[#1C1918]">48h</span>
            <p class="text-[11px] text-[#1C1918]/70">Maduración Shime Saba</p>
          </div>
          <div>
            <span class="font-serif text-2xl font-bold text-[#1C1918]">A5</span>
            <p class="text-[11px] text-[#1C1918]/70">Kagoshima Wagyu</p>
          </div>
          <div>
            <span class="font-serif text-2xl font-bold text-[#1C1918]">100%</span>
            <p class="text-[11px] text-[#1C1918]/70">Arroz con vinagre Akazu</p>
          </div>
        </div>
      </div>

      <!-- Fotografía de Sushi en Plato de Pizarra Oscura -->
      <div class="lg:col-span-6 relative">
        <div class="bg-[#1C1918] rounded-2xl p-5 shadow-2xl border border-[#2D2826] text-[#FAF6EE]">
          <div class="flex items-center justify-between pb-3 border-b border-[#2C2725] mb-3">
            <div>
              <span class="text-[10px] font-mono text-[#AAB384] uppercase tracking-widest block">Selección del Maestro</span>
              <h3 class="font-serif text-lg font-bold text-white">Omakase Grand Slate</h3>
            </div>
            <span class="font-serif text-lg font-bold text-[#AAB384]">34.00 €</span>
          </div>

          <div class="relative h-72 rounded-lg overflow-hidden bg-neutral-900 shadow-inner">
            <img 
              src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80" 
              alt="Sushi artesanal sobre pizarra negra" 
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div class="absolute bottom-3 left-3 text-xs text-[#EEDBC5]">
              <span class="font-serif italic">"El respeto absoluto por el tiempo, el corte y la marea."</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- 3. THE MENU (LA CARTA) - Grid layout categorized (Entradas, Makis, Platos Fuertes, Bebidas) -->
  <section id="menu" class="py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full">
    <div class="text-center space-y-2 mb-10">
      <span class="text-xs font-bold text-[#C05041] uppercase tracking-widest">お品書き · Menú de Temporada</span>
      <h2 class="font-serif text-3xl sm:text-4xl text-[#1C1918] font-bold">La Carta Gastronómica</h2>
      <p class="text-xs sm:text-sm text-[#1C1918]/70 max-w-lg mx-auto">
        Cada plato es preparado al momento con los más altos estándares de frescura y corte japonés.
      </p>
    </div>

    <!-- Pestañas de categorías -->
    <div class="flex justify-center gap-2 mb-10 flex-wrap" id="categoryTabs">
      <button onclick="filterCategory('Todos')" class="cat-btn px-4 py-2 rounded text-xs font-bold bg-[#1C1918] text-[#EEDBC5] transition-colors cursor-pointer">
        Todos
      </button>
      <button onclick="filterCategory('Entradas')" class="cat-btn px-4 py-2 rounded text-xs font-bold bg-[#FAF6EE] text-[#1C1918] border border-[#1C1918]/15 hover:bg-[#FAF6EE]/80 transition-colors cursor-pointer">
        Entradas &amp; Otsumami
      </button>
      <button onclick="filterCategory('Makis')" class="cat-btn px-4 py-2 rounded text-xs font-bold bg-[#FAF6EE] text-[#1C1918] border border-[#1C1918]/15 hover:bg-[#FAF6EE]/80 transition-colors cursor-pointer">
        Makis de Autor
      </button>
      <button onclick="filterCategory('Platos Fuertes')" class="cat-btn px-4 py-2 rounded text-xs font-bold bg-[#FAF6EE] text-[#1C1918] border border-[#1C1918]/15 hover:bg-[#FAF6EE]/80 transition-colors cursor-pointer">
        Platos Fuertes &amp; Robata
      </button>
      <button onclick="filterCategory('Bebidas')" class="cat-btn px-4 py-2 rounded text-xs font-bold bg-[#FAF6EE] text-[#1C1918] border border-[#1C1918]/15 hover:bg-[#FAF6EE]/80 transition-colors cursor-pointer">
        Sake &amp; Bebidas
      </button>
    </div>

    <!-- Grid de platos con sombras sutiles y precios en Matcha Green -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="dishesGrid">
      <?php foreach ($dishes as $dish): ?>
        <article class="dish-card bg-[#FAF6EE] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow border border-[#1C1918]/10 flex flex-col justify-between" data-category="<?= htmlspecialchars($dish['category']) ?>">
          
          <div class="h-48 relative overflow-hidden bg-neutral-900">
            <img src="<?= htmlspecialchars($dish['image']) ?>" alt="<?= htmlspecialchars($dish['name']) ?>" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
            <?php if (!empty($dish['tags']) && is_array($dish['tags'])): ?>
              <span class="absolute top-3 right-3 bg-[#C05041] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase">
                <?= htmlspecialchars($dish['tags'][0]) ?>
              </span>
            <?php endif; ?>
          </div>

          <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between text-xs text-[#CA8A8C] font-semibold mb-1">
                <span><?= htmlspecialchars($dish['japanese'] ?? '') ?></span>
                <span class="text-neutral-400 font-mono"><?= htmlspecialchars($dish['category']) ?></span>
              </div>
              <h3 class="font-serif text-lg font-bold text-[#1C1918] leading-snug">
                <?= htmlspecialchars($dish['name']) ?>
              </h3>
              <p class="text-xs text-[#1C1918]/70 mt-1.5 leading-relaxed line-clamp-2">
                <?= htmlspecialchars($dish['description']) ?>
              </p>
            </div>

            <!-- Precio en Verde Matcha (#4B6B38) -->
            <div class="mt-4 pt-3 border-t border-[#1C1918]/10 flex items-center justify-between">
              <span class="text-[10px] text-neutral-400 uppercase font-medium">Precio</span>
              <span class="font-serif text-xl font-bold text-[#4B6B38] tabular-nums">
                <?= number_format($dish['price'], 2) ?> €
              </span>
            </div>
          </div>

        </article>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- 4. RESERVATION FORM (Clean, user-friendly booking section) -->
  <section id="reservas" class="py-20 px-4 sm:px-6 bg-[#FAF6EE] border-t border-[#1C1918]/10">
    <div class="max-w-2xl mx-auto">
      
      <div class="text-center space-y-2 mb-8">
        <span class="text-xs font-bold text-[#C05041] uppercase tracking-widest">予約 · Reserva de Mesa</span>
        <h2 class="font-serif text-3xl sm:text-4xl text-[#1C1918] font-bold">Reserva Tu Experiencia en Ayuki</h2>
        <p class="text-xs sm:text-sm text-[#1C1918]/70">
          Asegura tu plaza en la Barra Omakase o en nuestras estancias tradicionales.
        </p>
      </div>

      <?php if ($bookingSuccess): ?>
        <!-- Mensaje de Confirmación -->
        <div class="bg-[#EEDBC5] p-8 rounded-xl border border-[#1C1918]/15 text-center space-y-4 shadow-sm animate-fade-in">
          <div class="w-14 h-14 bg-[#4B6B38] text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold shadow-md">
            ✓
          </div>
          <h3 class="font-serif text-2xl font-bold text-[#1C1918]">¡Reserva Registrada Exitosamente!</h3>
          <p class="text-sm text-[#1C1918]/80">
            Tu reserva con código <strong class="font-mono text-[#C05041]"><?= htmlspecialchars($bookingRef) ?></strong> ha sido enviada al sistema de recepción y está visible en el Panel de Administrador.
          </p>
          <a href="#reservas" onclick="location.reload()" class="inline-block mt-2 px-5 py-2.5 bg-[#1C1918] text-[#EEDBC5] text-xs font-bold uppercase rounded hover:bg-[#2D2826]">
            Hacer Otra Reserva
          </a>
        </div>
      <?php else: ?>
        <!-- Formulario -->
        <form action="#reservas" method="POST" class="bg-[#EEDBC5] p-6 sm:p-8 rounded-xl border border-[#1C1918]/15 space-y-4 shadow-sm">
          <input type="hidden" name="action" value="book">

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-[#1C1918] mb-1">Nombre Completo *</label>
              <input type="text" name="name" placeholder="Ej. Fernando Arribas" required class="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#1C1918]/20 rounded text-xs text-[#1C1918] focus:outline-none focus:ring-1 focus:ring-[#C05041]">
            </div>

            <div>
              <label class="block text-xs font-bold text-[#1C1918] mb-1">Teléfono Móvil *</label>
              <input type="tel" name="phone" placeholder="+34 600 000 000" required class="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#1C1918]/20 rounded text-xs text-[#1C1918] focus:outline-none focus:ring-1 focus:ring-[#C05041]">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block text-xs font-bold text-[#1C1918] mb-1">Fecha *</label>
              <input type="date" name="date" value="<?= date('Y-m-d') ?>" required class="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#1C1918]/20 rounded text-xs text-[#1C1918] focus:outline-none focus:ring-1 focus:ring-[#C05041]">
            </div>

            <div>
              <label class="block text-xs font-bold text-[#1C1918] mb-1">Hora *</label>
              <select name="time" class="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#1C1918]/20 rounded text-xs text-[#1C1918] focus:outline-none focus:ring-1 focus:ring-[#C05041]">
                <option value="13:30">13:30 h</option>
                <option value="14:00">14:00 h</option>
                <option value="14:30">14:30 h</option>
                <option value="20:30">20:30 h</option>
                <option value="21:00" selected>21:00 h</option>
                <option value="21:30">21:30 h</option>
                <option value="22:00">22:00 h</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-[#1C1918] mb-1">Comensales *</label>
              <input type="number" name="guests" min="1" max="12" value="2" required class="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#1C1918]/20 rounded text-xs text-[#1C1918] focus:outline-none focus:ring-1 focus:ring-[#C05041]">
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-[#1C1918] mb-1">Estancia o Zona Preferida</label>
            <select name="zone" class="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#1C1918]/20 rounded text-xs text-[#1C1918] focus:outline-none focus:ring-1 focus:ring-[#C05041]">
              <option value="Barra Omakase">Barra Omakase (Directo frente al Maestro)</option>
              <option value="Tatami Privado">Tatami Privado (Experiencia tradicional)</option>
              <option value="Salón Principal">Salón Principal (Mesas amplias)</option>
              <option value="Terraza Zen">Terraza Zen (Ambiente ajardinado)</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-[#1C1918] mb-1">Notas o Alergias</label>
            <input type="text" name="notes" placeholder="Ej. Una persona alérgica al marisco / Aniversario..." class="w-full px-3.5 py-2.5 bg-[#FAF6EE] border border-[#1C1918]/20 rounded text-xs text-[#1C1918] focus:outline-none focus:ring-1 focus:ring-[#C05041]">
          </div>

          <div class="pt-2">
            <button type="submit" class="w-full py-3.5 bg-[#C05041] hover:bg-[#A84234] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow-xs cursor-pointer">
              Confirmar Reserva de Mesa
            </button>
          </div>
        </form>
      <?php endif; ?>

    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-[#1C1918] text-[#EEDBC5] py-10 px-6 border-t border-[#2C2725] text-center text-xs space-y-3">
    <span class="font-serif text-xl tracking-widest text-white uppercase block">Ayuki Sushi &amp; Makis</span>
    <p class="text-neutral-400">Calle Velázquez 48, Salamanca, Madrid · Tel: +34 910 882 145</p>
    <div class="pt-2 flex justify-center gap-4 text-neutral-500">
      <a href="admin.php" class="text-[#AAB384] hover:underline">Panel de Administración Staff</a>
      <span>·</span>
      <span>Aviso Legal</span>
      <span>·</span>
      <span>Alérgenos</span>
    </div>
  </footer>

  <script>
    function filterCategory(cat) {
      const cards = document.querySelectorAll('.dish-card');
      const buttons = document.querySelectorAll('.cat-btn');

      buttons.forEach(btn => {
        if (btn.innerText.includes(cat)) {
          btn.className = 'cat-btn px-4 py-2 rounded text-xs font-bold bg-[#1C1918] text-[#EEDBC5] transition-colors cursor-pointer';
        } else {
          btn.className = 'cat-btn px-4 py-2 rounded text-xs font-bold bg-[#FAF6EE] text-[#1C1918] border border-[#1C1918]/15 hover:bg-[#FAF6EE]/80 transition-colors cursor-pointer';
        }
      });

      cards.forEach(card => {
        if (cat === 'Todos' || card.getAttribute('data-category') === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }
  </script>
</body>
</html>
