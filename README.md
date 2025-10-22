# PlaceFinder - Buscador de Lugares con Mapas

Una aplicación web moderna para buscar lugares, visualizarlos en un mapa interactivo y guardar tus favoritos.

## Características

- **Búsqueda de Lugares**: Busca cualquier lugar en el mundo usando OpenStreetMap Nominatim
- **Mapa Interactivo**: Visualiza los lugares en un mapa interactivo con Leaflet
- **Geolocalización**: Obtén tu ubicación actual automáticamente
- **Sistema de Favoritos**: Guarda tus lugares favoritos localmente
- **Modo Claro/Oscuro**: Cambia entre tema claro y oscuro según tu preferencia
- **Diseño Responsive**: Funciona perfectamente en dispositivos móviles y desktop
- **Información Detallada**: Accede a información completa de cada lugar

## Tecnologías Utilizadas

- **Next.js 15**: Framework React moderno
- **TypeScript**: Tipado estático para mayor seguridad
- **Tailwind CSS v4**: Estilos modernos y responsive
- **Leaflet**: Librería de mapas interactivos
- **OpenStreetMap Nominatim**: API de búsqueda de lugares
- **Lucide React**: Iconos modernos y consistentes

## Estructura del Proyecto

\`\`\`
src/
├── app/
│   ├── page.tsx              # Página principal
│   ├── layout.tsx            # Layout global
│   └── globals.css           # Estilos globales
├── components/
│   ├── header.tsx            # Encabezado con tema y favoritos
│   ├── search-bar.tsx        # Barra de búsqueda
│   ├── map-container.tsx     # Contenedor del mapa
│   ├── places-list.tsx       # Lista de lugares encontrados
│   ├── favorites-list.tsx    # Lista de favoritos
│   └── theme-provider.tsx    # Proveedor de tema
└── ui/                       # Componentes UI reutilizables
\`\`\`

## Cómo Usar

### Instalación

1. Clona el repositorio
2. Instala las dependencias:
   \`\`\`bash
   npm install
   \`\`\`

3. Ejecuta el servidor de desarrollo:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

### Uso de la Aplicación

1. **Buscar Lugares**: Escribe el nombre de un lugar en la barra de búsqueda y presiona Enter o haz clic en el botón de búsqueda
2. **Ver en Mapa**: Los lugares aparecerán en el mapa interactivo
3. **Guardar Favoritos**: Haz clic en el icono de corazón para guardar un lugar como favorito
4. **Ver Favoritos**: Haz clic en el icono de corazón en el encabezado para ver tus lugares guardados
5. **Cambiar Tema**: Usa el icono de sol/luna para cambiar entre modo claro y oscuro

## Tema y Colores

La aplicación utiliza un sistema de diseño moderno con:
- **Color Primario**: Azul profundo (para acciones principales)
- **Color Secundario**: Naranja cálido (para acentos)
- **Color de Acento**: Cian/Turquesa (para elementos destacados)
- **Modo Oscuro**: Tema oscuro optimizado para la vista

## Almacenamiento

- Los favoritos se guardan en `localStorage` del navegador
- Las preferencias de tema también se guardan localmente
- No se requiere servidor backend para funcionalidades básicas

## APIs Utilizadas

- **OpenStreetMap Nominatim**: Para búsqueda de lugares
- **Geolocation API**: Para obtener la ubicación del usuario
- **Leaflet Maps**: Para visualización de mapas

## Notas

- Los datos de lugares provienen de OpenStreetMap, una base de datos colaborativa
- El almacenamiento de favoritos es local al navegador

## Próximas Mejoras

- Integración con base de datos para sincronizar favoritos entre dispositivos
- Rutas y direcciones entre lugares
- Filtrado avanzado de lugares por categoría
- Compartir ubicaciones con otros usuarios
- Historial de búsquedas recientes
