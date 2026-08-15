# 🖥️ Monitor

Dashboard de monitoreo de hardware en tiempo real (CPU, RAM y Disco), construido con **FastAPI + SQLite** en el backend y **React + Vite + Recharts** en el frontend.

![status](https://img.shields.io/badge/status-en%20desarrollo-yellow)

## ✨ Características

- 📊 Visualización en tiempo real del uso de CPU, RAM y Disco.
- 🕒 Modo historial con las últimas mediciones guardadas en SQLite.
- 🔄 Polling automático cada 3 segundos.
- 📈 Gráficas interactivas con Recharts.
- ⚡ Backend ligero basado en FastAPI + psutil.

## 🛠️ Tecnologías

**Backend:** Python · FastAPI · Uvicorn · psutil · SQLite
**Frontend:** React · Vite · Recharts

## 📂 Estructura

```
Monitor/
├── main.py
├── requirements.txt
├── metrics.db          # se genera automáticamente
└── frontend/
    └── src/
        └── App.jsx
```

## 🚀 Instalación y uso

### 1. Backend

```bash
cd Monitor
pip install -r requirements.txt
uvicorn main:app --reload
```

El backend corre en `http://127.0.0.1:8000`

### 2. Frontend

```bash
cd Monitor/frontend
npm install
npm run dev
```

El frontend corre en `http://127.0.0.1:5173`

> ⚠️ Asegúrate de levantar primero el backend, ya que el frontend consume la API directamente desde `http://127.0.0.1:8000`.

## 📡 Endpoints de la API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/current` | Devuelve las métricas actuales del sistema y las guarda en SQLite |
| GET | `/api/history` | Devuelve los últimos 30 registros históricos |

## 📋 Requisitos

- Python 3.x
- Node.js + npm

## 📌 Notas

- La base de datos `metrics.db` se crea automáticamente al iniciar el backend.
- CORS está configurado abierto (`*`) para desarrollo local; se recomienda restringirlo en producción.

## 🗺️ Roadmap

- [ ] Variables de entorno para la URL del backend
- [ ] Manejo de errores visible en la UI
- [ ] Configuración de intervalo de polling
- [ ] Autenticación para exposición fuera de localhost

## 👤 Autor

Proyecto desarrollado dentro del repositorio `ServiceActivities`, rama `AxelMonitor`.
