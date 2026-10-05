<?php
/**
 * Ayuki Japanese Sushi & Makis - Configuración y Persistencia
 * Compatible con MySQL (PDO) y fallback automático a JSON para pruebas rápidas
 */

session_start();

// Configuración de Base de Datos MySQL
define('DB_HOST', 'localhost');
define('DB_NAME', 'ayuki_sushi');
define('DB_USER', 'root');
define('DB_PASS', '');

// Archivo de almacenamiento JSON (fallback sin necesidad de configurar MySQL)
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
        // Si no hay MySQL corriendo, se usa el almacenamiento JSON transparente
        return null;
    }
}

// Inicialización de datos por defecto si no existe JSON
function initDataStore() {
    if (!file_exists(DATA_FILE)) {
        $initialData = [
            'dishes' => [
                [
                    'id' => 1,
                    'name' => 'Tartar de Atún Rojo Bluefin con Nori Crujiente',
                    'japanese' => '本マグロのタルタル',
                    'category' => 'Entradas',
                    'description' => 'Ventresca y lomo de atún Bluefin cortado a cuchillo, aguacate cremoso, yuzu kosho y crujiente de alga nori tostada.',
                    'price' => 24.50,
                    'tags' => ['Chef Selection', 'Gluten Free'],
                    'pieces' => '140g',
                    'image' => 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
                    'available' => true
                ],
                [
                    'id' => 2,
                    'name' => 'Edamame Trufado con Flor de Sal',
                    'japanese' => 'トリュフ枝豆',
                    'category' => 'Entradas',
                    'description' => 'Vainas de soja tiernas salteadas al wok con aceite de trufa blanca de Piamonte y flor de sal marina.',
                    'price' => 9.00,
                    'tags' => ['Vegetariano', 'Gluten Free'],
                    'pieces' => 'Para compartir',
                    'image' => 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
                    'available' => true
                ],
                [
                    'id' => 3,
                    'name' => 'Gyozas de Wagyu & Shiitake',
                    'japanese' => '和牛と椎茸の餃子',
                    'category' => 'Entradas',
                    'description' => 'Empanadillas japonesas artesanales rellenas de buey Wagyu y setas shiitake con salsa ponzu cítrica.',
                    'price' => 18.00,
                    'tags' => ['Chef Selection'],
                    'pieces' => '5 piezas',
                    'image' => 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80',
                    'available' => true
                ],
                [
                    'id' => 4,
                    'name' => 'Ayuki Signature Dragon Roll',
                    'japanese' => 'あゆき名物・龍巻き',
                    'category' => 'Makis',
                    'description' => 'Langostino tigre tempurizado y queso crema, coronado con anguila glaseada al kabayaki, abanico de aguacate y tobiko dorado.',
                    'price' => 26.00,
                    'tags' => ['Chef Selection', 'Firma'],
                    'pieces' => '8 piezas',
                    'image' => 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
                    'available' => true
                ],
                [
                    'id' => 5,
                    'name' => 'Truffle Salmon Acevichado',
                    'japanese' => 'トリュフサーモン巻き',
                    'category' => 'Makis',
                    'description' => 'Relleno de aguacate y langostino crujiente, cubierto con salmón flameado al soplete, crema acevichada y trufa negra.',
                    'price' => 23.50,
                    'tags' => ['Nuevo'],
                    'pieces' => '8 piezas',
                    'image' => 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
                    'available' => true
                ],
                [
                    'id' => 6,
                    'name' => 'Otoro Caviar Roll',
                    'japanese' => '大トロとキャビアの巻き',
                    'category' => 'Makis',
                    'description' => 'Ventresca grasa de atún rojo Otoro picada finamente con cebollino japonés y coronada con caviar Oscietra Imperial.',
                    'price' => 32.00,
                    'tags' => ['Chef Selection', 'Premium'],
                    'pieces' => '6 piezas',
                    'image' => 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80',
                    'available' => true
                ],
                [
                    'id' => 7,
                    'name' => 'Robatayaki Wagyu A5 de Kagoshima',
                    'japanese' => '鹿児島県産A5和牛炉端焼き',
                    'category' => 'Platos Fuertes',
                    'description' => 'Solomillo de auténtico buey Wagyu japonés grado A5 cocinado a la brasa Binchotan con pimientos shishito.',
                    'price' => 58.00,
                    'tags' => ['Chef Selection', 'Gluten Free'],
                    'pieces' => '160g',
                    'image' => 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
                    'available' => true
                ],
                [
                    'id' => 8,
                    'name' => 'Bacalao Negro Miso Saikyo',
                    'japanese' => '銀鱈の西京焼き',
                    'category' => 'Platos Fuertes',
                    'description' => 'Lomo de bacalao negro macerado 48 horas en pasta de miso blanco Saikyo de Kioto caramelizado a fuego lento.',
                    'price' => 36.00,
                    'tags' => ['Tradicional'],
                    'pieces' => '220g',
                    'image' => 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
                    'available' => true
                ],
                [
                    'id' => 9,
                    'name' => 'Dassai 23 Junmai Daiginjo',
                    'japanese' => '獺祭 磨き二割三分',
                    'category' => 'Bebidas',
                    'description' => 'La cumbre del sake japonés: arroz Yamada Nishiki pulido al 23%. Aromas a melocotón blanco y final aterciopelado.',
                    'price' => 95.00,
                    'tags' => ['Sake Premium'],
                    'pieces' => 'Botella 720ml',
                    'image' => 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
                    'available' => true
                ],
                [
                    'id' => 10,
                    'name' => 'Té Matcha Ceremonial de Uji',
                    'japanese' => '宇治産 濃茶・抹茶',
                    'category' => 'Bebidas',
                    'description' => 'Matcha de primera recolección batido en chawan tradicional de arcilla. Color esmeralda y textura sedosa.',
                    'price' => 7.50,
                    'tags' => ['Vegetariano'],
                    'pieces' => 'Cuenco individual',
                    'image' => 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
                    'available' => true
                ]
            ],
            'reservations' => [
                [
                    'id' => 'RES-8041',
                    'date' => '2026-09-30',
                    'time' => '20:30',
                    'name' => 'Carlos Mendoza',
                    'phone' => '+34 612 458 901',
                    'email' => 'carlos.mendoza@alumni.es',
                    'guests' => 2,
                    'zone' => 'Barra Omakase',
                    'status' => 'Confirmed',
                    'notes' => 'Aniversario de bodas. Maridaje con sake.'
                ],
                [
                    'id' => 'RES-8042',
                    'date' => '2026-09-30',
                    'time' => '21:00',
                    'name' => 'Valeria Sotomayor',
                    'phone' => '+34 689 332 119',
                    'email' => 'v.sotomayor@invercorp.com',
                    'guests' => 4,
                    'zone' => 'Tatami Privado',
                    'status' => 'Pending',
                    'notes' => 'Cena de negocios. Uno de los comensales es celíaco.'
                ],
                [
                    'id' => 'RES-8043',
                    'date' => '2026-09-30',
                    'time' => '21:30',
                    'name' => 'Katsumi Takahashi',
                    'phone' => '+34 670 994 220',
                    'email' => 'katsumi.t@gmail.com',
                    'guests' => 2,
                    'zone' => 'Barra Omakase',
                    'status' => 'Pending',
                    'notes' => 'Solicita menú especial del Chef.'
                ],
                [
                    'id' => 'RES-8038',
                    'date' => '2026-09-30',
                    'time' => '14:00',
                    'name' => 'Helena Gómez',
                    'phone' => '+34 644 112 589',
                    'email' => 'helena.g@estudio.es',
                    'guests' => 6,
                    'zone' => 'Salón Principal',
                    'status' => 'Confirmed',
                    'notes' => 'Mesa luminosa.'
                ],
                [
                    'id' => 'RES-8037',
                    'date' => '2026-10-01',
                    'time' => '20:00',
                    'name' => 'Rodrigo Alarcón',
                    'phone' => '+34 655 432 109',
                    'email' => 'ralarcon@tech.io',
                    'guests' => 3,
                    'zone' => 'Terraza Zen',
                    'status' => 'Cancelled',
                    'notes' => 'Cancelado con antelación.'
                ]
            ]
        ];
        file_put_contents(DATA_FILE, json_encode($initialData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }
}

initDataStore();

function loadData() {
    initDataStore();
    return json_decode(file_get_contents(DATA_FILE), true);
}

function saveData($data) {
    file_put_contents(DATA_FILE, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function getDishes() {
    $db = getDbConnection();
    if ($db) {
        $stmt = $db->query("SELECT * FROM platos ORDER BY id ASC");
        return $stmt->fetchAll();
    }
    $data = loadData();
    return $data['dishes'] ?? [];
}

function getReservations() {
    $db = getDbConnection();
    if ($db) {
        $stmt = $db->query("SELECT * FROM reservas ORDER BY id DESC");
        return $stmt->fetchAll();
    }
    $data = loadData();
    return $data['reservations'] ?? [];
}

function addReservation($res) {
    $db = getDbConnection();
    if ($db) {
        $stmt = $db->prepare("INSERT INTO reservas (id, fecha, hora, nombre, telefono, email, comensales, zona, estado, notas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $res['id'], $res['date'], $res['time'], $res['name'],
            $res['phone'], $res['email'], $res['guests'], $res['zone'], $res['status'], $res['notes']
        ]);
        return $res['id'];
    }
    $data = loadData();
    array_unshift($data['reservations'], $res);
    saveData($data);
    return $res['id'];
}

function updateReservationStatus($id, $newStatus) {
    $db = getDbConnection();
    if ($db) {
        $stmt = $db->prepare("UPDATE reservas SET estado = ? WHERE id = ?");
        return $stmt->execute([$newStatus, $id]);
    }
    $data = loadData();
    foreach ($data['reservations'] as &$r) {
        if ($r['id'] === $id) {
            $r['status'] = $newStatus;
            break;
        }
    }
    saveData($data);
    return true;
}

function addDish($dish) {
    $db = getDbConnection();
    if ($db) {
        $stmt = $db->prepare("INSERT INTO platos (nombre, japones, categoria, precio, descripcion, porcion, imagen) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $dish['name'], $dish['japanese'], $dish['category'],
            $dish['price'], $dish['description'], $dish['pieces'], $dish['image']
        ]);
        return true;
    }
    $data = loadData();
    $dish['id'] = count($data['dishes']) + 1;
    $dish['available'] = true;
    array_unshift($data['dishes'], $dish);
    saveData($data);
    return true;
}
