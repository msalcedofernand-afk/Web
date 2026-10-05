# 📖 DOCUMENTACIÓN TÉCNICA, AUDITORÍA DE COLOR Y ROADMAP: AYUKI (あゆき)

**Proyecto:** Ayuki — Restaurante Japonés Premium de Sushi & Makis de Autor  
**Versión:** 1.0.0 (Release Candidate / Prototipo Profesional)  
**Autor:** Equipo de Desarrollo de Ayuki  
**Fecha:** Octubre 2026  

---

## 📑 ÍNDICE DE CONTENIDOS
1. [Resumen Ejecutivo del Proyecto](#1-resumen-ejecutivo-del-proyecto)
2. [Arquitectura del Sistema y Estructura de Archivos](#2-arquitectura-del-sistema-y-estructura-de-archivos)
3. [Documentación Exacta de las Vistas del Sistema](#3-documentación-exacta-de-las-vistas-del-sistema)
   - 3.1. Vista del Cliente (Landing Page & Menú)
   - 3.2. Vista del Administrador (Dashboard de Gestión)
   - 3.3. Implementación Nativa en PHP / MySQL
4. [Auditoría Detallada de Color (Paleta Oficial Implementada)](#4-auditoría-detallada-de-color-paleta-oficial-implementada)
5. [¿Qué falta de Color por Implementar o Enriquecer?](#5-qué-falta-de-color-por-implementar-o-enriquecer)
6. [¿Qué Funcionalidades Faltan por Incluir para Versión Final de Producción?](#6-qué-funcionalidades-faltan-por-incluir-para-versión-final-de-producción)
7. [Guía de Instalación y Ejecución para Evaluación](#7-guía-de-instalación-y-ejecución-para-evaluación)

---

## 1. RESUMEN EJECUTIVO DEL PROYECTO

El proyecto **Ayuki (あゆき)** es una solución web integral diseñada para un restaurante japonés de alta gama especializado en sushi, makis de autor y cocina robata. El objetivo principal es resolver la presencia digital comercial de la marca y la operativa interna de reservas en un único ecosistema cohesivo.

El sistema cuenta con una arquitectura de doble cara:
1. **Frontend Público (Vista del Cliente):** Enfocado en la conversión, el deleite visual gastronómico, la consulta de la carta con precios claros y un motor de reservas ágil.
2. **Panel de Control Privado (Vista del Administrador):** Enfocado en la eficiencia operativa, control de reservas en tiempo real, gestión de inventario/carta y seguimiento de comensales.
3. **Versión PHP/MySQL Autónoma:** Un paquete listo para desplegar en servidores locales tipo XAMPP, WAMP, LAMP o hosting compartido cPanel sin requerir Node.js.

---

## 2. ARQUITECTURA DEL SISTEMA Y ESTRUCTURA DE ARCHIVOS

### 2.1. Árbol de Directorios del Repositorio

```
/
├── DOCUMENTACION.md                   # Esta documentación completa
├── index.html                         # Punto de entrada HTML5 con tipografías japonesas
├── metadata.json                      # Metadatos del applet de AI Studio
├── package.json                       # Dependencias npm (React 19, Tailwind CSS v4, Lucide)
├── tsconfig.json                      # Configuración del compilador TypeScript
├── vite.config.ts                     # Configuración del bundler Vite
├── /src
│   ├── main.tsx                       # Bootstrap de la aplicación React
│   ├── index.css                      # Estilos globales, tipografías y patrón Seigaiha en CSS
│   ├── App.tsx                        # Controlador maestro, persistencia en localStorage y switch de vistas
│   ├── /types
│   │   └── restaurant.ts              # Interfaces TypeScript (Dish, Reservation, Customer, Order)
│   ├── /data
│   │   └── initialData.ts             # Semilla de datos gastronómicos, clientes y reservas iniciales
│   └── /components
│       ├── DishArtwork.tsx            # Renderizador vectorial SVG de platos sobre pizarra oscura
│       ├── /customer
│       │   ├── CustomerView.tsx       # Contenedor orquestador de la experiencia del cliente
│       │   ├── Navbar.tsx             # Cabecera sticky en Charcoal con logotipo y CTA Terracota
│       │   ├── Hero.tsx               # Hero con plato de pizarra, bienvenida y llamadas a la acción
│       │   ├── MenuSection.tsx        # Cuadrícula de la carta con filtros y precios en verde Matcha
│       │   ├── ReservationSection.tsx # Formulario de reserva con selector de zonas y confirmación
│       │   ├── ExperienceStory.tsx    # Narrativa de filosofía Shokunin, Binchotan y maduración
│       │   ├── DishDetailModal.tsx    # Modal de desglose de ingredientes y porciones
│       │   ├── CartDrawer.tsx         # Comanda interactiva de mesa y pedidos para llevar
│       │   └── Footer.tsx             # Pie de página Charcoal con datos legales y contacto
│       ├── /admin
│       │   ├── AdminDashboard.tsx     # Shell principal del panel de administración
│       │   ├── AdminSidebar.tsx       # Barra lateral Charcoal con enlaces activos y badges numéricos
│       │   ├── AdminTopBar.tsx        # Barra superior con perfil y centro de notificaciones
│       │   ├── ReservationsView.tsx   # Tabla de alta densidad con botones Confirm / Cancel
│       │   ├── DashboardOverview.tsx  # Métricas KPI, previsión de ingresos y checklist del chef
│       │   ├── MenuItemsView.tsx      # Gestión de platos, disponibilidad en carta y edición de precios
│       │   ├── CategoriesView.tsx     # Resumen de categorías gastronómicas
│       │   ├── CustomersView.tsx      # Directorio de clientes frecuentes y VIPs
│       │   ├── OrdersView.tsx         # Control de comandas activas en cocina
│       │   └── AddDishModal.tsx       # Modal de inserción de nuevos platos a la carta
│       └── /php
│           └── PhpProjectViewer.tsx   # Visor de código fuente PHP y descargador de archivos
└── /php                               # Directorio con el proyecto exportado en PHP puro
    ├── index.php                      # Landing Page y Menú en PHP con Tailwind CDN
    ├── admin.php                      # Dashboard de administración con tabla y acciones PHP
    ├── api.php                        # Endpoints AJAX para actualización de estado sin recarga
    ├── config.php                     # Conexión PDO MySQL y motor de persistencia JSON transparente
    ├── database.sql                   # Script SQL estructurado para importar en phpMyAdmin
    ├── data.json                      # Almacenamiento JSON automático (fallback sin MySQL)
    └── README.md                      # Instrucciones de ejecución en Apache / XAMPP / PHP CLI
```

---

## 3. DOCUMENTACIÓN EXACTA DE LAS VISTAS DEL SISTEMA

### 3.1. Vista del Cliente (Landing Page & Menú)

Diseñada bajo los principios de la estética tradicional japonesa adaptada al comercio web contemporáneo:

1. **Barra de Navegación (Sticky Navbar):**
   - Color de fondo: Negro Carbón (`#1C1918`).
   - Enlaces de salto suave: *Inicio*, *La Carta*, *Filosofía*, *Reservas*.
   - Logotipo centrado: Tipografía serif con espaciado amplio `"AYUKI"` acompañado del kanbun japonés `あゆき · 鮨`.
   - Botón de Acción Primaria: `"Book a Table"` / `"Reservar Mesa"` en Rojo Terracota (`#C05041`).
   - Indicador de Comanda / Carrito con contador numérico interactivo.
   - Enlace directo al Panel de Administración.

2. **Sección Hero (Bienvenida y Valor de Marca):**
   - Fotografía de alta fidelidad que simula la presentación sobre platos de pizarra oscura volcánica.
   - Titular equilibrado: *"El arte del sushi, elevado a la perfección contemporánea"*.
   - Llamadas a la acción duales: `"Reservar Experiencia"` (Terracota) y `"Explorar La Carta"` (Charcoal).
   - Indicadores de confianza: Maduración Shime Saba de 48 horas, Buey Wagyu grado A5 y arroz Koshihikari con vinagre Akazu.

3. **La Carta (El Menú Gastronómico):**
   - Filtros por pestañas interactivas: *Todos*, *Entradas & Otsumami*, *Makis de Autor*, *Platos Fuertes & Robata*, *Sakes & Cócteles*, *Postres*.
   - Barra de búsqueda en vivo por texto en español o transcripción japonesa.
   - Filtros de alérgenos: *Chef Selection*, *Gluten Free*, *Picante*, *Vegetariano*.
   - Tarjetas de platos con sombras sutiles, descripción de técnica/origen, etiquetas no invasivas y **precio en Verde Matcha (`#4B6B38` / `#AAB384`)**.
   - Botón directo para añadir plato a la comanda o abrir el modal de detalles.

4. **Filosofía & Experiencia Omakase:**
   - Sección editorial oscura que explica el concepto de *Shokunin* (devoción artesanal).
   - Mención a la brasa con carbón *Binchotan de Kishu* a más de 900°C.
   - Bloque de horarios por turnos (almuerzo y cena) y reconocimientos gastronómicos.

5. **Formulario de Reservas (High Affordance Booking):**
   - Selector visual de estancia: *Barra Omakase*, *Salón Principal*, *Tatami Privado*, *Terraza Zen*.
   - Selector de fecha con restricción de calendario.
   - Selector de turnos horarios (13:30, 14:00, 20:30, 21:00, 21:30, 22:00 h).
   - Selector de número de comensales (1 a 10 personas).
   - Campos de contacto: Nombre completo, Teléfono móvil, Correo electrónico y campo de notas para alergias o celebraciones.
   - Al pulsar *"Confirmar Reserva"*, el sistema genera un código de referencia (ej. `RES-8046`), muestra una pantalla de confirmación y **dispara la reserva en tiempo real al panel de administración**.

6. **Pie de Página (Footer):**
   - Fondo en Negro Carbón (`#1C1918`).
   - Ubicación en el Barrio de Salamanca (Madrid), teléfonos de contacto, horarios y enlaces de políticas legales.

---

### 3.2. Vista del Administrador (Dashboard)

Diseñado con un enfoque de **alta densidad de información, claridad tipográfica y cero distracciones**:

1. **Barra Lateral de Navegación (Sidebar):**
   - Fondo en Negro Carbón (`#1C1918`) con texto en blanco/beige.
   - Enlaces de primer nivel con estado activo resaltado:
     - `Dashboard`: Resumen general y métricas.
     - `Menu Items`: Catálogo de platos, edición de precio y toggle de stock.
     - `Categories`: Estructura de categorías de la carta.
     - `Customers`: Directorio de clientes frecuentes y notas VIP.
     - `Reservations`: Centro neurálgico de gestión de reservas.
     - `Orders`: Control de comandas en preparación.
   - Notificación de alerta visual en el enlace de *Reservations* cuando hay solicitudes pendientes.

2. **Barra Superior (Top Bar):**
   - Miga de pan de contexto actual.
   - Perfil del administrador autenticado: *Chef Kenji Takahashi (Master Admin)*.
   - Campana interactiva con desplegable de *"3 New Reservations"*.
   - Botón destacado de acción rápida: `"+ Add New Dish"` / `"+ Agregar Nuevo Plato"`.
   - Botón directo para alternar a la `Vista Cliente` en tiempo real.

3. **Módulo Principal: Tabla de Reservas (Reservations View):**
   - **Columnas exactas requeridas:**
     1. `Date` (Fecha de la cita).
     2. `Time` (Hora del servicio).
     3. `Customer Name` (Nombre del titular, teléfono e indicador de notas/alergias).
     4. `Guests` (Cantidad de comensales en formato tabular).
     5. `Zone` (Barra Omakase, Salón, Tatami o Terraza).
     6. `Status` (Etiqueta con código de color: Verde para *Confirmed*, Amarillo para *Pending*, Rojo para *Cancelled*, Gris para *Completed*).
     7. `Actions` (Botones de acción directa):
        - **"Confirm"** en Verde Matcha (`#AAB384` / `#4B6B38`).
        - **"Cancel"** en Rojo Terracota (`#C05041`).
        - Opción de sentar comensal (*"Sentada"*).
   - Filtros instantáneos por estado (*Todas, Pendientes, Confirmadas, Canceladas*), por fecha (*Hoy, Mañana*) y buscador de clientes.
   - Botón para registrar reservas manuales tomadas por teléfono o en puerta.

---

### 3.3. Implementación Nativa en PHP / MySQL (`/php/`)

La carpeta `/php` contiene la réplica autónoma del sistema para entornos de servidor PHP estándar:
- **`index.php`:** Renderiza el frontend con Tailwind CSS CDN, procesa el formulario por método `POST` y almacena la reserva en base de datos.
- **`admin.php`:** Renderiza el panel de administración con la tabla de reservas y procesa las acciones de confirmación y cancelación.
- **`config.php`:** Provee la capa de abstracción de datos. Utiliza PDO MySQL si existe la base de datos `ayuki_sushi`, y si no hay servidor SQL disponible, conmuta automáticamente a lectura y escritura sobre `data.json`, garantizando funcionamiento sin configuraciones previas.
- **`api.php`:** Permite actualizar estados de reserva o consultar datos mediante peticiones `fetch()` asíncronas.
- **`database.sql`:** Contiene las sentencias `CREATE TABLE` para `categorias`, `platos` y `reservas`, con juegos de datos iniciales.

---

## 4. AUDITORÍA DETALLADA DE COLOR (PALETA OFICIAL IMPLEMENTADA)

El proyecto respeta de manera estricta la paleta cromática asignada en las directrices de diseño:

```
[#EEDBC5] Warm Beige / Washi Paper    ██████████  (60% Lienzo Cliente / Superficies Orgánicas)
[#1C1918] Charcoal Black             ██████████  (Textos, Cabeceras, Sidebars, Footers)
[#C05041] Terracotta Red             ██████████  (Botones de Acción Primaria, Alertas, Cancelar)
[#AAB384] Matcha Green               ██████████  (Precios en la Carta, Badges de Aprobación, Confirmar)
[#4B6B38] Deep Matcha (Contraste)    ██████████  (Precios legibles sobre beige WCAG AA)
[#CA8A8C] Sakura Pink                ██████████  (Subtítulos en kanji, acentos sutiles, tags)
[#F8F7F4] Off-White Canvas           ██████████  (Fondo de datos para el Dashboard de Administración)
```

### Tabla de Aplicación Cromática por Elemento:

| Rol de Color | Código HEX | Elemento en Vista Cliente | Elemento en Vista Admin |
| :--- | :--- | :--- | :--- |
| **Fondo Base** | `#EEDBC5` | Fondo general de la página, tarjetas de reserva y badges suaves. | No aplica (se utiliza `#F8F7F4`). |
| **Fondo Dashboard** | `#F8F7F4` | No aplica. | Fondo del área de contenido para máxima legibilidad de tablas. |
| **Elemento Oscuro** | `#1C1918` | Navbar sticky, tipografía de encabezados, cuerpo de texto y footer. | Fondo del Sidebar de navegación y fondo del Top Bar superior. |
| **Acento Primario** | `#C05041` | Botón *"Book a Table"*, botón *"Confirmar Reserva"*, tags de *Chef Selection*. | Botones de peligro *"Cancel"*, botón *"Delete"* y badge de alertas pendientes. |
| **Acento Secundario** | `#AAB384` / `#4B6B38` | Precios de todos los platos de la carta, badges de confirmación. | Botones de guardado *"Save"*, botón *"Confirm"* de reservas y métricas positivas. |
| **Acento Sutil** | `#CA8A8C` | Textos en kanji japonés (`あゆき · 鮨`), separadores de puntos tipográficos (`·`). | Indicadores sutiles de etiquetas secundarias. |

---

## 5. ¿QUÉ FALTA DE COLOR POR IMPLEMENTAR O ENRIQUECER?

Aunque la paleta básica está aplicada con fidelidad al 100%, existen **oportunidades cromáticas concretas** para elevar el producto a un estándar de diseño de ultra-lujo japonés:

### 1. Incorporación del Acento Oro Antiguo / Kintsugi (`#D4AF37` / `#C5A059`)
- **Situación actual:** Los platos especiales y selecciones del chef utilizan únicamente el Terracota.
- **Mejora a implementar:** Utilizar un toque dorado tenue para platos de precio superior o ingredientes nobles (como el *Caviar Oscietra*, el *Wagyu A5* o el *Sake Junmai Daiginjo*). Este toque transmite exclusividad sin romper la paleta orgánica.

### 2. Semáforo de Estados Ampliado para la Mesa (Admin)
- **Situación actual:** Se utilizan Verde (`#16A34A`), Amarillo (`#D97706`) y Rojo (`#DC2626`).
- **Mejora a implementar:**
  - **Azul Índigo Profundo Japonés (*Aizome* `#1E3A8A` / `#2C3E50`):** Para el estado *"Comensal Sentado / En Servicio"*, diferenciando a los clientes que ya están cenando en sala de los que aún no han llegado.
  - **Gris Humo (*Sumiiro* `#6B7280`):** Para el estado *"Mesa Liberada / Servicio Finalizado"*.

### 3. Código Cromático Exclusivo para Alérgenos
- **Situación actual:** Las etiquetas de alérgenos se muestran con texto neutro.
- **Mejora a implementar:** 
  - Usar un matiz suave de Sakura (`#E8B4B6`) para advertencias de gluten o mariscos.
  - Usar un verde Matcha suave (`#D1D8BE`) para platos vegetarianos y aptos para celíacos, logrando una lectura visual instantánea.

### 4. Borde Divisor con Efecto Laca Japonesa (*Urushi*)
- **Situación actual:** Los bordes divisorios son líneas sólidas grises o negras.
- **Mejora a implementar:** Un borde hairline de 1px con un degradado sutil de Charcoal a Terracota en la base del Navbar y en el cabezal de la tabla del administrador, reforzando la sensación de ebanistería tradicional japonesa.

---

## 6. ¿QUÉ FUNCIONALIDADES FALTAN POR INCLUIR PARA VERSIÓN FINAL DE PRODUCCIÓN?

Si el proyecto va a ser llevado a un restaurante real en operación comercial o para una tesis final de grado, se recomienda incluir los siguientes módulos:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ROADMAP HACIA PRODUCCIÓN                        │
├───────────────────────────────┬────────────────────────────────────────┤
│ Módulo                        │ Descripción Técnica                    │
├───────────────────────────────┼────────────────────────────────────────┤
│ 1. Autenticación Robusta      │ Login con hash BCRYPT, JWT / Sesión    │
│ 2. Mensajería Transaccional   │ Envío de emails HTML y SMS con QR      │
│ 3. Pasarela de Cobro          │ Fianza con Stripe / Redsys (anti no-show)│
│ 4. Plano de Sala 2D           │ Mapa de mesas interactivo en tiempo real│
│ 5. Multi-idioma (i18n)        │ Selector ES / EN / JA                  │
│ 6. Facturación / PDF          │ Generación de comprobante descargable  │
│ 7. Modo Operativo Cocina      │ KDS (Kitchen Display System) en tablet │
└───────────────────────────────┴────────────────────────────────────────┘
```

### Detalle de Módulos Faltantes:

### A. Autenticación y Control de Accesos por Roles (RBAC)
- **Actualmente:** El panel es accesible para demostración rápida mediante un conmutador.
- **Falta incluir:**
  - Formulario de inicio de sesión seguro (`login.php` / pantalla `/login`).
  - Almacenamiento seguro de credenciales con `password_hash()` y validación con `password_verify()`.
  - Roles de usuario:
    - **Administrador / Dueño:** Acceso total a precios, carta, finanzas y configuración.
    - **Maitre / Recepción:** Acceso exclusivo a la tabla de reservas y asignación de mesas.
    - **Jefe de Cocina:** Acceso exclusivo a la vista de comandas y pases de platos.

### B. Notificaciones Reales por Correo Electrónico y WhatsApp
- **Falta incluir:**
  - Envío automático de confirmación al email del cliente mediante **PHPMailer** o API de **SendGrid / Resend**.
  - Generación de un **código QR único** que el comensal muestra en su móvil al llegar al restaurante para que el personal lo escanee y marque la reserva como *"Sentada"*.
  - Notificación por WhatsApp mediante la API de Twilio o Meta for Developers para recordatorio de la reserva 3 horas antes.

### C. Pasarela de Pagos para Fianza de Reserva (Garantía Anti No-Show)
- **Falta incluir:**
  - Integración con **Stripe** o **Redsys (TPV Virtual)**.
  - Bloqueo de fianza (ej. 20,00 € por persona en la Barra Omakase o para grupos de más de 4 personas), la cual solo se cobra en caso de que el cliente no se presente sin cancelar con al menos 6 horas de antelación.

### D. Plano Interactivo de Mesas 2D (Visual Floor Plan)
- **Falta incluir:**
  - Un componente interactivo que represente el plano arquitectónico del restaurante:
    - 8 taburetes en la *Barra Omakase* de Hinoki.
    - 6 mesas en el *Salón Principal*.
    - 2 habitaciones privadas de *Tatami*.
    - 4 mesas en la *Terraza Zen*.
  - Estado en tiempo real: Verde (libre), Rojo (ocupada), Amarillo (reservada próximamente).

### E. Soporte Multi-idioma (Español, Inglés y Japonés)
- **Falta incluir:**
  - Selector de idioma en el Navbar (`ES` | `EN` | `JA`).
  - Diccionario de traducciones para nombres de platos, alérgenos y términos de reserva, indispensable para restaurantes de sushi en capitales gastronómicas.

### F. Generación de Comprobante PDF Descargable
- **Falta incluir:**
  - Librería como **Dompdf** o **FPDF** en PHP (o `@react-pdf/renderer` en React) para generar un ticket PDF descargable con los datos de la reserva, código QR y ubicación en mapa.

---

## 7. GUÍA DE INSTALACIÓN Y EJECUCIÓN PARA EVALUACIÓN

### 7.1. Ejecutar el Entorno Interactivo (React + Vite)
El proyecto se encuentra activo y compilado sin errores:
- Para compilar el frontend:
  ```bash
  npm run build
  ```
- Para verificar sintaxis y tipado:
  ```bash
  npm run lint
  ```

### 7.2. Ejecutar la Versión PHP Autónoma

#### Método Rápido (Servidor Interno de PHP en Terminal):
```bash
cd php
php -S localhost:8000
```
- **Vista del Cliente:** `http://localhost:8000/index.php`
- **Panel de Administrador:** `http://localhost:8000/admin.php`

> **Nota:** La aplicación cuenta con un motor dual en `config.php`: si detecta MySQL guardará en la base de datos; si no hay servidor MySQL activo, guardará automáticamente en `data.json` de manera transparente.

#### Método con XAMPP / WampServer:
1. Copiar los archivos de la carpeta `/php/` a `C:\xampp\htdocs\ayuki\`.
2. En phpMyAdmin (`http://localhost/phpmyadmin`), importar el archivo `database.sql`.
3. Ingresar en el navegador a:
   - `http://localhost/ayuki/index.php`
   - `http://localhost/ayuki/admin.php`

---

*Documento generado para fines de evaluación técnica, presentación de avance y hoja de ruta de implementación comercial del restaurante Ayuki.*
