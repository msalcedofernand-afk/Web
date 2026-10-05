# Ayuki Sushi & Makis - Proyecto Completo en PHP / MySQL

Este proyecto contiene la implementación en **PHP** para el restaurante japonés de alta gama **"Ayuki"**, con separación completa entre la **Vista del Cliente** y la **Vista del Administrador**.

---

## 🎨 Paleta de Colores Oficial (Estrictamente Aplicada)
- **Fondo Principal Cliente:** Papel Washi Beige Cálido (`#EEDBC5`)
- **Accento Primario / Botones de Acción (CTAs):** Rojo Terracota (`#C05041`)
- **Textos y Elementos Oscuros:** Negro Carbón / Charcoal (`#1C1918`)
- **Acentos Suaves & Precios:** Verde Matcha (`#AAB384` / `#4B6B38`) y Rosa Sakura (`#CA8A8C`)
- **Dashboard Admin:** Lienzo en blanco roto (`#F8F7F4`), botones de confirmación en Verde Matcha (`#AAB384`), botones de peligro/cancelación en Rojo Terracota (`#C05041`).

---

## 📁 Estructura de Archivos PHP
```
/php
├── index.php         -> Vista del Cliente (Landing Page, Hero, La Carta, Formulario de Reservas)
├── admin.php         -> Vista del Administrador (Sidebar Charcoal, Top Bar, Tabla interactiva de Reservas con Confirm/Cancel)
├── api.php           -> Endpoint JSON para peticiones AJAX en vivo
├── config.php        -> Conexión a Base de Datos (PDO MySQL) con fallback automático a JSON
├── database.sql      -> Script SQL con tablas (platos, reservas, categorias) y datos iniciales
└── data.json         -> Almacenamiento local automático si se ejecuta sin MySQL
```

---

## 🚀 Cómo Ejecutar el Proyecto

### Opción 1: Servidor Integrado de PHP (Sin instalar nada extra)
Si tienes PHP instalado en tu máquina, abre tu terminal y ejecuta:
```bash
cd php
php -S localhost:8000
```
Luego abre tu navegador en:
- **Vista del Cliente:** `http://localhost:8000/index.php`
- **Panel de Administrador:** `http://localhost:8000/admin.php`

> **Nota:** La aplicación detecta automáticamente si no hay conexión a MySQL y utiliza almacenamiento persistente JSON (`data.json`), por lo que funciona al 100% de inmediato.

---

### Opción 2: En XAMPP / WampServer / MAMP
1. Copia toda la carpeta `php` dentro de tu carpeta web:
   - En XAMPP en Windows: `C:\xampp\htdocs\ayuki`
   - En Linux: `/var/www/html/ayuki`
2. Abre **phpMyAdmin** (`http://localhost/phpmyadmin`).
3. Importa el archivo `database.sql` (creará la base de datos `ayuki_sushi` con todos los platos y reservas de prueba).
4. Abre en tu navegador:
   - `http://localhost/ayuki/index.php`
   - `http://localhost/ayuki/admin.php`

---

## 📋 Características para la Presentación al Docente / Ingeniero

### 1. Vista del Cliente (`index.php`)
- **Navbar:** Sticky con fondo Charcoal, logotipo centrado "Ayuki" y botón destacado en Terracota "Book a Table".
- **Hero Section:** Fotografía sobre plato de pizarra oscura, saludo cálido y llamadas a la acción apetitosas.
- **La Carta:** Cuadrícula categorizada (*Entradas, Makis, Platos Fuertes, Bebidas*) con filtros dinámicos y precios destacados en color Verde Matcha.
- **Formulario de Reserva:** Validación de Nombre, Teléfono, Fecha, Hora y Comensales. Al enviar mediante método `POST`, guarda la reserva y genera un código de referencia inmediato.

### 2. Vista del Administrador (`admin.php`)
- **Sidebar:** Enlaces funcionales para *Dashboard*, *Menu Items*, *Categories*, *Customers*, *Reservations* y *Orders*.
- **Top Bar:** Perfil del administrador, aviso de *"3 New Reservations"* y botón *"Add New Dish"*.
- **Tabla de Reservas en Vivo:**
  - Columnas: *Date*, *Time*, *Customer Name*, *Guests*, *Zone*, *Status*.
  - Indicadores con código de color: Verde para *Confirmed*, Amarillo para *Pending*, Rojo para *Cancelled*.
  - Botones funcionales: **"Confirm"** (Verde Matcha) y **"Cancel"** (Rojo Terracota) que actualizan la base de datos al instante.
