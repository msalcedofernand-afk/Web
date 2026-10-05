-- Base de datos para Ayuki Sushi & Makis
CREATE DATABASE IF NOT EXISTS `ayuki_sushi` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `ayuki_sushi`;

-- Tabla de Categorías
CREATE TABLE IF NOT EXISTS `categorias` (
  `id` varchar(50) NOT NULL PRIMARY KEY,
  `nombre` varchar(100) NOT NULL,
  `japones` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `categorias` (`id`, `nombre`, `japones`) VALUES
('Entradas', 'Entradas & Otsumami', '前菜'),
('Makis', 'Makis & Rolls de Autor', '巻き寿司'),
('Platos Fuertes', 'Platos Fuertes & Robata', '主菜・炉端焼き'),
('Bebidas', 'Sake & Coctelería de Autor', '日本酒・飲物');

-- Tabla de Platos
CREATE TABLE IF NOT EXISTS `platos` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nombre` varchar(255) NOT NULL,
  `japones` varchar(100) DEFAULT '',
  `categoria` varchar(50) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `descripcion` text NOT NULL,
  `porcion` varchar(100) DEFAULT '',
  `imagen` varchar(500) DEFAULT '',
  `disponible` tinyint(1) DEFAULT 1,
  `creado_en` timestamp DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `platos` (`nombre`, `japones`, `categoria`, `precio`, `descripcion`, `porcion`, `imagen`, `disponible`) VALUES
('Tartar de Atún Rojo Bluefin con Nori Crujiente', '本マグロのタルタル', 'Entradas', 24.50, 'Ventresca y lomo de atún Bluefin cortado a cuchillo, aguacate cremoso, yuzu kosho y crujiente de alga nori tostada.', '140g', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', 1),
('Edamame Trufado con Flor de Sal', 'トリュフ枝豆', 'Entradas', 9.00, 'Vainas de soja tiernas salteadas al wok con aceite de trufa blanca de Piamonte y flor de sal marina.', 'Para compartir', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80', 1),
('Gyozas de Wagyu & Shiitake', '和牛と椎茸の餃子', 'Entradas', 18.00, 'Empanadillas japonesas artesanales rellenas de buey Wagyu y setas shiitake con salsa ponzu cítrica.', '5 piezas', 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=600&q=80', 1),
('Ayuki Signature Dragon Roll', 'あゆき名物・龍巻き', 'Makis', 26.00, 'Langostino tigre tempurizado y queso crema, coronado con anguila glaseada al kabayaki, abanico de aguacate y tobiko dorado.', '8 piezas', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80', 1),
('Truffle Salmon Acevichado', 'トリュフサーモン巻き', 'Makis', 23.50, 'Relleno de aguacate y langostino crujiente, cubierto con salmón flameado al soplete, crema acevichada y trufa negra.', '8 piezas', 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80', 1),
('Otoro Caviar Roll', '大トロとキャビアの巻き', 'Makis', 32.00, 'Ventresca grasa de atún rojo Otoro picada finamente con cebollino japonés y coronada con caviar Oscietra Imperial.', '6 piezas', 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80', 1),
('Robatayaki Wagyu A5 de Kagoshima', '鹿児島県産A5和牛炉端焼き', 'Platos Fuertes', 58.00, 'Solomillo de auténtico buey Wagyu japonés grado A5 cocinado a la brasa Binchotan con pimientos shishito.', '160g', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', 1),
('Bacalao Negro Miso Saikyo', '銀鱈の西京焼き', 'Platos Fuertes', 36.00, 'Lomo de bacalao negro macerado 48 horas en pasta de miso blanco Saikyo de Kioto caramelizado a fuego lento.', '220g', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80', 1),
('Dassai 23 Junmai Daiginjo', '獺祭 磨き二割三分', 'Bebidas', 95.00, 'La cumbre del sake japonés: arroz Yamada Nishiki pulido al 23%. Aromas a melocotón blanco y final aterciopelado.', 'Botella 720ml', 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80', 1),
('Té Matcha Ceremonial de Uji', '宇治産 濃茶・抹茶', 'Bebidas', 7.50, 'Matcha de primera recolección batido en chawan tradicional de arcilla. Color esmeralda y textura sedosa.', 'Cuenco individual', 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80', 1);

-- Tabla de Reservas
CREATE TABLE IF NOT EXISTS `reservas` (
  `id` varchar(50) NOT NULL PRIMARY KEY,
  `fecha` date NOT NULL,
  `hora` varchar(10) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `comensales` int(11) NOT NULL,
  `zona` varchar(100) NOT NULL,
  `estado` enum('Confirmed','Pending','Cancelled') NOT NULL DEFAULT 'Pending',
  `notas` text,
  `creado_en` timestamp DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `reservas` (`id`, `fecha`, `hora`, `nombre`, `telefono`, `email`, `comensales`, `zona`, `estado`, `notas`) VALUES
('RES-8041', '2026-09-30', '20:30', 'Carlos Mendoza', '+34 612 458 901', 'carlos.m@alumni.es', 2, 'Barra Omakase', 'Confirmed', 'Aniversario de bodas. Maridaje con sake.'),
('RES-8042', '2026-09-30', '21:00', 'Valeria Sotomayor', '+34 689 332 119', 'v.sotomayor@invercorp.com', 4, 'Tatami Privado', 'Pending', 'Cena de negocios. Uno de los comensales es celíaco.'),
('RES-8043', '2026-09-30', '21:30', 'Katsumi Takahashi', '+34 670 994 220', 'katsumi.t@gmail.com', 2, 'Barra Omakase', 'Pending', 'Solicita menú especial del Chef.'),
('RES-8038', '2026-09-30', '14:00', 'Helena Gómez', '+34 644 112 589', 'helena.g@estudio.es', 6, 'Salón Principal', 'Confirmed', 'Mesa luminosa.'),
('RES-8037', '2026-10-01', '20:00', 'Rodrigo Alarcón', '+34 655 432 109', 'ralarcon@tech.io', 3, 'Terraza Zen', 'Cancelled', 'Cancelado con antelación.');
