# AxelMonitor — Documentación del Proyecto

## 1. Descripción General

**AxelMonitor** es un dashboard web para el monitoreo de recursos de hardware (CPU, RAM y Disco) en tiempo real. El sistema captura métricas del equipo donde corre el backend, las almacena en una base de datos local y las expone tanto en vivo como en modo histórico a través de una interfaz web interactiva.

Forma parte de la rama `AxelMonitor` dentro del repositorio `ServiceActivities`, y vive en la carpeta `Monitor`.

## 2. Objetivo

Proveer una herramienta ligera y sin dependencias externas (self-hosted) que permita observar el consumo de recursos del sistema de forma visual, con la posibilidad de:

- Ver el estado actual del hardware en tiempo real (polling cada 3 segundos).
- Consultar el historial de las últimas mediciones registradas.
- Visualizar la información en gráficas de línea, separadas por métrica.

## 3. Arquitectura

El proyecto sigue una arquitectura cliente-servidor simple, dividida en dos componentes independientes:

```
┌─────────────────────┐        HTTP (REST/JSON)        ┌──────────────────────┐
│   Frontend (React)  │ ──────────────────────────────▶ │   Backend (FastAPI)  │
│   Vite + Recharts   │ ◀────────────────────────────── │   psutil + SQLite    │
└─────────────────────┘                                  └──────────────────────┘
                                                                    │
                                                                    ▼
                                                            metrics.db (SQLite)
```

- **Backend**: expone una API REST que lee métricas del sistema y las persiste.
- **Frontend**: consume la API vía `fetch`, hace polling automático y renderiza gráficas.

## 4. Tecnologías Utilizadas

### Backend
| Tecnología | Versión | Uso |
|---|---|---|
| Python | 3.x | Lenguaje base |
| FastAPI | 0.141.1 | Framework de la API REST |
| Uvicorn | 0.52.3 | Servidor ASGI |
| psutil | 7.2.2 | Lectura de métricas de hardware (CPU, RAM, disco) |
| sqlite3 | Nativo de Python | Persistencia de datos |

### Frontend
| Tecnología | Uso |
|---|---|
| React | Librería de UI |
| Vite | Bundler / entorno de desarrollo |
| Recharts | Renderizado de gráficas de línea |

## 5. Estructura de Carpetas (relevante)

```
Monitor/
├── main.py              # API backend (FastAPI)
├── requirements.txt      # Dependencias de Python
├── metrics.db             # Base de datos SQLite (se genera automáticamente)
└── frontend/
    └── src/
        └── App.jsx        # Componente principal del dashboard
```

## 6. Backend — Detalle Técnico

### 6.1 Inicialización
Al arrancar la aplicación, `create_database()` crea (si no existe) la base `metrics.db` con la tabla `metrics`:

| Campo | Tipo | Descripción |
|---|---|---|
| id | INTEGER (PK, autoincrement) | Identificador único |
| cpu | REAL | Porcentaje de uso de CPU |
| ram | REAL | Porcentaje de uso de RAM |
| disk | REAL | Porcentaje de uso de disco |
| timestamp | DATETIME | Fecha/hora del registro (automática) |

### 6.2 Endpoints

**`GET /api/current`**
Obtiene las métricas actuales del sistema usando `psutil`, las inserta en la base de datos y las devuelve al cliente.

Respuesta de ejemplo:
```json
{ "cpu": 23.5, "ram": 61.2, "disk": 44.8 }
```

**`GET /api/history`**
Devuelve los últimos 30 registros almacenados en `metrics.db`, ordenados cronológicamente (más antiguo → más reciente).

Respuesta de ejemplo:
```json
[
  { "cpu": 20.1, "ram": 58.4, "disk": 44.8, "timestamp": "2026-08-14 10:00:00" },
  ...
]
```

### 6.3 CORS
El middleware `CORSMiddleware` está configurado con `allow_origins=["*"]`, permitiendo que el frontend (por defecto en un puerto distinto vía Vite) consuma la API sin restricciones. **Nota:** esta configuración es adecuada para desarrollo local, pero debería restringirse en un entorno de producción.

## 7. Frontend — Detalle Técnico

El componente `App.jsx` maneja dos modos de visualización mediante el estado `isHistory`:

- **Modo "En Vivo"**: hace `polling` cada 3 segundos contra `/api/current` y mantiene una ventana deslizante de las últimas 20 mediciones.
- **Modo "Historial"**: al presionar "Cargar Historial", consulta `/api/history` y muestra las últimas 30 mediciones guardadas en SQLite.

Se renderizan tres gráficas de línea independientes (CPU, RAM, Disco) usando `Recharts`, cada una con eje Y fijo de 0 a 100 (por tratarse de porcentajes).

## 8. Cómo Ejecutar el Proyecto

### Backend
```bash
pip install -r requirements.txt
uvicorn main:app --reload
```
El backend queda disponible en `http://127.0.0.1:8000`.

### Frontend
```bash
npm install
npm run dev
```
El frontend queda disponible normalmente en `http://127.0.0.1:5173` (puerto por defecto de Vite).

> **Importante:** el backend debe estar corriendo antes de abrir el frontend, ya que `App.jsx` apunta directamente a `http://127.0.0.1:8000`.

## 9. Posibles Mejoras a Futuro

- Mover la URL del backend (`http://127.0.0.1:8000`) a una variable de entorno en el frontend.
- Restringir el `allow_origins` de CORS a dominios específicos en producción.
- Agregar manejo de errores visible en la UI cuando el backend no responde.
- Permitir configurar el intervalo de polling y la cantidad de registros históricos.
- Agregar autenticación si el dashboard se expone fuera de `localhost`.
