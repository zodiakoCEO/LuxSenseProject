🌟 LuxSense - Frontend
📋 Descripción del Proyecto
LuxSense es una aplicación web de monitoreo y control de consumo energético inteligente. El frontend está desarrollado con React, TypeScript, Vite y Linaria, siguiendo una arquitectura basada en Atomic Design para garantizar componentes reutilizables, escalables y mantenibles.

🚀 Cómo Ejecutar el Proyecto
Prerrequisitos
Asegúrate de tener instalado:

Node.js (v18 o superior) - Descargar aquí

npm o yarn (gestor de paquetes)

Paso 1: Clonar el Repositorio
bash
git clone <URL_DEL_REPOSITORIO>
cd luxsense-frontend
Paso 2: Instalar Dependencias
bash
npm install
O si usas yarn:

bash
yarn install
Paso 3: Ejecutar el Proyecto en Desarrollo
bash
npm run dev
O con yarn:

bash
yarn dev
El proyecto estará disponible en: http://localhost:5173 (o el puerto que Vite asigne)

Paso 4: Compilar para Producción
bash
npm run build
Los archivos de producción se generarán en la carpeta /dist

Paso 5: Vista Previa de la Build de Producción
bash
npm run preview
📁 Estructura de Carpetas
El proyecto sigue el patrón Atomic Design para organizar los componentes de UI, lo cual facilita la reutilización, el testing y el mantenimiento del código.

text
src/
├── components/              # Componentes de UI siguiendo Atomic Design
│   ├── atoms/              # Componentes más pequeños e indivisibles
│   │   ├── Avatar.tsx      # Avatar de usuario con imagen circular
│   │   ├── Button.tsx      # Botón reutilizable con variantes (gradient/solid)
│   │   ├── Icon.tsx        # Wrapper para iconos
│   │   ├── Logo.tsx        # Logo de LuxSense con gradiente
│   │   ├── SearchInput.tsx # Input de búsqueda con ícono
│   │   └── Text.tsx        # Texto reutilizable con variantes de peso y tamaño
│   │
│   ├── molecules/          # Combinación de átomos (componentes compuestos simples)
│   │   ├── CircularMetric.tsx   # Métrica circular (voltaje, corriente, potencia)
│   │   ├── EnergyLineChart.tsx  # Gráfico de líneas de consumo energético
│   │   ├── InfoCard.tsx         # Tarjeta informativa (notificaciones, alertas)
│   │   ├── ProgressBar.tsx      # Barra de progreso horizontal
│   │   ├── SidebarItem.tsx      # Ítem de navegación del sidebar
│   │   └── UserProfile.tsx      # Perfil de usuario (nombre + avatar)
│   │
│   ├── organisms/          # Componentes complejos (combinación de moléculas)
│   │   ├── DashboardHeader.tsx           # Header del dashboard (título + búsqueda + perfil)
│   │   ├── EnergyConsumptionSection.tsx  # Sección de consumo energético con gráfico
│   │   ├── InfoCardsGrid.tsx             # Grid de tarjetas informativas
│   │   ├── LandingContent.tsx            # Contenido principal de la landing page
│   │   ├── MetricsSection.tsx            # Sección con métricas circulares
│   │   └── Sidebar.tsx                   # Sidebar de navegación
│   │
│   └── templates/          # Layouts y plantillas de página
│       ├── DashboardLayout.tsx  # Layout del dashboard (sidebar + header + contenido)
│       └── LandingTemplate.tsx  # Template de la landing page
│
├── pages/                  # Páginas de la aplicación (vistas principales)
│   ├── DashboardPage.tsx   # Página principal del dashboard
│   └── LandingPage.tsx     # Página de landing (redirección al dashboard)
│
├── styles/                 # Estilos globales
│   └── globals.ts          # Estilos globales (reset CSS, fuentes, variables)
│
├── App.tsx                 # Configuración de rutas (React Router)
├── main.tsx                # Punto de entrada de la aplicación
└── vite-env.d.ts           # Tipos de TypeScript para Vite
🧩 Explicación del Atomic Design
🔹 Atoms (Átomos)
Los componentes más básicos e indivisibles. No dependen de otros componentes.

Ejemplos:

Button.tsx → Botón reutilizable

Text.tsx → Texto con diferentes pesos y tamaños

Logo.tsx → Logo de la aplicación

Cuándo usar: Para elementos UI básicos que se reutilizan en toda la app.

🔹 Molecules (Moléculas)
Combinación de varios átomos para formar componentes más complejos pero aún simples.

Ejemplos:

InfoCard.tsx → Combina Icon + Text

UserProfile.tsx → Combina Avatar + Text

CircularMetric.tsx → Combina gráfico circular + texto descriptivo

