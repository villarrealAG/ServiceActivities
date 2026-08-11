import psutil
import sqlite3
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Valores de porcentaje de uso de CPU, RAM y disco
cpu = psutil.cpu_percent(interval=1)
ram = psutil.virtual_memory().percent
disk = psutil.disk_usage('/').percent

# Impresión de cada porcentaje
print(cpu)
print(ram)
print(disk)

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

def insert_metrics(cpu, ram, disk):
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

create_database()
insert_metrics(cpu, ram, disk)