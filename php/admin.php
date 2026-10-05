<?php
require_once __DIR__ . '/config.php';

// Manejar acción POST para cambiar estado
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    if ($_POST['action'] === 'update_status') {
        $id = $_POST['id'] ?? '';
        $status = $_POST['status'] ?? '';
        if ($id && in_array($status, ['Confirmed', 'Pending', 'Cancelled'])) {
            updateReservationStatus($id, $status);
        }
    } elseif ($_POST['action'] === 'add_dish') {
        $name = trim($_POST['name'] ?? '');
        $cat = $_POST['category'] ?? 'Makis';
        $price = floatval($_POST['price'] ?? 15);
        $desc = trim($_POST['description'] ?? '');
        if ($name) {
            addDish([
                'name' => $name,
                'japanese' => '',
                'category' => $cat,
                'price' => $price,
                'description' => $desc,
                'pieces' => '8 piezas',
                'image' => 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80'
            ]);
        }
    }
}

$reservations = getReservations();
$dishes = getDishes();
$activeTab = $_GET['tab'] ?? 'Reservations';

$pendingCount = 0;
$confirmedCount = 0;
foreach ($reservations as $r) {
    if ($r['status'] === 'Pending') $pendingCount++;
    if ($r['status'] === 'Confirmed') $confirmedCount++;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ayuki Admin Dashboard - Gestión del Restaurante</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            charcoal: '#1C1918',
            matcha: '#AAB384',
            matchaDark: '#4B6B38',
            terracotta: '#C05041',
            offWhite: '#F8F7F4'
          },
          fontFamily: {
            serif: ['"Cormorant Garamond"', 'serif'],
            sans: ['"Plus Jakarta Sans"', 'sans-serif']
          }
        }
      }
    }
  </script>