Cuándo usar: Para agrupar átomos en unidades funcionales pequeñas.

🔹 Organisms (Organismos)
Componentes complejos que combinan moléculas y átomos para formar secciones completas de la UI.

Ejemplos:

Sidebar.tsx → Combina múltiples SidebarItem + Logo

DashboardHeader.tsx → Combina SearchInput + UserProfile + Text

InfoCardsGrid.tsx → Grid de múltiples InfoCard

Cuándo usar: Para crear secciones completas y funcionales de una página.

🔹 Templates (Plantillas)
Layouts que definen la estructura general de una página. Contienen organismos y definen cómo se distribuyen en la pantalla.

Ejemplos:

DashboardLayout.tsx → Define la estructura: sidebar + header + área de contenido

LandingTemplate.tsx → Define la estructura centrada de la landing page

Cuándo usar: Para definir la estructura general de las páginas.

🔹 Pages (Páginas)
Páginas completas de la aplicación. Usan templates y les pasan datos/contenido específico.

Ejemplos:

DashboardPage.tsx → Usa DashboardLayout y muestra las gráficas y métricas

LandingPage.tsx → Usa LandingTemplate y muestra el contenido de bienvenida

Cuándo usar: Para crear las rutas/vistas principales de la app.

🎨 Tecnologías y Librerías Utilizadas
Tecnología	Descripción
React	Librería para construir interfaces de usuario
TypeScript	Superset de JavaScript con tipado estático
Vite	Build tool ultra-rápido para desarrollo
Linaria	CSS-in-JS zero-runtime (reemplazo de styled-components)
React Router	Librería para manejo de rutas
Recharts	Librería para gráficos y visualización de datos
react-circular-progressbar	Componente para métricas circulares
🎨 Paleta de Colores
css
/* Colores principales */
#00FF09  /* Verde neón - Primary */
#00E5FF  /* Cyan - Accent */
#FF00FF  /* Magenta - Gráficos */
#FFFFFF  /* Blanco - Texto principal */
#CCCCCC  /* Gris claro - Texto secundario */
#1a1a2e  /* Azul oscuro - Fondo principal */
#0f172a  /* Azul más oscuro - Sidebar */
🔧 Scripts Disponibles
bash
npm run dev       # Inicia el servidor de desarrollo
npm run build     # Compila el proyecto para producción
npm run preview   # Vista previa de la build de producción
npm run lint      # Ejecuta el linter (si está configurado)
📚 Reglas de Desarrollo
✅ Buenas prácticas:
Siempre usa TypeScript → Define interfaces para las props de los componentes

Sigue Atomic Design → Crea componentes en la carpeta correcta según su complejidad

Reutiliza componentes → Antes de crear uno nuevo, verifica si ya existe uno similar

Usa Linaria para estilos → No uses CSS inline ni archivos CSS separados

Props explícitas → Para componentes interactivos (Button, Input), extiende las props HTML nativas

❌ Evita:
Crear componentes gigantes y monolíticos

Mezclar lógica de negocio con componentes de presentación

Duplicar estilos → Usa átomos reutilizables

Hardcodear valores → Usa props y variables

📝 Notas Importantes
Datos quemados: Los gráficos y métricas actualmente usan datos estáticos (mock data) para la presentación. En el futuro, estos datos vendrán del backend.

Responsive: El diseño está optimizado para 2K (2560x1440) pero es responsive para otras resoluciones.

Migración a Linaria: El proyecto migró de styled-components a Linaria para mejor performance (zero-runtime CSS-in-JS).

🤝 Contribuciones
Si quieres agregar una nueva funcionalidad:

Crea un nuevo componente en la carpeta correspondiente según Atomic Design

Define las interfaces TypeScript para las props

Usa Linaria para los estilos

Documenta el componente si es complejo

Prueba el componente en diferentes resoluciones

📞 Contacto
Para dudas o consultas sobre el proyecto:

Proyecto: LuxSense - Sistema de Monitoreo Energético Inteligente

Stack: React + TypeScript + Vite + Linaria

Arquitectura: Atomic Design

📄 Licencia
Este proyecto es parte de un trabajo académico de grado.

© 2025 LuxSense. Todos los derechos reservados.


PANGA

Primero ejecute:

cd frontend (esto lo va a meter en la carpeta de frontend porque es donde esta el front dah)
npm run dev (esto ejecuta como tal la aplicacion)

si no le abre automaticamente en el navegador, pegue el localhost en el navegador y ya ahí se le abre:

Este es el que yo uso:

 http://localhost:5173/

 igual al ejecutar el comando le sale el localhost, si no le sale el 5173, use el que sea que le salga.
 
 Rompala hpta que usted es muy teso. ^^
