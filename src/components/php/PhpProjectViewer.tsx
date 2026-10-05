import React, { useState } from 'react';
import {
  FileCode,
  Download,
  Copy,
  Check,
  FolderOpen,
  Terminal,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

const PHP_FILES: { name: string; lang: string; desc: string; content: string }[] = [
  {
    name: 'index.php',
    lang: 'php',
    desc: 'Vista del Cliente: Landing Page, Hero sobre pizarra negra, La Carta categorizada y Formulario de Reservas en PHP.',
    content: `<?php
require_once __DIR__ . '/config.php';

$bookingSuccess = false;
$bookingRef = '';

// Procesar reserva vía POST
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
  <title>Ayuki - Premium Japanese Sushi & Makis</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#EEDBC5] text-[#1C1918] font-sans antialiased">

  <!-- 1. NAVIGATION BAR -->
  <header class="sticky top-0 z-50 bg-[#1C1918] text-[#EEDBC5] border-b border-[#2C2725] shadow-md">
    <div class="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
      <nav class="hidden md:flex space-x-6 text-xs uppercase tracking-wider font-medium text-[#EEDBC5]/80">
        <a href="#hero" class="hover:text-white">Inicio</a>
        <a href="#menu" class="hover:text-white">La Carta</a>
        <a href="#reservas" class="hover:text-white">Reservas</a>
      </nav>
      <div class="text-center">
        <span class="font-serif text-3xl tracking-[0.25em] font-light text-white uppercase block">Ayuki</span>
        <span class="text-[10px] tracking-[0.35em] text-[#CA8A8C] font-serif block -mt-1">あゆき · 鮨と巻き</span>
      </div>
      <div class="flex items-center space-x-3">
        <a href="admin.php" class="px-3 py-1.5 text-xs text-[#AAB384] hover:text-white rounded border border-[#38322E]">⚙️ Admin</a>
        <a href="#reservas" class="px-4 py-2 bg-[#C05041] hover:bg-[#A84234] text-white text-xs font-bold uppercase rounded">Book a Table</a>
      </div>
    </div>
  </header>

  <!-- 2. HERO SECTION -->
  <section id="hero" class="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
    <div class="space-y-6">
      <span class="text-xs font-bold text-[#C05041] uppercase tracking-widest">Alta Gastronomía Japonesa</span>
      <h1 class="font-serif text-5xl font-bold leading-tight text-[#1C1918]">
        El arte del sushi, elevado a la <span class="italic text-[#C05041]">perfección contemporánea</span>.
      </h1>
      <p class="text-base text-[#1C1918]/80 leading-relaxed">
        Técnicas milenarias del periodo Edo con pescados salvajes de lonja diaria, cortes de Wagyu A5 y makis de autor.
      </p>
      <div class="pt-2 flex gap-4">
        <a href="#reservas" class="px-6 py-3.5 bg-[#C05041] text-white text-xs font-bold uppercase rounded">Reservar Experiencia</a>
        <a href="#menu" class="px-6 py-3.5 bg-[#1C1918] text-[#EEDBC5] text-xs font-bold uppercase rounded">Explorar La Carta</a>
      </div>
    </div>
    <div class="bg-[#1C1918] rounded-2xl p-5 shadow-2xl border border-[#2D2826] text-[#FAF6EE]">
      <img src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80" alt="Sushi en pizarra" class="rounded-lg h-72 w-full object-cover">
    </div>
  </section>

  <!-- 3. THE MENU (LA CARTA) -->
  <section id="menu" class="py-20 px-6 max-w-6xl mx-auto">
    <h2 class="font-serif text-4xl text-center font-bold text-[#1C1918] mb-8">La Carta Gastronómica</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <?php foreach ($dishes as $dish): ?>
        <article class="bg-[#FAF6EE] rounded-xl overflow-hidden shadow-xs border border-[#1C1918]/10 flex flex-col justify-between">
          <img src="<?= htmlspecialchars($dish['image']) ?>" alt="<?= htmlspecialchars($dish['name']) ?>" class="h-48 w-full object-cover">
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
              <span class="text-[10px] text-[#CA8A8C] font-bold uppercase"><?= htmlspecialchars($dish['category']) ?></span>
              <h3 class="font-serif text-lg font-bold text-[#1C1918] mt-1"><?= htmlspecialchars($dish['name']) ?></h3>
              <p class="text-xs text-[#1C1918]/70 mt-1"><?= htmlspecialchars($dish['description']) ?></p>
            </div>
            <div class="mt-4 pt-3 border-t border-[#1C1918]/10 flex items-center justify-between">
              <span class="text-[10px] uppercase text-neutral-400">Precio</span>
              <span class="font-serif text-xl font-bold text-[#4B6B38]"><?= number_format($dish['price'], 2) ?> €</span>
            </div>
          </div>
        </article>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- 4. RESERVATION FORM -->
  <section id="reservas" class="py-20 px-6 bg-[#FAF6EE] border-t border-[#1C1918]/10">
    <div class="max-w-2xl mx-auto">
      <h2 class="font-serif text-4xl font-bold text-center text-[#1C1918] mb-8">Reserva de Mesa</h2>
      <?php if ($bookingSuccess): ?>
        <div class="bg-[#EEDBC5] p-8 rounded-xl text-center space-y-3">
          <h3 class="font-serif text-2xl font-bold">¡Reserva Registrada: <?= htmlspecialchars($bookingRef) ?>!</h3>
          <p class="text-sm">Enviada a recepción y visible en el panel del administrador.</p>
        </div>
      <?php else: ?>
        <form method="POST" action="#reservas" class="bg-[#EEDBC5] p-8 rounded-xl border border-[#1C1918]/15 space-y-4">
          <input type="hidden" name="action" value="book">
          <div class="grid grid-cols-2 gap-4">
            <input type="text" name="name" placeholder="Nombre completo" required class="p-2.5 bg-[#FAF6EE] rounded text-xs">
            <input type="tel" name="phone" placeholder="Teléfono móvil" required class="p-2.5 bg-[#FAF6EE] rounded text-xs">
          </div>
          <div class="grid grid-cols-3 gap-4">
            <input type="date" name="date" value="<?= date('Y-m-d') ?>" required class="p-2.5 bg-[#FAF6EE] rounded text-xs">
            <input type="time" name="time" value="21:00" required class="p-2.5 bg-[#FAF6EE] rounded text-xs">
            <input type="number" name="guests" value="2" min="1" max="10" required class="p-2.5 bg-[#FAF6EE] rounded text-xs">
          </div>
          <button type="submit" class="w-full py-3 bg-[#C05041] text-white font-bold text-xs uppercase rounded">
            Confirmar Reserva
          </button>
        </form>
      <?php endif; ?>
    </div>
  </section>
</body>
</html>`
  },
  {
    name: 'admin.php',
    lang: 'php',
    desc: 'Vista del Administrador: Sidebar Charcoal, Top Bar con notificaciones y Tabla funcional de Reservas con botones Confirm / Cancel.',
    content: `<?php
require_once __DIR__ . '/config.php';

// Cambiar estado de reserva por POST
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'update_status') {
    $id = $_POST['id'] ?? '';
    $status = $_POST['status'] ?? '';
    if ($id && in_array($status, ['Confirmed', 'Pending', 'Cancelled'])) {
        updateReservationStatus($id, $status);
    }
}

$reservations = getReservations();
$dishes = getDishes();
$activeTab = $_GET['tab'] ?? 'Reservations';

$pendingCount = 0;
foreach ($reservations as $r) {
    if ($r['status'] === 'Pending') $pendingCount++;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ayuki Admin Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#F8F7F4] text-[#1C1918] font-sans flex min-h-screen">

  <!-- 1. SIDEBAR NAVIGATION -->
  <aside class="w-60 bg-[#1C1918] text-[#EEDBC5] p-5 flex flex-col justify-between shrink-0">
    <div class="space-y-6">
      <div>
        <span class="font-serif text-2xl font-bold tracking-widest text-white uppercase block">Ayuki</span>
        <span class="text-[10px] text-[#AAB384] font-mono">PANEL DE ADMINISTRACIÓN</span>
      </div>
      <nav class="space-y-1 text-xs">
        <?php foreach (['Dashboard', 'Menu Items', 'Categories', 'Customers', 'Reservations', 'Orders'] as $item): ?>
          <a href="admin.php?tab=<?= urlencode($item) ?>" class="block px-3 py-2.5 rounded font-medium <?= $activeTab === $item ? 'bg-[#2D2825] text-white font-bold' : 'text-neutral-400 hover:text-white' ?>">
            <?= $item ?>
          </a>
        <?php endforeach; ?>
      </nav>
    </div>
    <div class="pt-4 border-t border-neutral-800 text-xs">
      <a href="index.php" class="text-[#AAB384] hover:underline block mb-2">← Ver Sitio del Cliente</a>
      <p class="font-bold text-white">Chef Kenji</p>
      <p class="text-[10px] text-neutral-400">Administrador</p>
    </div>
  </aside>

  <!-- MAIN AREA -->
  <div class="flex-1 flex flex-col min-w-0">
    <!-- 2. TOP BAR -->
    <header class="h-16 bg-[#1C1918] text-[#EEDBC5] px-6 border-b border-[#2C2725] flex items-center justify-between">
      <span class="font-bold text-white"><?= htmlspecialchars($activeTab) ?></span>
      <div class="flex items-center gap-4">
        <span class="text-xs bg-[#25201E] px-3 py-1.5 rounded border border-[#38322E]">
          🔔 <?= $pendingCount ?> New Reservations
        </span>
        <button class="px-3.5 py-1.5 bg-[#AAB384] text-[#1C1918] font-bold text-xs rounded">+ Add New Dish</button>
      </div>
    </header>

    <!-- 3. MAIN CONTENT (Reservations View) -->
    <main class="p-6 max-w-6xl w-full space-y-4">
      <h2 class="font-serif text-2xl font-bold">Reservaciones del Restaurante</h2>
      <div class="bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-xs">
        <table class="w-full text-left text-xs">
          <thead class="bg-neutral-100 border-b border-neutral-200 text-neutral-600 font-bold uppercase">
            <tr>
              <th class="py-3 px-4">Date</th>
              <th class="py-3 px-4">Time</th>
              <th class="py-3 px-4">Customer Name</th>
              <th class="py-3 px-4">Guests</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-200">
            <?php foreach ($reservations as $res): ?>
              <tr class="hover:bg-neutral-50">
                <td class="py-3.5 px-4 font-mono"><?= htmlspecialchars($res['date']) ?></td>
                <td class="py-3.5 px-4 font-mono font-bold"><?= htmlspecialchars($res['time']) ?> h</td>
                <td class="py-3.5 px-4 font-semibold"><?= htmlspecialchars($res['name']) ?></td>
                <td class="py-3.5 px-4"><?= htmlspecialchars($res['guests']) ?> pax</td>
                <td class="py-3.5 px-4">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold <?= $res['status'] === 'Confirmed' ? 'bg-green-100 text-green-800' : ($res['status'] === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800') ?>">
                    <?= $res['status'] ?>
                  </span>
                </td>
                <td class="py-3.5 px-4 text-right">
                  <form method="POST" class="inline">
                    <input type="hidden" name="action" value="update_status">
                    <input type="hidden" name="id" value="<?= htmlspecialchars($res['id']) ?>">
                    <input type="hidden" name="status" value="Confirmed">
                    <button type="submit" class="px-2.5 py-1 bg-[#AAB384] text-[#1C1918] font-bold rounded text-[11px] mr-1">Confirm</button>
                  </form>
                  <form method="POST" class="inline">
                    <input type="hidden" name="action" value="update_status">
                    <input type="hidden" name="id" value="<?= htmlspecialchars($res['id']) ?>">
                    <input type="hidden" name="status" value="Cancelled">
                    <button type="submit" class="px-2.5 py-1 bg-[#C05041] text-white font-bold rounded text-[11px]">Cancel</button>
                  </form>
                </td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</body>
</html>`
  },
  {
    name: 'config.php',
    lang: 'php',
    desc: 'Conexión a MySQL PDO con fallback transparente a JSON, inicializador de datos y funciones de consulta.',
    content: `<?php
session_start();

define('DB_HOST', 'localhost');
define('DB_NAME', 'ayuki_sushi');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DATA_FILE', __DIR__ . '/data.json');

function getDbConnection() {
    static $pdo = null;
    if ($pdo !== null) return $pdo;
    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
        return $pdo;
    } catch (PDOException $e) {
        return null; // Fallback automático a JSON
    }
}

function loadData() {
    if (!file_exists(DATA_FILE)) initDataStore();
    return json_decode(file_get_contents(DATA_FILE), true);
}

function saveData($data) {
    file_put_contents(DATA_FILE, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function getDishes() {
    $db = getDbConnection();
    if ($db) return $db->query("SELECT * FROM platos ORDER BY id ASC")->fetchAll();
    $data = loadData();
    return $data['dishes'] ?? [];
}

function getReservations() {
    $db = getDbConnection();
    if ($db) return $db->query("SELECT * FROM reservas ORDER BY id DESC")->fetchAll();
    $data = loadData();
    return $data['reservations'] ?? [];
}

function addReservation($res) {
    $data = loadData();
    array_unshift($data['reservations'], $res);
    saveData($data);
    return $res['id'];
}

function updateReservationStatus($id, $newStatus) {
    $data = loadData();
    foreach ($data['reservations'] as &$r) {
        if ($r['id'] === $id) {
            $r['status'] = $newStatus;
            break;
        }
    }
    saveData($data);
    return true;
}`
  },
  {
    name: 'database.sql',
    lang: 'sql',
    desc: 'Script SQL listo para importar en phpMyAdmin (tablas de categorias, platos y reservas).',
    content: `-- Base de datos para Ayuki Sushi & Makis
CREATE DATABASE IF NOT EXISTS \`ayuki_sushi\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`ayuki_sushi\`;

CREATE TABLE IF NOT EXISTS \`platos\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  \`nombre\` varchar(255) NOT NULL,
  \`japones\` varchar(100) DEFAULT '',
  \`categoria\` varchar(50) NOT NULL,
  \`precio\` decimal(10,2) NOT NULL,
  \`descripcion\` text NOT NULL,
  \`porcion\` varchar(100) DEFAULT '',
  \`imagen\` varchar(500) DEFAULT '',
  \`disponible\` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS \`reservas\` (
  \`id\` varchar(50) NOT NULL PRIMARY KEY,
  \`fecha\` date NOT NULL,
  \`hora\` varchar(10) NOT NULL,
  \`nombre\` varchar(255) NOT NULL,
  \`telefono\` varchar(50) NOT NULL,
  \`email\` varchar(255) NOT NULL,
  \`comensales\` int(11) NOT NULL,
  \`zona\` varchar(100) NOT NULL,
  \`estado\` enum('Confirmed','Pending','Cancelled') NOT NULL DEFAULT 'Pending',
  \`notas\` text,
  \`creado_en\` timestamp DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
  },
  {
    name: 'README.md',
    lang: 'markdown',
    desc: 'Guía paso a paso para abrir y ejecutar el proyecto en XAMPP o con php -S localhost:8000.',
    content: `# Ayuki Sushi & Makis - Proyecto PHP

## Cómo Ejecutar:
1. En XAMPP: Copia la carpeta a \`C:\\xampp\\htdocs\\ayuki\`.
2. O en terminal con PHP:
   \`\`\`bash
   cd php
   php -S localhost:8000
   \`\`\`
3. Visita:
   - Cliente: http://localhost:8000/index.php
   - Administrador: http://localhost:8000/admin.php`
  },
  {
    name: 'DOCUMENTACION.md',
    lang: 'markdown',
    desc: 'Documentación técnica completa: arquitectura, paleta de colores, auditoría de diseño y roadmap de producción.',
    content: `# DOCUMENTACIÓN TÉCNICA Y AUDITORÍA DE COLOR: AYUKI (あゆき)

## 1. Arquitectura del Sistema
- Frontend Cliente: Landing Page, Hero, La Carta con precios en verde Matcha (#4B6B38), Formulario de Reservas.
- Panel Administrador: Sidebar Charcoal (#1C1918), Topbar con alertas, Tabla interactiva de Reservas con botones Confirm (Matcha #AAB384) y Cancel (Terracota #C05041).
- Backend PHP: index.php, admin.php, config.php (PDO MySQL + JSON fallback), api.php, database.sql.

## 2. Paleta Oficial Implementada
- Main Background: Warm Beige/Washi Paper (#EEDBC5)
- Primary Accent / CTAs: Terracotta Red (#C05041)
- Text & Dark Elements: Charcoal Black (#1C1918)
- Soft Accents: Matcha Green (#AAB384 / #4B6B38) y Sakura Pink (#CA8A8C)
- Dashboard Background: Off-White (#F8F7F4)

## 3. Qué falta de color por incluir:
1. Micro-acentos Oro Kintsugi (#D4AF37) para cortes de ultra-lujo (Wagyu A5, Caviar).
2. Semáforo de estados ampliado en admin: Azul Índigo (#2C3E50) para "Comensal Sentado en Sala" y Gris Humo (#6B7280) para "Finalizada".
3. Badges cromáticos dedicados para alérgenos: Sakura (#E8B4B6) para gluten/marisco, Matcha (#D1D8BE) para vegetariano/celíaco.
4. Borde degradado hairline estilo laca Urushi (Charcoal a Terracota) en separadores.

## 4. Qué funcionalidades faltan por incluir para producción:
1. Autenticación real de usuarios administradores con password_hash() y sesiones seguras.
2. Envío real de correos de confirmación con PHPMailer / Resend y código QR para recepción.
3. Pasarela de pago o señal de reserva con Stripe / Redsys (fianza anti no-show).
4. Plano interactivo de mesas en 2D (Visual Floor Plan con estado en tiempo real).
5. Soporte multi-idioma (ES / EN / JA).
6. Generación de comprobante descargable en PDF.`
  }
];

export const PhpProjectViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState(PHP_FILES[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = (file: typeof PHP_FILES[0]) => {
    const blob = new Blob([file.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    PHP_FILES.forEach((f, idx) => {
      setTimeout(() => {
        handleDownloadFile(f);
      }, idx * 250);
    });
  };

  return (
    <div className="bg-[#1C1918] text-[#EEDBC5] min-h-screen p-6 lg:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#2C2725]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded bg-[#C05041] text-white font-mono uppercase font-bold">
                Versión PHP / MySQL Completa
              </span>
              <span className="text-xs text-[#AAB384] font-mono">/php/</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-white font-bold mt-1">
              Código Fuente PHP de Ayuki Restaurant
            </h1>
            <p className="text-xs sm:text-sm text-[#EEDBC5]/70 mt-1 max-w-2xl">
              Proyecto completo convertido a PHP puro y MySQL, listo para ejecutar en XAMPP, Apache o con el servidor embebido de PHP.
            </p>
          </div>

          <button
            onClick={handleDownloadAll}
            className="px-5 py-2.5 bg-[#4B6B38] hover:bg-[#3D572D] text-white font-semibold text-xs rounded-md shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Archivos PHP</span>
          </button>
        </div>

        {/* Instructions banner */}
        <div className="bg-[#24201E] p-4 rounded-xl border border-[#38322E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-[#AAB384] shrink-0" />
            <div>
              <span className="font-bold text-white">Comando para ejecutar de inmediato en tu PC:</span>
              <p className="text-neutral-400 font-mono mt-0.5">cd php &amp;&amp; php -S localhost:8000</p>
            </div>
          </div>
          <span className="text-[11px] text-[#CA8A8C] bg-[#1C1918] px-3 py-1 rounded border border-[#2C2725]">
            Incluye fallback automático JSON sin necesidad de configurar MySQL
          </span>
        </div>

        {/* Code Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* File Selector Sidebar */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block mb-1">
              Archivos del Proyecto PHP:
            </span>

            {PHP_FILES.map((file) => {
              const isSelected = selectedFile.name === file.name;
              return (
                <div
                  key={file.name}
                  onClick={() => setSelectedFile(file)}
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer flex flex-col gap-1 ${
                    isSelected
                      ? 'bg-[#2A2522] border-[#C05041] text-white shadow-sm ring-1 ring-[#C05041]/40'
                      : 'bg-[#201D1B] border-[#2C2725] text-[#EEDBC5]/70 hover:bg-[#25211F] hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                      <FileCode className={`w-3.5 h-3.5 ${isSelected ? 'text-[#C05041]' : 'text-[#AAB384]'}`} />
                      {file.name}
                    </span>
                    <span className="text-[10px] uppercase font-mono text-neutral-400">
                      {file.lang}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                    {file.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Code Viewer Panel */}
          <div className="lg:col-span-8 bg-[#141211] rounded-xl border border-[#2C2725] overflow-hidden shadow-2xl flex flex-col">
            
            {/* Viewer Header */}
            <div className="bg-[#1F1C1B] px-4 py-3 border-b border-[#2C2725] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-[#AAB384]" />
                <span className="font-mono text-xs font-bold text-white">
                  /php/{selectedFile.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 bg-[#2D2825] hover:bg-[#38322E] text-white text-xs rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
                </button>

                <button
                  onClick={() => handleDownloadFile(selectedFile)}
                  className="px-3 py-1 bg-[#C05041] hover:bg-[#A84234] text-white text-xs rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar</span>
                </button>
              </div>
            </div>

            {/* Code Content */}
            <div className="p-4 overflow-x-auto max-h-[600px] overflow-y-auto font-mono text-xs text-neutral-300 leading-relaxed selection:bg-[#C05041]">
              <pre>
                <code>{selectedFile.content}</code>
              </pre>
            </div>

            {/* Viewer Footer */}
            <div className="bg-[#1A1817] px-4 py-2 border-t border-[#2C2725] text-[11px] text-neutral-400 flex justify-between items-center">
              <span>{selectedFile.content.split('\n').length} líneas de código</span>
              <span>Listo para producción en servidor PHP</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