</head>
<body class="bg-[#F8F7F4] text-[#1C1918] font-sans min-h-screen flex antialiased">

  <!-- 1. SIDEBAR NAVIGATION (Charcoal Black #1C1918 with white/beige text) -->
  <aside class="w-60 bg-[#1C1918] text-[#EEDBC5] flex flex-col justify-between shrink-0 p-4 border-r border-[#2C2725]">
    <div class="space-y-6">
      
      <!-- Logo y Brand -->
      <div class="px-2 pt-2">
        <span class="font-serif text-2xl font-bold tracking-widest text-white uppercase block">
          Ayuki
        </span>
        <span class="text-[10px] text-[#AAB384] font-mono tracking-wider block -mt-1">
          PANEL DE ADMINISTRACIÓN
        </span>
      </div>

      <!-- Links requeridos: Dashboard, Menu Items, Categories, Customers, Reservations, Orders -->
      <nav class="space-y-1 text-xs">
        <?php
        $navLinks = [
            'Dashboard' => '📊 Dashboard',
            'Menu Items' => '🍣 Menu Items',
            'Categories' => '📑 Categories',
            'Customers' => '👥 Customers',
            'Reservations' => '📅 Reservations',
            'Orders' => '🛍️ Orders'
        ];
        foreach ($navLinks as $key => $label):
            $isActive = ($activeTab === $key);
        ?>
          <a href="admin.php?tab=<?= urlencode($key) ?>" class="w-full flex items-center justify-between px-3 py-2.5 rounded font-medium transition-colors <?= $isActive ? 'bg-[#2D2825] text-white font-bold' : 'text-neutral-400 hover:bg-[#25201E] hover:text-white' ?>">
            <span><?= $label ?></span>
            <?php if ($key === 'Reservations' && $pendingCount > 0): ?>
              <span class="bg-[#C05041] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                <?= $pendingCount ?>
              </span>
            <?php endif; ?>
          </a>
        <?php endforeach; ?>
      </nav>

    </div>

    <!-- Perfil Admin & Link al Sitio Cliente -->
    <div class="space-y-3 pt-4 border-t border-[#2C2725] px-2 text-xs">
      <a href="index.php" class="block w-full py-2 text-center bg-[#25201E] hover:bg-[#302B28] text-[#AAB384] rounded border border-[#38322E] text-[11px] font-semibold transition-colors">
        ← Ver Sitio del Cliente
      </a>
      <div class="text-[11px] text-neutral-400 pt-1">
        <p class="font-bold text-white">Chef Kenji Takahashi</p>
        <p class="text-[10px] text-[#AAB384]">Head Chef &amp; Administrador</p>
      </div>
    </div>
  </aside>

  <!-- CONTENEDOR PRINCIPAL -->
  <div class="flex-1 flex flex-col min-w-0 overflow-y-auto">
    
    <!-- 2. TOP BAR (Admin profile, notifications, quick "Add New Dish" button) -->
    <header class="h-16 bg-[#1C1918] text-[#EEDBC5] px-6 border-b border-[#2C2725] flex items-center justify-between shrink-0 sticky top-0 z-30">
      <div class="flex items-center gap-2">
        <span class="text-xs text-neutral-500 font-mono">Restaurante Ayuki /</span>
        <span class="font-serif text-sm font-bold text-white"><?= htmlspecialchars($activeTab) ?></span>
      </div>

      <div class="flex items-center gap-4">
        <!-- Notificaciones de nuevas reservas -->
        <div class="flex items-center gap-1.5 text-xs bg-[#25201E] px-3 py-1.5 rounded border border-[#38322E]">
          <span class="w-2 h-2 rounded-full bg-[#C05041] animate-ping"></span>
          <span><strong><?= $pendingCount ?></strong> New Reservations</span>
        </div>

        <!-- Botón rápido "Add New Dish" -->
        <button onclick="document.getElementById('modalAddDish').classList.remove('hidden')" class="px-3.5 py-1.5 bg-[#AAB384] hover:bg-[#97A171] text-[#1C1918] font-bold text-xs rounded shadow-xs flex items-center gap-1 cursor-pointer transition-colors">
          <span>+ Add New Dish</span>
        </button>
      </div>
    </header>

    <!-- 3. MAIN CONTENT AREA (Reservations View y paneles) -->
    <main class="p-6 max-w-6xl w-full space-y-6">
      
      <!-- Pestaña principal: RESERVATIONS VIEW (Data table) -->
      <?php if ($activeTab === 'Reservations' || !in_array($activeTab, ['Dashboard', 'Menu Items', 'Categories', 'Customers', 'Orders'])): ?>
        
        <!-- Tarjetas resumen KPI -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-white p-4 rounded-lg border border-neutral-200 shadow-2xs">
            <span class="text-xs text-neutral-500 uppercase font-semibold">Total Reservas</span>
            <p class="text-2xl font-bold font-mono text-neutral-900 mt-1"><?= count($reservations) ?></p>
          </div>
          <div class="bg-white p-4 rounded-lg border border-amber-200 shadow-2xs bg-amber-50/30">
            <span class="text-xs text-amber-800 uppercase font-semibold">Pendientes de Aprobación</span>
            <p class="text-2xl font-bold font-mono text-amber-600 mt-1"><?= $pendingCount ?></p>
          </div>
          <div class="bg-white p-4 rounded-lg border border-green-200 shadow-2xs bg-green-50/30">
            <span class="text-xs text-green-800 uppercase font-semibold">Confirmadas en Sala</span>
            <p class="text-2xl font-bold font-mono text-green-700 mt-1"><?= $confirmedCount ?></p>
          </div>
        </div>

        <!-- TABLA REQUERIDA POR EL PROMPT -->
        <div class="bg-white rounded-lg border border-neutral-200 shadow-xs overflow-hidden">
          <div class="px-5 py-4 border-b border-neutral-200 bg-neutral-50/50 flex items-center justify-between">
            <h2 class="font-serif text-lg font-bold text-[#1C1918]">Reservaciones del Restaurante</h2>
            <span class="text-xs text-neutral-400 font-mono">Actualizado en tiempo real</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-neutral-100 border-b border-neutral-200 text-neutral-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th class="py-3 px-4">Date</th>
                  <th class="py-3 px-4">Time</th>
                  <th class="py-3 px-4">Customer Name</th>
                  <th class="py-3 px-4">Guests</th>
                  <th class="py-3 px-4">Zone</th>
                  <th class="py-3 px-4">Status</th>
                  <th class="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-200">
                <?php if (empty($reservations)): ?>
                  <tr><td colspan="7" class="py-8 text-center text-neutral-400">No hay reservas registradas.</td></tr>
                <?php else: ?>
                  <?php foreach ($reservations as $res): ?>
                    <tr class="hover:bg-neutral-50/80 transition-colors">
                      <td class="py-3.5 px-4 font-mono font-medium text-neutral-700"><?= htmlspecialchars($res['date']) ?></td>
                      <td class="py-3.5 px-4 font-mono font-bold text-neutral-900"><?= htmlspecialchars($res['time']) ?> h</td>
                      <td class="py-3.5 px-4">
                        <span class="font-bold text-neutral-900 block"><?= htmlspecialchars($res['name']) ?></span>
                        <span class="text-[11px] text-neutral-400 font-mono"><?= htmlspecialchars($res['phone']) ?></span>
                      </td>
                      <td class="py-3.5 px-4 font-semibold text-neutral-800"><?= htmlspecialchars($res['guests']) ?> pax</td>
                      <td class="py-3.5 px-4 text-neutral-600"><?= htmlspecialchars($res['zone'] ?? 'Salón') ?></td>
                      
                      <!-- Status con colores intuitivos (Verde confirmed, Amarillo pending, Rojo cancelled) -->
                      <td class="py-3.5 px-4">
                        <?php if ($res['status'] === 'Confirmed'): ?>
                          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold bg-green-100 text-green-800">
                            <span class="w-1.5 h-1.5 rounded-full bg-green-600"></span> Confirmed
                          </span>
                        <?php elseif ($res['status'] === 'Pending'): ?>
                          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold bg-yellow-100 text-yellow-800 animate-pulse">
                            <span class="w-1.5 h-1.5 rounded-full bg-yellow-600"></span> Pending
                          </span>
                        <?php else: ?>
                          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold bg-red-100 text-red-800">
                            <span class="w-1.5 h-1.5 rounded-full bg-red-600"></span> Cancelled
                          </span>
                        <?php endif; ?>
                      </td>

                      <!-- Botones de Acción (Confirm: Verde Matcha #AAB384 / Cancel: Rojo Terracota #C05041) -->
                      <td class="py-3.5 px-4 text-right">
                        <div class="flex items-center justify-end gap-1.5">
                          <form method="POST" class="inline">
                            <input type="hidden" name="action" value="update_status">
                            <input type="hidden" name="id" value="<?= htmlspecialchars($res['id']) ?>">
                            <input type="hidden" name="status" value="Confirmed">
                            <button type="submit" class="px-2.5 py-1 bg-[#AAB384] hover:bg-[#97A171] text-[#1C1918] font-bold text-[11px] rounded shadow-2xs transition-colors cursor-pointer" title="Confirmar">
                              Confirm
                            </button>
                          </form>

                          <form method="POST" class="inline">
                            <input type="hidden" name="action" value="update_status">
                            <input type="hidden" name="id" value="<?= htmlspecialchars($res['id']) ?>">
                            <input type="hidden" name="status" value="Cancelled">
                            <button type="submit" class="px-2.5 py-1 bg-[#C05041] hover:bg-[#A84234] text-white font-bold text-[11px] rounded shadow-2xs transition-colors cursor-pointer" title="Cancelar">
                              Cancel
                            </button>
                          </form>
                        </div>
                      </td>

                    </tr>
                  <?php endforeach; ?>
                <?php endif; ?>
              </tbody>
            </table>
          </div>
        </div>

      <?php elseif ($activeTab === 'Menu Items'): ?>
        <!-- Pestaña Menu Items -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="font-serif text-xl font-bold">Platos en Carta (<?= count($dishes) ?>)</h2>
            <button onclick="document.getElementById('modalAddDish').classList.remove('hidden')" class="px-3 py-1.5 bg-[#AAB384] text-[#1C1918] font-bold text-xs rounded">
              + Agregar Nuevo Plato
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <?php foreach ($dishes as $d): ?>
              <div class="bg-white p-4 rounded-lg border border-neutral-200 flex items-center justify-between gap-3 shadow-2xs">
                <div>
                  <span class="text-[10px] text-neutral-400 uppercase font-mono"><?= htmlspecialchars($d['category']) ?></span>
                  <h4 class="font-bold text-neutral-900"><?= htmlspecialchars($d['name']) ?></h4>
                  <p class="text-neutral-500 text-[11px] line-clamp-1"><?= htmlspecialchars($d['description']) ?></p>
                  <span class="font-bold text-[#4B6B38] font-mono mt-1 block"><?= number_format($d['price'], 2) ?> €</span>
                </div>
              </div>
            <?php endforeach; ?>
          </div>
        </div>

      <?php elseif ($activeTab === 'Dashboard'): ?>
        <!-- Pestaña Dashboard Ejecutivo -->
        <div class="space-y-4">
          <h2 class="font-serif text-xl font-bold">Resumen de Operaciones</h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div class="bg-white p-5 rounded-lg border border-neutral-200">
              <span class="text-neutral-500 uppercase font-bold">Total Reservas</span>
              <p class="text-3xl font-bold font-mono text-neutral-900 mt-1"><?= count($reservations) ?></p>
            </div>
            <div class="bg-white p-5 rounded-lg border border-neutral-200">
              <span class="text-neutral-500 uppercase font-bold">Platos en Carta</span>
              <p class="text-3xl font-bold font-mono text-[#4B6B38] mt-1"><?= count($dishes) ?></p>
            </div>
            <div class="bg-white p-5 rounded-lg border border-neutral-200">
              <span class="text-neutral-500 uppercase font-bold">Pendientes</span>
              <p class="text-3xl font-bold font-mono text-[#C05041] mt-1"><?= $pendingCount ?></p>
            </div>
          </div>
        </div>

      <?php elseif ($activeTab === 'Categories'): ?>
        <!-- Pestaña Categories -->
        <div class="space-y-4">
          <h2 class="font-serif text-xl font-bold">Categorías Activas</h2>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <?php foreach (['Entradas', 'Makis', 'Platos Fuertes', 'Bebidas'] as $cat): ?>
              <div class="bg-white p-5 rounded-lg border border-neutral-200 text-center font-bold text-neutral-900">
                <?= $cat ?>
              </div>
            <?php endforeach; ?>
          </div>
        </div>

      <?php elseif ($activeTab === 'Customers'): ?>
        <!-- Pestaña Customers -->
        <div class="space-y-4">
          <h2 class="font-serif text-xl font-bold">Directorio de Clientes</h2>
          <div class="bg-white rounded-lg border border-neutral-200 divide-y text-xs">
            <?php foreach ($reservations as $r): ?>
              <div class="p-3.5 flex items-center justify-between">
                <div>
                  <p class="font-bold text-neutral-900"><?= htmlspecialchars($r['name']) ?></p>
                  <p class="text-[11px] text-neutral-400 font-mono"><?= htmlspecialchars($r['phone']) ?> · <?= htmlspecialchars($r['email'] ?? '') ?></p>
                </div>
                <span class="text-neutral-500 font-mono">Última reserva: <?= htmlspecialchars($r['date']) ?></span>
              </div>
            <?php endforeach; ?>
          </div>
        </div>

      <?php elseif ($activeTab === 'Orders'): ?>
        <!-- Pestaña Orders -->
        <div class="space-y-4">
          <h2 class="font-serif text-xl font-bold">Comandas de Sala &amp; Cocina</h2>
          <div class="bg-white p-5 rounded-lg border border-neutral-200 text-xs">
            <p class="font-bold text-neutral-900">Mesa 4 · Salón Principal</p>
            <p class="text-neutral-600 mt-1">2x Dragon Roll + 1x Edamame Trufado + 1x Dassai 23</p>
            <span class="inline-block mt-3 px-2.5 py-0.5 bg-yellow-100 text-yellow-800 rounded font-bold text-[10px]">
              En Preparación
            </span>
          </div>
        </div>
      <?php endif; ?>

    </main>
  </div>

  <!-- Modal Add New Dish (Matcha Green para Save, Terracotta Red para Cancel) -->
  <div id="modalAddDish" class="hidden fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
    <form method="POST" class="bg-white rounded-xl max-w-sm w-full p-5 space-y-4 text-xs shadow-2xl">
      <input type="hidden" name="action" value="add_dish">

      <div class="flex justify-between items-center border-b pb-2">
        <h3 class="font-bold text-sm text-[#1C1918]">Agregar Nuevo Plato</h3>
        <button type="button" onclick="document.getElementById('modalAddDish').classList.add('hidden')" class="text-neutral-400 hover:text-black">✕</button>
      </div>

      <div>
        <label class="block font-semibold mb-1">Nombre del Plato *</label>
        <input type="text" name="name" placeholder="Ej. Spicy Tuna Crunch" required class="w-full px-3 py-2 border rounded focus:outline-none">
      </div>

      <div class="grid grid-cols-2 gap-2">
        <div>
          <label class="block font-semibold mb-1">Categoría</label>
          <select name="category" class="w-full px-2 py-2 border rounded">
            <option value="Entradas">Entradas</option>
            <option value="Makis" selected>Makis</option>
            <option value="Platos Fuertes">Platos Fuertes</option>
            <option value="Bebidas">Bebidas</option>
          </select>
        </div>
        <div>
          <label class="block font-semibold mb-1">Precio (€) *</label>
          <input type="number" step="0.5" name="price" value="18.00" required class="w-full px-3 py-2 border rounded">
        </div>
      </div>

      <div>
        <label class="block font-semibold mb-1">Descripción</label>
        <textarea name="description" rows="2" placeholder="Ingredientes y notas de cata..." class="w-full px-3 py-2 border rounded"></textarea>
      </div>

      <div class="flex justify-end gap-2 pt-2 border-t">
        <button type="button" onclick="document.getElementById('modalAddDish').classList.add('hidden')" class="px-3.5 py-1.5 bg-[#C05041] hover:bg-[#A84234] text-white font-bold rounded cursor-pointer">
          Cancel
        </button>
        <button type="submit" class="px-4 py-1.5 bg-[#AAB384] hover:bg-[#97A171] text-[#1C1918] font-bold rounded cursor-pointer">
          Save
        </button>
      </div>
    </form>
  </div>

</body>
</html>
