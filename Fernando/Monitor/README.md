# Sistema Monitor de Recursos

Monitor en tiempo real de **CPU, RAM y Disco** con historial, reportes PDF y permisos multi-host.

## Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Backend | PHP 8.0+ (API REST, sesiones nativas) |
| Script métricas | Python 3.10+ (psutil) |
| Base de datos | MySQL (XAMPP) |
| Frontend | Vite + React, Chart.js, Axios |

## Estructura del proyecto

```
sistema-monitor/
├── database/       → schema.sql con tablas y seeds
├── backend/
│   ├── public/     → Entry point (index.php)
│   ├── api/        → Controladores REST
│   ├── scripts/    → monitor.py (psutil)
│   └── config/     → Conexión PDO
└── frontend/       → Vite + React
```

## Configuración inicial

### 1. Base de datos
Importa el esquema desde phpMyAdmin o consola MySQL:
```bash
mysql -u root -p < database/schema.sql
```

### 2. Backend (PHP via Apache XAMPP)
Copia la carpeta `backend/` a `C:\xampp\htdocs\sistema-monitor\backend\`  
URL: `http://localhost/sistema-monitor/backend/public/`

### 3. Script Python
```bash
cd backend/scripts
pip install -r requirements.txt
python monitor.py --host-id=1
```

### 4. Frontend
```bash
cd frontend
npm install
npm run dev
```
Accede en: `http://localhost:5173`

## Credenciales de prueba

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| admin   | admin123  | Admin (todos los hosts) |
| viewer1 | viewer123 | Viewer (solo Servidor Principal) |

## Cronograma de desarrollo (Semana 1-2)

| Día | Fecha | Enfoque |
|-----|-------|---------|
| Mar | 04 ago | Setup: DB, Python, PHP Auth, React base |
| Mié | 05 ago | Backend core: hosts, metrics, middleware |
| Jue | 06 ago | Gráficas en vivo: Chart.js, CPU/RAM/Disco |
| Vie | 07 ago | Gráfica combinada + Historial backend |
| Lun | 10 ago | Frontend historial: fechas, filtros, gráfica |
| Mar | 11 ago | PDF semanal: backend + frontend |
| Mié | 12 ago | Multi-host completo: selector, permisos |
| Jue | 13 ago | Pulido, estilos, errores, pruebas |
| Vie | 14 ago | Deploy, demo interno, entrega |
