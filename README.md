# Urbetrack Ops

Aplicación SPA desarrollada como desafío técnico para URBETRACK. Permite a operadores monitorear el estado de zonas, vehículos recolectores, activos urbanos e incidentes activos a través de un dashboard centralizado, una bandeja de incidentes y un mapa operativo interactivo.

---

## Índice

- [Vistas Implementadas](#vistas-implementadas)
- [Stack tecnológico](#stack-tecnológico)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Arquitectura](#arquitectura)
- [Estructura de carpetas](#estructura-de-carpetas)
- [Planificación — User Stories](#planificación--user-stories)
- [Decisiones técnicas](#decisiones-técnicas)
- [Testing](#testing)
- [Limitaciones conocidas de la API](#limitaciones-conocidas-de-la-api)
- [Convención de commits](#convención-de-commits)

---



## Vistas Implementadas

> La aplicación consume una API local. Ver sección [Instalación](#instalación-y-ejecución) para correrla.

**Pantallas principales:**


| Pantalla              | Ruta          |
| --------------------- | ------------- |
| Centro de operaciones | `/`           |
| Mapa operativo        | `/mapa`       |
| Bandeja de incidentes | `/incidentes` |
| Assets urbanos        | `/assets`     |
| Flota operativa       | `/flota`      |


---



## Stack tecnológico



### Requerido


| Herramienta       | Versión | Uso                              |
| ----------------- | ------- | -------------------------------- |
| React             | 19      | UI framework                     |
| TypeScript        | 5       | Tipado estático                  |
| TanStack Query v5 | 5       | Server state, cache y mutaciones |
| Vite              | 5       | Bundler y dev server             |




### Adicional implementado


| Herramienta                 | Uso                                                                      |
| --------------------------- | ------------------------------------------------------------------------ |
| TanStack Router             | Navegación SPA con rutas completamente tipadas y search params type-safe |
| Zustand                     | Estado global del filtro de zona activo                                  |
| Zod                         | Validación de formularios (isomorfo con schemas del backend)             |
| Tailwind CSS                | Estilos utilitarios                                                      |
| shadcn/ui + Radix UI        | Componentes accesibles (Dialog, Select, Badge, Table)                    |
| React Leaflet               | Mapa interactivo con OpenStreetMap                                       |
| react-leaflet-markercluster | Clustering de los 1.500 markers de assets                                |
| React Hook Form             | Manejo de formularios                                                    |
| Vitest                      | Test runner integrado con Vite                                           |
| React Testing Library       | Testing de componentes orientado al comportamiento del usuario           |


---



## Instalación y ejecución



### Requisitos previos

- Node.js >= 18
- pnpm >= 8



### 1. Clonar el repositorio

```bash
git clone https://github.com/[githubUser]/urbetrack-challenge-frontend.git
cd urbetrack-challenge-frontend
```



### 2. Iniciar el backend

El backend es provisto por URBETRACK y corre localmente con datos mockeados.

```bash
# Desde la carpeta del backend
cd desafio-urbetrack-frontend-2026
pnpm install
pnpm dev
# API disponible en http://localhost:3000
```



### 3. Configurar variables de entorno del frontend

```bash
# En la carpeta del frontend
cp .env.example .env
```

Contenido de `.env`:

```env
VITE_API_URL=http://localhost:3000
```



### 4. Iniciar el frontend

```bash
cd urbetrack-challenge-frontend
pnpm install
pnpm dev
# App disponible en http://localhost:5173
```

---



## Arquitectura

El proyecto sigue **Feature-Based Architecture** con separación explícita de responsabilidades en capas. Cada feature es un módulo autocontenido con sus propios componentes, hooks y schemas. `shared/` contiene únicamente lo que es transversal a más de una feature.

**Regla de dependencia (unidireccional):**

```
features/* → shared/*
features/* no importan entre sí
shared/* no importa de features/*
```



### Capas por responsabilidad

```
┌─────────────────────────────────────────┐
│  UI LAYER          components/          │  Solo renderizado, sin lógica de negocio
├─────────────────────────────────────────┤
│  LOGIC LAYER       hooks/use*Stats      │  Computaciones puras: agrupar, paginar, filtrar
├─────────────────────────────────────────┤
│  STATE LAYER       hooks/use*           │  React Query + Zustand: cache y estado global
├─────────────────────────────────────────┤
│  DATA LAYER        services/api.ts      │  Contrato con la API, fetch puro
└─────────────────────────────────────────┘
```



### SOLID aplicado a React/TypeScript

**Single Responsibility** — Un hook por responsabilidad, un componente por pieza de UI. El fetch, la transformación y el renderizado nunca conviven en el mismo archivo.

**Open/Closed** — `StatusBadge` es extensible via props (`variant`, `label`) sin modificar el componente. Cada feature le pasa su configuración de color y texto.

**Interface Segregation** — Las props se tipan con `Pick<T, ...>` según lo que cada componente realmente consume, no se pasa la entidad completa.

```typescript
// El componente declara exactamente lo que necesita
type IncidentCardProps = Pick<Incident, 'id' | 'type' | 'status' | 'description'> & {
  zoneName: string // ya resuelto, no el zoneId crudo
}
```

**Dependency Inversion** — Los componentes dependen de hooks, nunca de implementaciones de fetch directamente.

**Liskov** — No aplica en React funcional. No hay herencia de clases en la codebase.

---



## Estructura de carpetas

```
src/
├── features/
│   ├── dashboard/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.tsx
│   │
│   ├── incidents/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── schemas/
│   │   └── index.tsx
│   │
│   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.tsx
│   │
│   ├── fleet/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.tsx
│   │
│   └── map/
│       ├── components/
│       ├── hooks/
│       └── index.tsx
│
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   └── lib/
│
└── app/
    ├── router.tsx
    └── providers.tsx
```

---



## Planificación — User Stories



### Stories implementadas


| ID    | Story                                                                                                            | Feature    |
| ----- | ---------------------------------------------------------------------------------------------------------------- | ---------- |
| US-01 | Como operador quiero ver KPIs del estado operativo al ingresar para tener una lectura rápida del sistema         | Dashboard  |
| US-02 | Como operador quiero ver incidentes activos agrupados por zona y en mini-mapa desde el dashboard                 | Dashboard  |
| US-03 | Como operador quiero filtrar y visualizar incidentes en vista Kanban o Tabla según mi preferencia                | Incidentes |
| US-04 | Como operador quiero reportar un nuevo incidente con tipo, descripción y zona para que quede registrado          | Incidentes |
| US-05 | Como operador quiero ver el detalle completo de un incidente y navegar a su ubicación en el mapa                 | Incidentes |
| US-06 | Como operador quiero ver todos los assets filtrados por estado y tipo con paginación por el volumen de registros | Assets     |
| US-07 | Como operador quiero ver incidentes y assets geolocalizados en un mapa interactivo para tener contexto espacial  | Mapa       |
| US-08 | Como operador quiero navegar desde el detalle de un incidente directamente a su posición en el mapa              | Mapa       |
| US-09 | Como supervisor quiero ver el estado de la flota organizado por zona y por vehículo                              | Flota      |




## Decisiones técnicas



### Filtros en URL search params — no en Zustand

Los filtros de incidentes, assets y flota viven en la URL (`?status=REPORTED&type=OVERFLOW`) en lugar de en el store global. Esto permite:

- Compartir URLs con el filtro activo
- Preservar el filtro con el botón atrás del browser
- Testear estados de UI específicos sin interacción manual

Zustand se reserva exclusivamente para el filtro de zona global del header, que afecta múltiples pantallas simultáneamente.

### Paginación client-side en Assets

El endpoint `GET /assets` devuelve los 1.500 registros en una sola respuesta. No hay paginación server-side disponible. La decisión fue:

1. Recibir y cachear los 1.500 con React Query (se hace una sola vez, el cache dura `staleTime: 5min`)
2. Paginar client-side en chunks de 50 items con un hook dedicado `useAssetsPagination`
3. Aplicar los filtros de `status` y `type` como query params al backend antes de recibir los datos

Esto se documenta explícitamente en la UI (`paginación de 50 por página`).

### Queries paralelas con useQueries

Las pantallas que necesitan datos de múltiples endpoints (dashboard, detalle de zona) usan `useQueries` en lugar de queries encadenadas para minimizar el tiempo total de carga.

```typescript
const [zoneQuery, vehiclesQuery, incidentsQuery] = useQueries({
  queries: [
    { queryKey: queryKeys.zone(id), queryFn: () => getZoneById(id) },
    { queryKey: queryKeys.vehicles({ zoneId: id }), queryFn: () => getVehicles({ zoneId: id }) },
    { queryKey: queryKeys.incidents({ zoneId: id }), queryFn: () => getIncidents({ zoneId: id }) },
  ]
})
```



### Zod schemas duplicados del backend

Los schemas de validación del frontend son equivalentes a los del backend. En un monorepo de producción estarían en un `packages/shared` con un único source of truth. Para este proyecto la duplicación es consciente y documentada — no accidental.

### Navegación mapa via URL param

El drawer de detalle de incidente navega al mapa con `?incidentId={id}`. El mapa lee el param con `useSearchParams`, ejecuta `flyTo` a las coordenadas y abre el popup del marker correspondiente. Esto mantiene la navegación stateless y bookmarkeable.

### Clustering de assets en el mapa

Con 1.500 markers simultáneos react-leaflet congela el browser. La solución es `react-leaflet-markercluster`, que agrupa automáticamente los markers por proximidad según el nivel de zoom. Sin esta librería la capa de assets no sería entregable.

### Sistema de colores compartido entre entidades

Los colores de markers en el mapa unifican incidentes y assets en una sola escala semántica:


| Color    | Incidente   | Asset          |
| -------- | ----------- | -------------- |
| Rojo     | REPORTED    | OUT_OF_SERVICE |
| Naranja  | IN_PROGRESS | DAMAGED        |
| Amarillo | —           | FULL           |
| Verde    | RESOLVED    | OK             |


Esto reduce la carga cognitiva del operador al pasar de una capa a otra.

---



### TanStack Router — rutas y search params completamente tipados

Se eligió TanStack Router sobre React Router v6 por dos razones concretas:

**1. Search params type-safe.** Los filtros de incidentes, assets y la navegación al mapa con `incidentId` están declarados en la definición de ruta. TypeScript infiere el tipo de cada param, eliminando los casteos manuales de `string` que React Router requiere.

```typescript
// app/routes/incidents.tsx
export const Route = createFileRoute('/incidentes')({
  validateSearch: (search) => incidentFiltersSchema.parse(search),
  // search.status y search.type son IncidentStatus | undefined — no string
})

// En el componente
const { status, type } = Route.useSearch()
```

**2. Integración nativa con TanStack Query via** `loaders`**.** Las rutas pueden precargar datos antes de renderizar el componente, eliminando los estados de loading en la navegación inicial.

```typescript
export const Route = createFileRoute('/incidentes')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(incidentsQueryOptions()),
})
```

El árbol de rutas vive en `src/app/router.tsx` usando `createRouter` con el `QueryClient` inyectado como contexto del router.

### TanStack Query v5 — server state management

TanStack Query maneja todo el estado que viene del servidor. La separación respecto a Zustand es estricta:


| Responsabilidad                                 | Herramienta    |
| ----------------------------------------------- | -------------- |
| Datos del servidor (fetch, cache, revalidación) | TanStack Query |
| Estado global de UI (filtro de zona activo)     | Zustand        |
| Estado local de UI (modal abierto, tab activa)  | `useState`     |


**Query keys centralizadas** en `shared/lib/queryKeys.ts` como factory functions tipadas. Esto garantiza que `invalidateQueries` después de un `POST /incidents` invalide exactamente las queries correctas.

```typescript
export const queryKeys = {
  zones: () => ['zones'] as const,
  zone: (id: string) => ['zones', id] as const,
  vehicles: (filters?: VehicleFilters) => ['vehicles', filters] as const,
  assets: (filters?: AssetFilters) => ['assets', filters] as const,
  incidents: (filters?: IncidentFilters) => ['incidents', filters] as const,
  incident: (id: string) => ['incidents', id] as const,
}
```

`staleTime` **configurado globalmente** en el `QueryClient` a 5 minutos. Los datos mockeados no cambian en el servidor entre navegaciones, evitando refetches innecesarios.

`useMutation` **con** `onSuccess` **invalidation** en todas las operaciones de creación:

```typescript
const mutation = useMutation({
  mutationFn: createIncident,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.incidents() })
  },
})
```

---



## Testing



### Correr los tests

```bash
# Correr todos los tests una vez
pnpm test

# Modo watch (durante desarrollo)
pnpm test:watch

# Coverage report
pnpm test:coverage
```



### Configuración

Vitest está configurado en `vite.config.ts` con el environment `jsdom` para simular el DOM del browser. El setup global en `src/test/setup.ts` importa los matchers de `@testing-library/jest-dom`.

```typescript
// vite.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
})
```



### Qué se testea y por qué

El criterio de testing es **comportamiento observable por el usuario**, no implementación interna. No se testean hooks de forma aislada ni detalles de implementación de React Query.

**Componentes testeados:**

`StatusBadge` — componente de shared usado en toda la app. Verifica que el label y el color correcto se renderizan para cada variante de status.

`CreateIncidentModal` — flujo de formulario completo. Verifica validación con Zod (campos requeridos, selects vacíos), submit exitoso con datos correctos, y que el modal se cierra al crear.

`IncidentTable` — verifica que los datos se renderizan correctamente en filas, que el filtro por tipo actualiza los resultados visibles, y el estado vacío cuando no hay incidentes.

`useDashboardStats` — único hook testeado directamente porque contiene lógica de negocio pura (agrupación, conteos) independiente de la UI.

### Estructura de un test

```typescript
// features/incidents/components/CreateIncidentModal.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createWrapper } from '@/test/utils' // QueryClient + Router wrapper
import { CreateIncidentModal } from './CreateIncidentModal'

describe('CreateIncidentModal', () => {
  it('muestra error de validación si descripción está vacía', async () => {
    render(<CreateIncidentModal open onClose={() => {}} />, {
      wrapper: createWrapper(),
    })

    await userEvent.click(screen.getByRole('button', { name: /crear incidente/i }))

    expect(screen.getByText(/descripción es requerida/i)).toBeInTheDocument()
  })
})
```



## Limitaciones conocidas de la API

Estas limitaciones son del backend provisto, no del frontend. Se documentan y se comunican en la UI donde corresponde.


| Endpoint         | Limitación                        | Decisión en UI                                  |
| ---------------- | --------------------------------- | ----------------------------------------------- |
| `GET /assets`    | No soporta filtro por `zoneId`    | Badge informativo en la pantalla de Assets      |
| `GET /incidents` | No hay `PATCH/PUT /incidents/:id` | Banner de solo lectura en Bandeja de incidentes |
| `GET /assets`    | Sin paginación server-side        | Paginación client-side de 50 items              |
| `GET /zones`     | Sin endpoint de creación          | Zonas son de solo lectura en el frontend        |


---



## Convención de commits

El proyecto usa [Conventional Commits](https://www.conventionalcommits.org/).

**Tipos usados:**


| Tipo       | Cuándo                                      |
| ---------- | ------------------------------------------- |
| `feat`     | Nueva funcionalidad visible para el usuario |
| `fix`      | Corrección de bug                           |
| `chore`    | Dependencias, configuración, tooling        |
| `refactor` | Reescritura sin cambio de comportamiento    |
| `docs`     | Solo documentación                          |
| `style`    | Cambios visuales sin lógica                 |


---

