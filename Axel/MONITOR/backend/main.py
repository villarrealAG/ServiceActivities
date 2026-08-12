import psutil
import sqlite3
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuración de CORS para permitir peticiones desde React (Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Función para crear la base de datos y la tabla si no existen
def create_database():
    # Conexión a la base de datos SQLite
    conn = sqlite3.connect('metrics.db')
    cursor = conn.cursor()

    # Creación de la tabla si no existe
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS metrics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cpu REAL,
            ram REAL,
            disk REAL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Guardado de los cambios y cierre de la conexión
    conn.commit()
    conn.close()

create_database()

@app.get("/api/current")
def current_metrics():
    # Datos del hardware
    cpu = psutil.cpu_percent(interval=None)
    ram = psutil.virtual_memory().percent
    disk = psutil.disk_usage('/').percent

    # Conexión a la base de datos SQLite
    conn = sqlite3.connect('metrics.db')
    cursor = conn.cursor()

    # Inserción de valores en la tabla
    cursor.execute('''
        INSERT INTO metrics (cpu, ram, disk)
        VALUES (?, ?, ?)
    ''', (cpu, ram, disk))

    # Guardado de los cambios y cierre de la conexión
    conn.commit()
    conn.close()

    return {"cpu": cpu, "ram": ram, "disk": disk}

@app.get("/api/history")
def get_history():
    # Conexión a la base de datos SQLite
    conn = sqlite3.connect("metrics.db")
    cursor = conn.cursor()

    # Obtener los últimos 30 registros
    cursor.execute("SELECT cpu, ram, disk, timestamp FROM metrics ORDER BY id DESC LIMIT 30")
    rows = cursor.fetchall()
    conn.close()

    # Formatear la respuesta
    history = [
        {"cpu": row[0], "ram": row[1], "disk": row[2], "timestamp": row[3]}
        for row in reversed(rows)
    ]
    return history